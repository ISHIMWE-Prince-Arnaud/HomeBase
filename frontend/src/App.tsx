import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "@/pages/Login";
import RegisterPage from "@/pages/Register";
import PublicLayout from "@/layouts/PublicLayout";
import AppLayout from "@/layouts/AppLayout";
import ProtectedRoute from "@/components/layout/ProtectedRoute";

import ChoresPage from "@/pages/Chores";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route element={<AppLayout />}>
            <Route path="/dashboard" element={<div>Dashboard Content</div>} />
            <Route path="/chores" element={<ChoresPage />} />
            <Route path="/needs" element={<div>Needs Content</div>} />
            <Route path="/expenses" element={<div>Expenses Content</div>} />
            <Route path="/payments" element={<div>Payments Content</div>} />
            <Route
              path="/notifications"
              element={<div>Notifications Content</div>}
            />
            <Route path="/household" element={<div>Household Content</div>} />
            <Route path="/profile" element={<div>Profile Content</div>} />
          </Route>
        </Route>

        {/* Default Redirect */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
