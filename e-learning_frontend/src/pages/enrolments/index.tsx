import { Calendar as BigCalendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { enUS } from "date-fns/locale";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Roles } from "@/types/roles";
import axiosInstance from "@/utils/axios";

const locales = {
  "en-US": enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

type CourseEvent = {
  title: string;
  start: Date;
  end: Date;
  students: string[];
};

const EnrollmentsAgenda = () => {
  const navigate = useNavigate();

  const role = localStorage.getItem("role");
  useEffect(() => {
  
  if (role === null) {
    navigate("/sign-in");
  } else if (role === Roles.STUDENT) {
    navigate("/all-courses");
  }
}, [role, navigate]);

  const userId = localStorage.getItem("userId");

  const [selectedEvent, setSelectedEvent] = useState<CourseEvent | null>(null);
  const [coursesWithStudents, setCoursesWithStudents] = useState<CourseEvent[]>(
    []
  );

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axiosInstance.get(
          `/courses/professor/${userId}/courses-with-students`
        );
        const data = response.data;

        type CourseResponse = {
          name: string;
          startDate: string;
          endDate: string;
          students: string[];
        };

        const transformed: CourseEvent[] = data.map((course: CourseResponse) => ({
          title: course.name,
          start: new Date(course.startDate),
          end: new Date(course.endDate),
          students: course.students,
        }));

        setCoursesWithStudents(transformed);
      } catch (error) {
        console.error("Error fetching courses with students:", error);
      }
    };

    if (userId) {
      fetchCourses();
    }
  }, [userId]);

  const events: CourseEvent[] = useMemo(
    () => coursesWithStudents,
    [coursesWithStudents]
  );

  return (
    <div className="p-6 max-w-7xl mx-auto grid grid-cols-[1fr_3fr] gap-10 items-start mt-10">
      {/* Left: Enrolled Students */}
      <div className="flex flex-col items-center mt-14">
        <h2 className="text-3xl mb-4 mt-10">Enrolled Students</h2>
        {selectedEvent ? (
          <div className="rounded-xl overflow-hidden shadow-xl w-full">
            <div className="bg-mint text-white px-4 py-2 text-2xl">
              {selectedEvent.title}
            </div>
            <div className="bg-ocean px-4 py-3 text-white">
              <p className="text-right mb-2 text-lg">
                Total {selectedEvent.students.length}
              </p>
              <ul className="space-y-1">
                {selectedEvent.students.map((name, index) => (
                  <li key={index} className="text-xl">
                    {name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <p className="text-gray-500 italic">
            Click on a course in the calendar
          </p>
        )}
      </div>

      {/* Right: Calendar */}
      <div className="w-full border rounded-xl">
        <BigCalendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          views={["month"]}
          popup
          style={{ height: 500 }}
          onSelectEvent={(event) => setSelectedEvent(event)}
          eventPropGetter={() => {
            return {
              style: {
                backgroundColor: "#A3C9A8",
                color: "white",
                borderRadius: "6px",
                border: "none",
              },
            };
          }}
        />
      </div>
    </div>
  );
};

export default EnrollmentsAgenda;
