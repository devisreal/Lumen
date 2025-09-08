import { BrowserRouter, Route, Routes } from "react-router-dom";

import { AuthProvider } from "./contexts/AuthContext";
import AuthLayout from "./layouts/AuthLayout";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import NotFoundPage from "./pages/errors/NotFoundPage";
import HomePage from "./pages/public/HomePage";
import UserProfile from "./pages/user/UserProfile";
import "./styles/App.css";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route index path="/" element={<HomePage />} />
          <Route path="/auth" element={<AuthLayout />}>
            <Route index path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
          </Route>
          <Route path="/not-found" element={<NotFoundPage />} />

          {/* User Routes */}
          <Route path="/u/:username" element={<UserProfile />} />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
