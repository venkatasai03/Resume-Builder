import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AuthPage from "@/components/AuthPage";
import { toast } from "@/hooks/use-toast";

const Login = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  async function login(e: React.FormEvent) {
    e.preventDefault();

    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;


    try {
      const res = await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/api/auth/login",
        {
          email,
          password,
        },
      );

      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        toast({
          title: "Login successful!",
          variant: "default",
        });
        navigate("/dashboard");
      } else {
        toast({
          title: "Login failed",
          variant: "destructive",
        });
      }
    } catch (err) {
      console.log(err);
      toast({
        title: "Invalid credentials",
        variant: "destructive",
      });
    }
  }

  return (
    <AuthPage
      emailRef={emailRef}
      passwordRef={passwordRef}
      onSubmit={login}
      login={true}
    />
  );
};

export default Login;
