import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Dashboard from "@/pages/Dashboard";
import Home from "@/pages/Home";
import ResumeShow from "@/pages/ResumeShow";
import Form from "@/components/Form";
import Profile from "@/pages/Profile";
import { ToastProvider } from "@/components/ui/toast";
import { Toaster } from "@/components/ui/toaster";
import { GoogleOAuthProvider } from '@react-oauth/google';
import GithubScorer from "@/pages/GithubScorer";

const App = () => {

  return (
    <div>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_CLIENT_ID || "dummy-client-id.apps.googleusercontent.com"}>
      <ToastProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />}>
              <Route index element={<Form />} />
              <Route path="resumes" element={<ResumeShow />} />
              <Route path="profile" element={<Profile />} />
              <Route path="scorer" element={<GithubScorer />} />
            </Route>
          </Routes>
        </BrowserRouter>
        <Toaster />
      </ToastProvider>
      </GoogleOAuthProvider>
    </div>
  );
};

export default App;
