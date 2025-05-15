import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axiosInstance from "@/utils/axios";
import { decodeToken } from "@/utils/decodeToken";
import { Roles } from "@/types/roles";

const LoginPage = () => {

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const redirectTo = (role: string) => {
    if (role === Roles.STUDENT || role === Roles.PROFESSOR) {
      navigate("/");
    } else{
      navigate("/sign-up")    
    }
  };

  const handleToken = (token: string) => {

    localStorage.setItem("token", token);
    const details = decodeToken(token);
    localStorage.setItem("userId", details?.userId.toString() || "");
    localStorage.setItem("role", details?.role || "");

    redirectTo(details?.role || "");
  };

  const handleSignIn = async () => {
    try {
      const response = await axiosInstance.post("/api/auth/signin", {
        username,
        password,
      });
      handleToken(response.data.token);

    } catch (error) {
      console.error("Error during sign in:", error);
    } finally {
      setUsername("");
      setPassword("");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center px-4 py-14 text-center">
      <h1 className="text-ocean text-5xl mb-10">Good to see you again!</h1>

      <h2 className="text-mint text-5xl">Sign in</h2>

      <Card className="w-full max-w-md shadow-none border-none">
        <CardHeader>
          <CardTitle className="sr-only">Login</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="text-left">
            <label htmlFor="username" className="text-lg lowercase text-night">
              username
            </label>
            <Input
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="bg-cloud shadow-lg"
            />
          </div>
          <div className="text-left">
            <label htmlFor="password" className="text-lg lowercase text-night">
              password
            </label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt bg-cloud shadow-lg"
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button
            className="bg-mint text-night text-xl py-4 px-8 rounded-md transition-colors duration-200 hover:bg-[#8ebc95]"
            onClick={handleSignIn}
          >
            Sign in
          </Button>
          <p className="text-night text-xl">
            Don’t have an account?{" "}
            <Link to="/sign-up" className="text-ocean underline">
              Sign Up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LoginPage;
