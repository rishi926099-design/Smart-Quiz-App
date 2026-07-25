import { createRoot } from "react-dom/client";
import "./index.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { Toaster } from "react-hot-toast";

import HomePage from "./pages/public/HomePage.jsx";
import AppLayout from "./pages/public/AppLayout.jsx";
import FeaturesPage from "./pages/public/FeaturesPage.jsx";
import LoginPage from "./pages/public/LoginPage.jsx";
import SignupPage from "./pages/public/SignupPage.jsx";

import { AuthProvider } from "./context/AuthContext";

import DashboardPage from "./pages/protected/DashboardPage.jsx";
import GenerateQuizPage from "./pages/protected/GenerateQuizPage";
//import DashboardHome from "./pages/protected/DashboardHome.jsx";
import ManageCategoriesPage from "./pages/protected/ManageCategoriesPage";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <AuthProvider>
        <Toaster />

        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<HomePage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="signup" element={<SignupPage />} />
            <Route path="features" element={<FeaturesPage />} />
          </Route>
          <Route path="/dashboard" element={<DashboardPage />}>
            <Route index element={<GenerateQuizPage />} />
          </Route>
          <Route path="/dashboard" element={<DashboardPage />}>
            <Route index element={<GenerateQuizPage />} />
            <Route path="categories" element={<ManageCategoriesPage />} />
          </Route>
        </Routes>
      </AuthProvider>
    </ThemeProvider>
  </BrowserRouter>,
);
