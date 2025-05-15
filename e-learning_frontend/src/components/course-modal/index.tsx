import { Course } from "@/types/course";
import { useEffect, useState } from "react";
import { parse, format } from "date-fns";

interface CourseModalProps {
  mode: "add" | "edit";
  modalId: string;
  initialCourse?: Course | null;
  onSubmit: (course: Partial<Course>) => void;
}

const CourseModal: React.FC<CourseModalProps> = ({
  mode,
  modalId,
  initialCourse = null,
  onSubmit,
}) => {
  const [form, setForm] = useState<Partial<Course>>({
    name: "",
    domain: "",
    startDate: "",
    endDate: "",
    description: "",
    price: 0,
    availablePlaces: 0,
    languages: [],
  });

  useEffect(() => {
    if (mode === "edit" && initialCourse) {
      const tryParseDate = (dateStr: string): string => {
        let parsed;
        try {
          parsed = parse(dateStr, "dd/MM/yyyy", new Date());
          if (isNaN(parsed.getTime())) throw new Error();
          return format(parsed, "yyyy-MM-dd");
        } catch {
          return dateStr;
        }
      };

      setForm({
        ...initialCourse,
        startDate: tryParseDate(initialCourse.startDate),
        endDate: tryParseDate(initialCourse.endDate),
        discount: initialCourse.discount || 0,
      });
    }

    if (mode === "add") {
      setForm({
        name: "",
        domain: "",
        startDate: "",
        endDate: "",
        description: "",
        price: 0,
        discount: 0,
        availablePlaces: 0,
        languages: [],
      });
    }
  }, [initialCourse, mode]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        name === "languages"
          ? value.split(",").map((lang) => lang.trim())
          : name === "price" ||
            name === "availablePlaces" ||
            name === "discount"
          ? Number(value)
          : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
    const modal = document.getElementById(modalId) as HTMLInputElement;
    if (modal) modal.checked = false;
  };

  return (
    <>
      <input type="checkbox" id={modalId} className="modal-toggle" />
      <div className="modal text-ocean text-2xl">
        <div className="modal-box max-w-2xl">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <h2 className="text-2xl font-bold mb-2">
              {mode === "edit" ? "Edit Course" : "Add Course"}
            </h2>

            <div>
              <label className="label">
                <span className="label-text">Title</span>
              </label>
              <input
                type="text"
                name="name"
                placeholder="Text the course name"
                className="input input-bordered w-full text-lg"
                value={form.name || ""}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="label">
                <span className="label-text">Domain</span>
              </label>
              <input
                type="text"
                name="domain"
                placeholder="Ex: Programming, Marketing"
                className="input input-bordered w-full text-lg"
                value={form.domain || ""}
                onChange={handleChange}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4 space-x-12">
              <div>
                <label className="label">
                  <span className="label-text">Start Date</span>
                </label>
                <input
                  type="date"
                  name="startDate"
                  className="input input-bordered w-full text-lg"
                  value={form.startDate || ""}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="label">
                  <span className="label-text">End Date</span>
                </label>
                <input
                  type="date"
                  name="endDate"
                  className="input input-bordered w-full text-lg"
                  value={form.endDate || ""}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div>
              <label className="label">
                <span className="label-text">Description</span>
              </label>
              <textarea
                name="description"
                className="textarea textarea-bordered w-full text-lg"
                placeholder="Write a short course description"
                rows={2}
                value={form.description || ""}
                onChange={handleChange}
              ></textarea>
            </div>

            <div className={`grid grid-cols-3 gap-4`}>
              <div>
                <label className="label">
                  <span className="label-text">Cost (EUR)</span>
                </label>
                <input
                  type="number"
                  name="price"
                  min={0}
                  className="input input-bordered w-full text-lg"
                  placeholder="..."
                  value={form.price ?? ""}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="label">
                  <span className="label-text">Available places</span>
                </label>
                <input
                  type="number"
                  name="availablePlaces"
                  min={0}
                  className="input input-bordered w-full text-lg"
                  placeholder="..."
                  value={form.availablePlaces ?? ""}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="label">
                  <span className="label-text">Available Languages</span>
                </label>
                <input
                  type="text"
                  name="languages"
                  placeholder="Ex: RO, ENG"
                  className="input input-bordered w-full text-lg"
                  value={form.languages?.join(", ") || ""}
                  onChange={handleChange}
                />
              </div>
            </div>
            {mode === "edit" && (
              <div className="grid grid-cols-4 gap-2">
                <label className="label">
                  <span className="label-text text-coral">Discount (EUR)</span>
                </label>
                <input
                  type="number"
                  name="discount"
                  min={0}
                  className="input input-bordered w-full text-lg"
                  placeholder="Ex: 5"
                  value={form.discount ?? ""}
                  onChange={handleChange}
                />
              </div>
            )}

            <div className="modal-action">
              <label htmlFor={modalId} className="btn btn-lg font-normal">
                Cancel
              </label>
              <button
                type="submit"
                className="bg-mint hover:bg-mint text-white font-normal btn btn-lg"
              >
                {mode === "edit" ? "Save Changes" : "Add course"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CourseModal;
