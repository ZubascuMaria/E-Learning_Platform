import { ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import BotIcon from "@/assets/bot.svg";
import axiosInstance from "@/utils/axios";
import { Roles } from "@/types/roles";
import ChatBot from "@/components/chat-bot";

type Course = {
  id: number;
  name: string;
};

const MyCoursesPage = () => {
  const currentUserId = localStorage.getItem("userId");
  const role = localStorage.getItem("role");
  const navigate = useNavigate();

  useEffect(() => {
    if (role !== Roles.STUDENT) {
      navigate("/sign-in");
    }
  }, [navigate, role]);

  const [myCourses, setMyCourses] = useState<Course[]>([]);
  const [showChatBot, setShowChatBot] = useState(false);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axiosInstance.get(
          `/enrollment/student/${currentUserId}`
        );
        setMyCourses(response.data);
      } catch (error) {
        console.error("Error fetching enrolled courses:", error);
      }
    };

    if (currentUserId) {
      fetchCourses();
    }
  }, [currentUserId]);

  return (
    <div className="relative w-full flex flex-col items-center justify-center p-4 mt-10">
      <p className="text-3xl text-center text-ocean border-b-2 border-ocean mb-12 mt-10">
        My Courses
      </p>

      <div className="flex flex-col gap-6 w-full max-w-xl items-center">
        {myCourses.map((course) => (
          <Link
            to="#"
            key={course.id}
            className="flex justify-between items-center bg-mint text-white text-xl w-full px-6 py-3 rounded-md shadow-md transition hover:scale-105"
          >
            <span className="truncate">{course.name}</span>
            <ArrowRight className="w-5 h-5 text-ocean" strokeWidth={2} />
          </Link>
        ))}

        {myCourses.length === 0 && (
          <p className="text-gray-500 italic mt-10">
            You are not enrolled in any course.
          </p>
        )}
      </div>

      {showChatBot && (
        <div className="fixed bottom-28 right-[200px] z-50">
          <ChatBot />
        </div>
      )}
      <div className="fixed bottom-24 right-6 flex flex-col items-center z-50">
        <p className="text-ocean text-xl mb-1">Questions? Ask E-Bot!</p>
        <button
          onClick={() => setShowChatBot(!showChatBot)}
          className="w-20 h-20 rounded-full bg-ocean shadow-lg hover:scale-105 transition duration-300 flex items-center justify-center"
        >
          <img src={BotIcon} alt="E-Bot" className="w-15 h-15" />
        </button>
      </div>
    </div>
  );
};

export default MyCoursesPage;
