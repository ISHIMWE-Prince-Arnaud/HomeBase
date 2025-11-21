import { Outlet } from "react-router-dom";

export default function PublicLayout() {
  return (
    <div className="flex min-h-screen w-full">
      {/* Left Side - Image */}
      <div className="hidden w-1/2 bg-muted lg:block">
        <img
          src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=2000&auto=format&fit=crop"
          alt="Cozy Home"
          className="h-full w-full object-cover"
        />
      </div>

      {/* Right Side - Content (Form) */}
      <div className="flex w-full flex-col justify-center p-8 lg:w-1/2">
        <Outlet />
      </div>
    </div>
  );
}
