import { Outlet } from 'react-router-dom';

export const AuthLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500">
      {/* Minimal header with logo */}
      <header className="p-6">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-lg">
            <span className="text-blue-600 font-bold text-lg">D</span>
          </div>
          <h1 className="text-2xl font-bold text-white">
            Duobingo
          </h1>
        </div>
      </header>

      {/* Centered content */}
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8">
            <Outlet />
          </div>
        </div>
      </main>

      {/* Minimal footer */}
      <footer className="p-6">
        <p className="text-center text-sm text-white/80">
          © {new Date().getFullYear()} Duobingo. All rights reserved.
        </p>
      </footer>
    </div>
  );
};
