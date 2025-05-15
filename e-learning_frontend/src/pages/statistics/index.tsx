import { Roles } from "@/types/roles";
import axiosInstance from "@/utils/axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const StatisticsPage = () => {
  const navigate = useNavigate();

  const role = localStorage.getItem("role");
  useEffect(() => {
    if (!role) {
      navigate("/sign-in");
    }else if (role === Roles.STUDENT) {
      navigate("/all-courses");
    }
  }, [role, navigate]);

  const [data, setData] = useState([]);

  useEffect(() => {
    const professorId = localStorage.getItem("userId");

    const fetchStats = async () => {
      try {
        const response = await axiosInstance.get(
          `/courses/professor/${professorId}/statistics`
        );
        setData(response.data);
      } catch (error) {
        console.error("Error fetching course statistics:", error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl text-ocean mb-6">Statistics</h1>

      <div className="bg-white shadow-xl rounded-xl p-6">
        <h2 className="text-xl mb-4">Number of students per course</h2>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              layout="vertical"
              margin={{ top: 10, right: 30, left: 100, bottom: 10 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="name" type="category" />
              <Tooltip />
              <Bar dataKey="students" fill="#A3C9A8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default StatisticsPage;
