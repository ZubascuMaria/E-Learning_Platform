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
import { ClipLoader } from "react-spinners";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isProfessor, setIsProfessor] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSignUp = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.post("/api/auth/signup", {
        username,
        password,
        isProfessor,
      });
      console.log(response.data);
      navigate("/sign-in");
    } catch (error) {
      console.error("Error during sign up:", error);
      
    } finally {
      setUsername("");
      setPassword("");
      setIsProfessor(false);
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center px-4 text-center overflow-y-auto">
      <h1 className="text-ocean text-5xl mt-16 mb-8">Welcome dear Student!</h1>

      <h2 className="text-mint text-5xl">Sign up</h2>

      <Card className="w-full max-w-md shadow-none border-none">
        <CardHeader>
          <CardTitle className="sr-only">Register</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="text-left">
            <label htmlFor="username" className="text-lg lowercase text-night">
              username
            </label>
            <Input
              id="username"
              className="bg-cloud shadow-lg"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="text-left">
            <label htmlFor="password" className="text-lg lowercase text-night">
              password
            </label>
            <Input
              id="password"
              type="password"
              className="mt bg-cloud shadow-lg"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2 justify-center mt-2">
            <label
              htmlFor="isProfessor"
              className="text-ocean text-xl font-semibold cursor-pointer"
            >
              Sign up as a professor?
            </label>
            <input
              type="checkbox"
              id="isProfessor"
              className="w-5 h-5 accent-mint cursor-pointer"
              checked={isProfessor}
              onChange={(e) => setIsProfessor(e.target.checked)}
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          {loading ? (
            <ClipLoader
              loading={loading}
              color="#8ebc95"
              size={50}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          ) : (
            <Button
              className="bg-mint text-night text-xl py-4 px-8 rounded-md transition-colors duration-200 hover:bg-[#8ebc95]"
              onClick={handleSignUp}
            >
              Sign up
            </Button>
          )}
          <p className="text-night text-xl">
            Already have an account?{" "}
            <Link to="/sign-in" className="text-ocean underline">
              Sign In
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};
export default RegisterPage;
