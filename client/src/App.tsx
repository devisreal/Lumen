import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import AuthLayout from "./layouts/AuthLayout";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import NotFoundPage from "./pages/errors/NotFoundPage";
import HomePage from "./pages/public/HomePage";
import "./styles/App.css";

const App: React.FC = () => {
  return (
    <div className="">
      <BrowserRouter>
        <Routes>
          <Route index path="/" element={<HomePage />} />

          <Route path="/auth" element={<AuthLayout />}>
            <Route index path="register" element={<RegisterPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="*" element={<Navigate to="/not-found" replace />} />
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
