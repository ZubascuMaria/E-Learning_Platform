import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "@/styles/globals.css";
import HomePage from "./pages/home-page/index.tsx";
import Header from "./components/Header/index.tsx";
import Footer from "./components/Footer/index.tsx";
import ContactUs from "./pages/contact-us/index.tsx";
import LoginPage from "./pages/login-page/index.tsx";
import RegisterPage from "./pages/register-page/index.tsx";
import AllCoursesPage from "./pages/all-courses-page/index.tsx";
import StatisticsPage from "./pages/statistics/index.tsx";
import EnrollmentsPage from "./pages/enrolments/index.tsx";
import MyCoursesPage from "./pages/my-courses-page/index.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/contact-us",
    element: <ContactUs />,
  },
  {
    path: "/sign-in",
    element: <LoginPage />,
  },
  {
    path: "/sign-up",
    element: <RegisterPage />,
  },
  {
    path: "/all-courses",
    element: <AllCoursesPage />,
  },
  {
    path: "/statistics",
    element: <StatisticsPage />,
  },
  {
    path: "/enrollments",
    element: <EnrollmentsPage />,
  },
  {
    path: "/my-courses",
    element: <MyCoursesPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <div className="min-h-screen flex flex-col">
    <Header></Header>
    <main className="flex-1">
      <RouterProvider router={router} />
    </main>
    <Footer></Footer>
  </div>
);
