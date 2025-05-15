import Courses from "@/components/courses";
import { CalendarIcon } from "lucide-react";
import OffersIcon from "/src/assets/offers.svg";
import { Course } from "@/types/course";
import { useEffect, useState } from "react";
import { Range } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRange } from "react-date-range";
import CourseModal from "@/components/course-modal";
import { Roles } from "@/types/roles";
import axiosInstance from "@/utils/axios";
import { useNavigate } from "react-router-dom";

const countryNameToCode: Record<string, string> = {
  România: "RO",
  France: "FR",
  Deutschland: "DE",
  Italia: "IT",
  España: "ES",
  "United Kingdom": "EN",
  "United States": "EN",
  "Republica Moldova": "MD",
  Hungary: "HU",
  Poland: "PL",
};

const AllCoursesPage = () => {

  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  useEffect(() => {
    if (!role) {
      navigate("/sign-in");
    }
  }, [role, navigate]);

  const [isProfessor, setIsProfessor] = useState(false);
  const [currentUserID, setIsCurrentUserID] = useState(-1);

  useEffect(() => {
    const role = localStorage.getItem("role");
    const userId = localStorage.getItem("userId");

    setIsProfessor(role === Roles.PROFESSOR);
    setIsCurrentUserID(Number(userId));


  }, [navigate]);




  const [courses, setCourses] = useState<Course[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>(
    courses || []
  );
  const [showOffersOnly, setShowOffersOnly] = useState(false);

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isDateFiltered, setIsDateFiltered] = useState(false);
  const [dateRange, setDateRange] = useState<Range[]>([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [searchTerm, setSearchTerm] = useState("");
  const [courseToEdit, setCourseToEdit] = useState<Course | null>(null);
  const [courseToDelete, setCourseToDelete] = useState<Course | null>(null);

  const [userCountry, setUserCountry] = useState<string | null>(null);
  const [showMyCoursesOnly, setShowMyCoursesOnly] = useState(false);

  const getAllCourses = async () => {
    try {
      const response = await axiosInstance.get("/courses/");
      setCourses(response.data);
      setFilteredCourses(response.data);
    } catch (error) {
      console.error("Error getting all courses", error);
    }
  };

  useEffect(() => {
    getAllCourses();
  }, []);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          const data = await res.json();

          const countryName = data.address?.country;
          const isoCode = countryNameToCode[countryName] || null;

          if (isoCode) {
            setUserCountry(isoCode);
          } else {
            console.warn("Cod ISO unknown for:", countryName);
          }
        },
        (error) => {
          console.error("Error geo local:", error);
          setUserCountry(null);
        }
      );
    }
    console.log(userCountry);
  }, [userCountry]);

  const applyFilters = (
    baseCourses: Course[],
    search: string,
    offersOnly: boolean,
    dateFiltered: boolean,
    date: Range[],
    userCountry?: string | null,
    showMine?: boolean
  ): Course[] => {
    let filtered = [...baseCourses];

    if (offersOnly) {
      filtered = filtered.filter((c) => c.discount > 0);
    }

    if (dateFiltered && date[0].startDate && date[0].endDate) {
      const { startDate, endDate } = date[0];
      filtered = filtered.filter((c) => {
        const start = new Date(c.startDate);
        const end = new Date(c.endDate);
        return start <= endDate && startDate <= end;
      });
    }

    if (search.trim() !== "") {
      filtered = filtered.filter((c) =>
        c.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (userCountry) {
      filtered.sort((a, b) => {
        const aMatches = a.languages?.includes(userCountry);
        const bMatches = b.languages?.includes(userCountry);
        if (aMatches && !bMatches) return -1;
        if (!aMatches && bMatches) return 1;
        return 0;
      });
    }

    if (showMine && currentUserID !== undefined) {
      filtered = filtered.filter((c) => c.professorId === currentUserID);
    }

    return filtered;
  };

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    const filtered = applyFilters(
      courses,
      value,
      showOffersOnly,
      isDateFiltered,
      dateRange,
      userCountry
    );
    setFilteredCourses(filtered);
  };

  const handleDateChange = (ranges: { [key: string]: Range }) => {
    const newRange = [ranges.selection];
    setDateRange(newRange);
    setIsDateFiltered(true);
    setShowDatePicker(false);

    const filtered = applyFilters(
      courses,
      searchTerm,
      showOffersOnly,
      true,
      newRange,
      userCountry
    );
    setFilteredCourses(filtered);
  };

  const handleGetOffers = () => {
    const nextState = !showOffersOnly;
    setShowOffersOnly(nextState);

    const filtered = applyFilters(
      courses,
      searchTerm,
      nextState,
      isDateFiltered,
      dateRange,
      userCountry
    );
    setFilteredCourses(filtered);
  };

  const handleDeleteCourse = async () => {
    if (!courseToDelete) return;

    try {
      await axiosInstance.delete(`/courses/delete/${courseToDelete.id}`);

      const updated = filteredCourses.filter((c) => c.id !== courseToDelete.id);
      setFilteredCourses(updated);
      setCourseToDelete(null);

      const modal = document.getElementById(
        "delete_course_modal"
      ) as HTMLInputElement;
      if (modal) modal.checked = false;
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };

  const handleMyCoursesToggle = () => {
    const next = !showMyCoursesOnly;
    setShowMyCoursesOnly(next);

    const filtered = applyFilters(
      courses,
      searchTerm,
      showOffersOnly,
      isDateFiltered,
      dateRange,
      userCountry,
      next
    );
    setFilteredCourses(filtered);
  };

  const handleCreateCourse = async (course: Partial<Course>) => {
    try {
      const response = await axiosInstance.post("/courses/create", {
        name: course.name,
        domain: course.domain,
        description: course.description,
        startDate: course.startDate,
        endDate: course.endDate,
        price: course.price,
        availablePlaces: course.availablePlaces,
        languages: course.languages, // array: ["EN", "RO"]
        professorId: currentUserID,
      });

      console.log(response.data);
      getAllCourses();
    } catch (error) {
      console.error("Error creating course:", error);
    }
  };

  const handleEditCourseOpen = (course: Course) => {
    setCourseToEdit(course);
    const editModal = document.getElementById(
      "edit_course_modal"
    ) as HTMLInputElement;
    if (editModal) editModal.checked = true;
  };

  const handleEditCourseSubmit = async (course: Partial<Course>) => {
    try {
      const response = await axiosInstance.put(`/courses/edit/${course.id}`, {
        name: course.name,
        domain: course.domain,
        description: course.description,
        startDate: course.startDate,
        endDate: course.endDate,
        price: course.price,
        availablePlaces: course.availablePlaces,
        vacancies: course.availablePlaces,
        discount: course.discount || 0,
        languages: course.languages,
      });

      console.log(response.data);
      getAllCourses();
    } catch (error) {
      console.error("Error editing course:", error);
    }
  };

  return (
    <div className="flex flex-col items-center mt-10 px-4 mb-4">
      <div className="w-full max-w-6xl flex flex-col items-center">
        <div className="flex flex-col justify-between w-full mt-4 gap-4">
          <div className="flex flex-col items-center">
            <div className="flex items-center bg-ocean text-white text-xl rounded-full px-4 py-2 mt-8">
              <input
                type="text"
                placeholder="Search a course..."
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                className="bg-transparent outline-none placeholder-white w-80"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 ml-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>

            <div className="flex gap-10 mt-6">
              <div className="relative">
                <button
                  onClick={() => {
                    if (isDateFiltered) {
                      setFilteredCourses(courses);
                      setIsDateFiltered(false);
                      setDateRange([
                        {
                          startDate: new Date(),
                          endDate: new Date(),
                          key: "selection",
                        },
                      ]);
                      setShowDatePicker(false);
                    } else {
                      setShowDatePicker((prev) => !prev);
                    }
                  }}
                  className={`flex items-center gap-1 text-xl underline transition duration-300 ease-in-out hover:scale-105 ${
                    isDateFiltered ? "text-coral font-semibold" : "text-ocean"
                  }`}
                >
                  <CalendarIcon className="w-6 h-6" />
                  Pick by date
                </button>

                {showDatePicker && (
                  <div className="absolute z-50 mt-2 left-1/2 -translate-x-1/2 border rounded-lg shadow-lg bg-white bg-opacity-90 p-4">
                    <DateRange
                      ranges={dateRange}
                      onChange={(ranges) => setDateRange([ranges.selection])}
                      moveRangeOnFirstSelection={false}
                      rangeColors={["#A3C9A8"]}
                    />
                    <div className="flex justify-end mt-2">
                      <button
                        className="btn btn-sm bg-ocean text-white font-normal hover:bg-ocean-dark"
                        onClick={() =>
                          handleDateChange({ selection: dateRange[0] })
                        }
                      >
                        OK
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <button
                className={`flex items-center gap-1 text-xl underline transition duration-300 ease-in-out hover:scale-105 ${
                  showOffersOnly ? "text-coral font-semibold" : "text-ocean"
                }`}
                onClick={handleGetOffers}
              >
                <img src={OffersIcon} alt="Offers" className="w-7 h-7" />
                Get Offers
              </button>
            </div>

            {isDateFiltered &&
              dateRange[0].startDate &&
              dateRange[0].endDate && (
                <p className="mt-2 text-coral text-lg font-medium">
                  Selected range: {dateRange[0].startDate.toLocaleDateString()}{" "}
                  - {dateRange[0].endDate.toLocaleDateString()}
                </p>
              )}
          </div>

          <div className="flex items-end space-x-6 self-end mt-6">
            {isProfessor && (
              <>
                <button
                  className={`text-xl underline transition duration-300 ease-in-out hover:scale-105 ${
                    showMyCoursesOnly ? "text-mint font-semibold" : "text-ocean"
                  }`}
                  onClick={handleMyCoursesToggle}
                >
                  My Courses
                </button>

                <label
                  htmlFor="add_course_modal"
                  className="text-ocean underline text-xl whitespace-nowrap transition duration-300 ease-in-out hover:scale-105 hover:text-ocean-dark cursor-pointer"
                >
                  +Add Course
                </label>
              </>
            )}
          </div>
        </div>

        <div className="w-full mt-4">
          <Courses
            courses={filteredCourses}
            onEdit={handleEditCourseOpen}
            onDelete={(id) => {
              const course = courses.find((c) => c.id === id);
              if (!course) return;

              setCourseToDelete(course);
              const modal = document.getElementById(
                "delete_course_modal"
              ) as HTMLInputElement;
              if (modal) modal.checked = true;
            }}
            onRefresh={getAllCourses}
          />
        </div>
        <CourseModal
          mode="edit"
          modalId="edit_course_modal"
          initialCourse={courseToEdit}
          onSubmit={(updated) => {
            if (!courseToEdit) return;

            handleEditCourseSubmit({ ...courseToEdit, ...updated });

            const updatedList = filteredCourses.map((c) =>
              c.id === courseToEdit.id ? { ...c, ...updated } : c
            );
            setFilteredCourses(updatedList);
          }}
        />
      </div>
      {/* Dialog */}
      <CourseModal
        mode="add"
        modalId="add_course_modal"
        onSubmit={handleCreateCourse}
      />
      <input
        type="checkbox"
        id="delete_course_modal"
        className="modal-toggle"
      />
      <div className="modal text-ocean text-xl">
        <div className="modal-box max-w-lg">
          <h3 className="font-bold text-2xl mb-4 text-center text-coral">
            Confirm Deletion
          </h3>
          <p className="mb-6 text-center">
            Are you sure you want to delete{" "}
            <strong>{courseToDelete?.name}</strong>?
          </p>
          <div className="modal-action justify-end">
            <label htmlFor="delete_course_modal" className="btn">
              Cancel
            </label>
            <button
              onClick={handleDeleteCourse}
              className="btn btn-error text-white"
            >
              Yes, Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllCoursesPage;
