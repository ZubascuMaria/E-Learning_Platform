import { Link, useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Roles } from "@/types/roles";
import { useEffect, useState } from "react";

const HomePage = () => {
  
  const navigate = useNavigate();

  const role = localStorage.getItem("role");
  useEffect(() => {
    if (!role) {
      navigate("/sign-in");
    }
  }, [role, navigate]);

  const [isProfessor, setIsProfessor] = useState(false);

  useEffect(() => {
    const role = localStorage.getItem("role");
    setIsProfessor(role === Roles.PROFESSOR);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center px-4 py-16 gap-20 mt-16">
      <Link
        to={isProfessor ? "/all-courses" : "/my-courses"}
        className="flex justify-between items-center bg-ocean text-white text-xl w-full max-w-xl px-8 py-2 rounded-md transition hover:opacity-90"
      >
        <span>My Courses</span>
        <ArrowRight className="w-5 h-5" strokeWidth={2} />
      </Link>

      {isProfessor ? (
        <Link
          to="/enrollments"
          className="flex justify-between items-center bg-mint text-white text-xl w-full max-w-xl px-8 py-2 rounded-md transition hover:opacity-90"
        >
          <span>Enrollments</span>
          <ArrowRight className="w-5 h-5" strokeWidth={2} />
        </Link>
      ) : (
        <Link
          to="/all-courses"
          className="flex justify-between items-center bg-mint text-white text-xl w-full max-w-xl px-8 py-2 rounded-md transition hover:opacity-90"
        >
          <span>All Courses</span>
          <ArrowRight className="w-5 h-5" strokeWidth={2} />
        </Link>
      )}

      {isProfessor ? (
        <Link
          to="/statistics"
          className="flex justify-between items-center bg-ocean text-white text-xl w-full max-w-xl px-8 py-2 rounded-md transition hover:opacity-90"
        >
          <span>Statistics</span>
          <ArrowRight className="w-5 h-5" strokeWidth={2} />
        </Link>
      ) : (
        <Link
          to="/my-courses"
          className="flex justify-between items-center bg-ocean text-white text-xl w-full max-w-xl px-8 py-2 rounded-md transition hover:opacity-90"
        >
          <span>AI E-Bot</span>
          <ArrowRight className="w-5 h-5" strokeWidth={2} />
        </Link>
      )}
    </div>
  );
};

export default HomePage;
