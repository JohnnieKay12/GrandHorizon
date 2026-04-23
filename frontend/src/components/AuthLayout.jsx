export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">

      {/* LEFT SIDE (IMAGE) */}
      <div className="hidden lg:flex relative bg-black">
        <img
          src="https://images.unsplash.com/photo-1566073771259-6a8506099945"
          alt="Hotel"
          className="absolute inset-0 w-full h-full object-cover opacity-70"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50" />

        {/* Text Content */}
        <div className="relative z-10 flex flex-col justify-center px-12 text-white">
          <h1 className="text-4xl font-bold font-playfair mb-4">
            Experience Luxury Like Never Before
          </h1>
          <p className="text-lg opacity-90">
            Join thousands of guests enjoying premium stays at Grand Horizon.
          </p>
        </div>
      </div>

      {/* RIGHT SIDE (FORM) */}
      <div className="flex items-center justify-center bg-gray-50 px-6 py-10">
        <div className="w-full max-w-md">
          {children}
        </div>
      </div>

    </div>
  );
}