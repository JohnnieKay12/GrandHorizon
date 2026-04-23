const User = require('../models/User');
const { generateToken } = require('../middleware/auth');
const { OAuth2Client } = require('google-auth-library');

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// @desc    Register new user (email + password)
// @route   POST /api/auth/register
// @access  Public
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields (name, email, password)'
      });
    }

    // Email format validation
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please enter a valid email address'
      });
    }

    // Password strength validation
    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 8 characters long'
      });
    }

    const hasUpperCase = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);

    if (!hasUpperCase || !hasNumber) {
      return res.status(400).json({
        success: false,
        message: 'Password must contain at least one uppercase letter and one number'
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'This email is already registered. Please login instead.'
      });
    }

    // Create new user (role defaults to 'user')
    const user = new User({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password,
      role: 'user',
      authProvider: 'local'
    });

    await user.save();

    // Generate JWT token
    const token = generateToken(user._id, user.email, user.role);

    res.status(201).json({
      success: true,
      message: 'Account created successfully',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        authProvider: user.authProvider
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during registration. Please try again.'
    });
  }
};

// @desc    Login user (email + password)
// @route   POST /api/auth/login
// @access  Public
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password'
      });
    }

    // Find user by email
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Check if user registered via Google
    if (user.authProvider === 'google' && !user.password) {
      return res.status(400).json({
        success: false,
        message: 'This account uses Google login. Please use "Continue with Google" instead.'
      });
    }

    // Verify password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Generate JWT token
    const token = generateToken(user._id, user.email, user.role);

    res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        authProvider: user.authProvider
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during login. Please try again.'
    });
  }
};

// @desc    Google OAuth login
// @route   POST /api/auth/google
// @access  Public (users only)
const googleLogin = async (req, res) => {
  try {
    const { credential } = req.body;

    if (!credential) {
      return res.status(400).json({
        success: false,
        message: 'Google credential is required'
      });
    }

    // Verify Google token
    let ticket;
    try {
      ticket = await googleClient.verifyIdToken({
        idToken: credential,
        audience: process.env.GOOGLE_CLIENT_ID
      });
    } catch (verifyError) {
      // If GOOGLE_CLIENT_ID is not set or invalid, we can't verify
      // In development, we'll create/fetch user based on decoded info
      if (process.env.NODE_ENV === 'development' && !process.env.GOOGLE_CLIENT_ID) {
        console.log('Development mode: Skipping Google token verification');
      } else {
        return res.status(400).json({
          success: false,
          message: 'Failed to verify Google token. Please try again.'
        });
      }
    }

    let payload;
    if (ticket) {
      payload = ticket.getPayload();
    } else {
      // In development without proper Google setup, create a mock payload
      // This should NOT be used in production
      return res.status(400).json({
        success: false,
        message: 'Google authentication is not properly configured. Please contact support.'
      });
    }

    const { sub: googleId, email, name, picture } = payload;

    // Check if user exists
    let user = await User.findOne({ email: email.toLowerCase() });

    if (user) {
      // User exists - update Google ID if not set
      if (!user.googleId) {
        user.googleId = googleId;
        user.authProvider = 'google';
        if (picture) user.avatar = picture;
        await user.save();
      }
    } else {
      // Create new user from Google data
      // IMPORTANT: Only create users with role "user" via Google OAuth
      user = new User({
        name: name || email.split('@')[0],
        email: email.toLowerCase(),
        googleId,
        avatar: picture,
        role: 'user', // Always 'user' for Google sign-ups
        authProvider: 'google',
        password: null // No password for Google users
      });
      await user.save();
    }

    // Prevent admin login via Google
    if (user.role === 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Admin accounts cannot use Google login. Please use email and password.'
      });
    }

    // Generate JWT token
    const token = generateToken(user._id, user.email, user.role);

    res.status(200).json({
      success: true,
      message: 'Google login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        authProvider: user.authProvider
      }
    });
  } catch (error) {
    console.error('Google login error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during Google login. Please try again.'
    });
  }
};

// @desc    Get current user from token
// @route   GET /api/auth/me
// @access  Private
const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        authProvider: user.authProvider,
        phone: user.phone   // ✅ ADD THIS
      }
    });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching user data.'
    });
  }
};

const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id; // from auth middleware
    const { name, phone } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    user.name = name || user.name;
    user.phone = phone || user.phone;

    await user.save();

    res.json({
      success: true,
      message: "Profile updated successfully",
      user,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// @desc    Logout user
// @route   POST /api/auth/logout
// @access  Private
const logout = async (req, res) => {
  try {
    // In a stateless JWT system, logout is handled client-side
    // by removing the token from storage
    res.status(200).json({
      success: true,
      message: 'Logged out successfully'
    });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during logout.'
    });
  }
};

// @desc    Create admin account (protected - only for seeding)
// @route   POST /api/auth/create-admin
// @access  Secret (requires secret key)
const createAdmin = async (req, res) => {
  try {
    const { secretKey, name, email, password } = req.body;

    // Verify secret key (simple protection)
    const expectedSecret = process.env.ADMIN_SECRET_KEY || 'haven-admin-secret-2024';
    if (secretKey !== expectedSecret) {
      return res.status(403).json({
        success: false,
        message: 'Invalid secret key'
      });
    }

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: email.toLowerCase() });
    if (existingAdmin) {
      return res.status(409).json({
        success: false,
        message: 'Admin with this email already exists'
      });
    }

    // Create admin user
    const admin = new User({
      name,
      email: email.toLowerCase(),
      password,
      role: 'admin',
      authProvider: 'local'
    });

    await admin.save();

    res.status(201).json({
      success: true,
      message: 'Admin account created successfully',
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role
      }
    });
  } catch (error) {
    console.error('Create admin error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error creating admin account.'
    });
  }
};

module.exports = {
  register,
  login,
  googleLogin,
  getMe,
  logout,
  createAdmin,
  updateProfile // ✅ ADD THIS
};
