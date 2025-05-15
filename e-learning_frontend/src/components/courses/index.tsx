import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Course } from "@/types/course";
import { Roles } from "@/types/roles";
import axiosInstance from "@/utils/axios";
import { Trash, Pencil, SquareCheckBig } from "lucide-react";
import { useEffect, useState } from "react";

interface CoursesProps {
  courses: Course[];
  onEdit: (course: Course) => void;
  onDelete?: (id: number) => void;
  onRefresh?: () => void;
}

const Courses = ({ courses, onEdit, onDelete, onRefresh }: CoursesProps) => {
  const [isProfessor, setIsProfessor] = useState(false);
  const [currentUserID, setIsCurrentUserID] = useState(-1);

  useEffect(() => {
    const role = localStorage.getItem("role");
    const userId = localStorage.getItem("userId");
    setIsProfessor(role === Roles.PROFESSOR);
    setIsCurrentUserID(Number(userId));
  }, []);

  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState("");

  const handleAttendClick = (course: Course) => {
    setSelectedCourse(course);
    setModalOpen(true);
  };


  const attendCourse = async (courseId: number, studentName: string) => {
    console.log("Enrolling in course:", courseId, studentName, currentUserID);
    try {
      const response = await axiosInstance.post(`/enrollment/enroll-course/${courseId}`, {
        studentID: currentUserID,
        studentName: studentName
      });
      console.log("Enrollment successful:", response.data);
      if (onRefresh) onRefresh();
    } catch (error) {
      console.error("Error enrolling in course:", error);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCourse) return;
    attendCourse(selectedCourse.id, name);
    setModalOpen(false);
    setName("");
    setSelectedCourse(null);
  };

  const formatDate = (dateString: string) => {
    const [year, month, day] = dateString.split("-");
    return `${day}/${month}/${year}`;
  };

  return (
    <>
      <Accordion type="single" collapsible className="space-y-3">
        {courses.map((course) => (
          <AccordionItem
            key={course.id}
            value={`course-${course.id}`}
            className="bg-mint rounded text-white"
          >
            <AccordionTrigger className="flex items-center justify-between py-2 p-2 text-white hover:no-underline [&>svg]:text-ocean">
              <div className="grid grid-cols-[2fr_1fr_2fr_1fr] w-full items-center gap-4 text-center text-xl">
                <span className="relative truncate pr-4">
                  {course.name}
                  <span className="absolute right-0 top-1/2 h-4 -translate-y-1/2 border-r border-white" />
                </span>
                <span className="relative truncate pr-4">
                  {course.domain}
                  <span className="absolute right-0 top-1/2 h-4 -translate-y-1/2 border-r border-white" />
                </span>
                <span className="relative truncate pr-4">
                  {formatDate(course.startDate)} - {formatDate(course.endDate)}
                  <span className="absolute right-0 top-1/2 h-4 -translate-y-1/2 border-r border-white" />
                </span>
                <span className="truncate">{course.languages.join(" ")}</span>
              </div>
            </AccordionTrigger>

            <AccordionContent className="bg-mint px-4 pb-4 pt-2 text-lg text-white rounded-b space-y-2">
              <p className="break-words whitespace-normal text-xl">
                {course.description}
              </p>

              <p>
                <strong className="text-ocean">Price:</strong>{" "}
                {course.discount > 0 ? (
                  <>
                    <span className="relative mr-2">
                      <span className="text-white">{course.price} EUR</span>
                      <span className="absolute left-0 top-1/2 h-[1px] w-full bg-coral" />
                    </span>
                    <span className="text-coral">
                      {course.price - course.discount} EUR
                    </span>
                  </>
                ) : (
                  <span className="text-white">{course.price} EUR</span>
                )}
              </p>

              <p>
                <strong className="text-ocean">Available Places:</strong>{" "}
                {course.vacancies} / {course.availablePlaces}
              </p>
              <div className="flex justify-end gap-4">
                {isProfessor && currentUserID === course.professorId && (
                  <>
                    <button
                      className="transition duration-300 ease-in-out hover:scale-105 cursor-pointer"
                      onClick={() => onEdit(course)}
                    >
                      <Pencil className="text-ocean" />
                    </button>
                    <button
                      className="transition duration-300 ease-in-out hover:scale-105 cursor-pointer"
                      onClick={() => {
                        if (onDelete) onDelete(course.id);
                      }}
                    >
                      <Trash className="text-ocean" />
                    </button>
                  </>
                )}
                {!isProfessor && (
                  <button className="flex items-center gap-1 transition duration-300 ease-in-out hover:scale-105 cursor-pointer">
                    <SquareCheckBig className="text-ocean " />
                    <span
                      className="underline"
                      onClick={() => handleAttendClick(course)}
                    >
                      Attend Course
                    </span>
                  </button>
                )}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      {modalOpen && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="text-xl text-ocean mb-4 text-center">
              Attend: {selectedCourse?.name}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                className="input input-bordered w-full text-lg"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              
              <div className="modal-action justify-end">
                <button
                  type="button"
                  className="btn btn-lg font-normal"
                  onClick={() => setModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-mint hover:bg-mint text-white font-normal btn btn-lg"
                >
                  Enroll
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Courses;
