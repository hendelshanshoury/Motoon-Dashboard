import React from "react";
import { lazy } from "react";
import Users from "../pages/Users/Users";
import MngUser from "../pages/Users/MngUser";
import ActivationId from "../pages/Users/ActivationId";
import MngActivationId from "../pages/Users/MngActivationId";
import AuthOrg from "../pages/Users/AuthOrg";
import Admins from "../pages/Users/Admins";
import Codes from "../pages/organizations/Codes";
import CodeChecker from "../pages/organizations/CodeChecker";
import Organizations from "../pages/organizations/Organizations";
import Semesters from "../pages/semesters/Semesters";
import Courses from "../pages/courses/Courses";
import Lessons from "../pages/lessons/Lessons";
import Bookmarks from "../pages/lessons/Bookmarks";
import MngBookmark from "../pages/lessons/MngBookmark";
import Quizes from "../pages/exams/Quizes";
import Midterms from "../pages/exams/Midterms";
import Finals from "../pages/exams/Finals";
import MngMidterm from "../pages/exams/MngMidterm";
import MngQuiz from "../pages/exams/MngExam";
import MngFinal from "../pages/exams/MngFinal";
import MngAdmin from "../pages/Users/MngAdmin";
import MngAuthOrg from "../pages/Users/MngAuthOrg";
import MngCode from "../pages/organizations/MngCode";
import MngOrganization from "../pages/organizations/MngOrganization";
import MngSemester from "../pages/semesters/MngSemester";
import Questions from "../pages/questions/questions";
import MngQuestion from "../pages/questions/Mngquestion";
import MngCourse from "../pages/courses/MngCourse";
import MngLesson from "../pages/lessons/MngLesson";
import AuthAdminLogin from "../pages/Authentication/AuthAdminLogin";
import Batches from "../pages/batches/Batches";
import MngBatches from "../pages/batches/MngBatches";
import ContactsUs from "../pages/contacts/ContactsUs";
import Supports from "../pages/supports/Supports";
import MngSettings from "../pages/settings/MngSettings";
import SortableLesson from "../pages/lessons/SortableLesson";
import SortableCourse from "../pages/courses/SortableCourse";
import SortableSemester from "../pages/semesters/SortableSemester";
import Centers from "../pages/organizations/Centers";
import MngCenter from "../pages/organizations/MngCenter";
import FinalAbsent from "../pages/exams/FinalAbsent";
import MidtermAbsent from "../pages/exams/MidtermAbsent";
// -------------------------
const Index = lazy(() => import("../pages/Index"));
const ComingSoonCover = lazy(() => import("../pages/Pages/ComingSoonCover"));
const ERROR404 = lazy(() => import("../pages/Pages/Error404"));
const Maintenence = lazy(() => import("../pages/Pages/Maintenence"));
const Login = lazy(() => import("../pages/Authentication/Login"));

const routes = [
  {
    path: "/",
    element: <Index />,
    protectedFor: [],
  },
  // -------------------------------------------------------------------------------------------- START USERS
  // USERS
  {
    path: "/users",
    element: <Users />,
    protectedFor: [],
  },
  {
    path: "/users/mng/new",
    element: <MngUser />,
    protectedFor: ["org"],
  },
  {
    path: "/users/mng/:id",
    element: <MngUser />,
    protectedFor: ["org"],
  },

  {
    path: "/activate-users-id/",
    element: <ActivationId />,
    protectedFor: [],
  },
  {
    path: "/activate-users-id/mng/:id",
    element: <MngActivationId />,
    protectedFor: [],
  },
  // Batches
  {
    path: "/batches",
    element: <Batches />,
    protectedFor: ["org"],
  },
  {
    path: "/batches/mng/new",
    element: <MngBatches />,
    protectedFor: ["org"],
  },
  {
    path: "/batches/mng/:id",
    element: <MngBatches />,
    protectedFor: ["org"],
  },
  // CONTACTS-US
  {
    path: "/contacts",
    element: <ContactsUs />,
    protectedFor: ["org"],
  },
  // Supports
  {
    path: "/supports",
    element: <Supports />,
    protectedFor: [],
  },
  // Settings
  {
    path: "/settings",
    element: <MngSettings />,
    protectedFor: ["org"],
  },

  // ADMINS
  {
    path: "/admins",
    element: <Admins />,
    protectedFor: ["org"],
  },
  {
    path: "/admins/mng/new",
    element: <MngAdmin />,
    protectedFor: ["org"],
  },
  {
    path: "/admins/mng/:id",
    element: <MngAdmin />,
    protectedFor: ["org"],
  },
  // AUTH ORGANIZATIONS
  {
    path: "/auth-org",
    element: <AuthOrg />,
    protectedFor: ["org"],
  },
  {
    path: "/auth-org/mng/new",
    element: <MngAuthOrg />,
    protectedFor: ["org"],
  },
  {
    path: "/auth-org/mng/:id",
    element: <MngAuthOrg />,
    protectedFor: ["org"],
  },
  // -------------------------------------------------------------------------------------------- END USERS
  // -------------------------------------------------------------------------------------------- START ORGANIZATIONS
  // CODES
  {
    path: "/codes",
    element: <Codes />,
    protectedFor: [],
  },
  {
    path: "/codes/mng/new",
    element: <MngCode />,
    protectedFor: ["org"],
  },
  {
    path: "/codes/mng/:id",
    element: <MngCode />,
    protectedFor: ["org"],
  },
  {
    path: "/codes-checker",
    element: <CodeChecker />,
    protectedFor: ["org"],
  },
  // ORGANIZATIONS & CENTERS
  {
    path: "/organizations",
    element: <Organizations />,
    protectedFor: ["org"],
  },
  {
    path: "/organizations/mng/new",
    element: <MngOrganization />,
    protectedFor: ["org"],
  },
  {
    path: "/organizations/mng/:id",
    element: <MngOrganization />,
    protectedFor: ["org"],
  },
  {
    path: "/centers",
    element: <Centers />,
    protectedFor: ["org"],
  },
  {
    path: "/centers/mng/new",
    element: <MngCenter />,
    protectedFor: ["org"],
  },
  {
    path: "/centers/mng/:id",
    element: <MngCenter />,
    protectedFor: ["org"],
  },
  {
    path: "/organizations/codes/mng/new",
    element: <MngCode />,
    protectedFor: ["org"],
  },
  {
    path: "/organizations/codes/mng/:id",
    element: <MngCode />,
    protectedFor: ["org"],
  },

  // -------------------------------------------------------------------------------------------- END ORGANIZATIONS
  // -------------------------------------------------------------------------------------------- START SEMESTERS
  // SEMESTERS
  {
    path: "/semesters",
    element: <Semesters />,
    protectedFor: ["org"],
  },
  {
    path: "/semesters/mng/new",
    element: <MngSemester />,
    protectedFor: ["org"],
  },
  {
    path: "/semesters/mng/:id",
    element: <MngSemester />,
    protectedFor: ["org"],
  },
  {
    path: "/sortabSemester",
    element: <SortableSemester />,
    protectedFor: ["org"],
  },

  // -------------------------------------------------------------------------------------------- END SEMESTERS
  // -------------------------------------------------------------------------------------------- START COURSES
  // COURSES
  {
    path: "/courses",
    element: <Courses />,
    protectedFor: ["org"],
  },
  {
    path: "/courses/mng/new",
    element: <MngCourse />,
    protectedFor: ["org"],
  },
  {
    path: "/courses/mng/:id",
    element: <MngCourse />,
    protectedFor: ["org"],
  },
  {
    path: "/sortableCourse",
    element: <SortableCourse />,
    protectedFor: ["org"],
  },

  // -------------------------------------------------------------------------------------------- END COURSES
  // -------------------------------------------------------------------------------------------- START LESSONS
  // LESSONS
  {
    path: "/lessons",
    element: <Lessons />,
    protectedFor: ["org"],
  },
  {
    path: "/lessons/mng/new",
    element: <MngLesson />,
    protectedFor: ["org"],
  },
  {
    path: "/lessons/mng/:id",
    element: <MngLesson />,
    protectedFor: ["org"],
  },
  // SortableLesson
  {
    path: "/sortableLesson",
    element: <SortableLesson />,
    protectedFor: ["org"],
  },
  {
    path: "/Bookmarks",
    element: <Bookmarks />,
    protectedFor: ["org"],
  },
  {
    path: "/Bookmarks/mng/new",
    element: <MngBookmark />,
    protectedFor: ["org"],
  },
  {
    path: "/Bookmarks/mng/:id",
    element: <MngBookmark />,
    protectedFor: ["org"],
  },
  // QUESTIONS
  {
    path: "/questions",
    element: <Questions />,
    protectedFor: ["org"],
  },
  {
    path: "/questions/mng/new",
    element: <MngQuestion />,
    protectedFor: ["org"],
  },
  {
    path: "/questions/mng/:id",
    element: <MngQuestion />,
    protectedFor: ["org"],
  },
  // -------------------------------------------------------------------------------------------- END LESSONS
  // -------------------------------------------------------------------------------------------- START EXAMS
  // QUIZES
  {
    path: "/exams/quizes",
    element: <Quizes />,
    protectedFor: [],
  },
  {
    path: "/exams/quizes/mng/new",
    element: <MngQuiz />,
    protectedFor: ["org"],
  },
  {
    path: "/exams/quizes/mng/:id",
    element: <MngQuiz />,
    protectedFor: ["org"],
  },

  // MIDTERM
  {
    path: "/exams/midterm",
    element: <Midterms />,
    protectedFor: [],
  },
  {
    path: "/exams/midterm-absent",
    element: <MidtermAbsent />,
    protectedFor: [],
  },
  {
    path: "/exams/midterm/mng/new",
    element: <MngMidterm />,
    protectedFor: ["org"],
  },
  {
    path: "/exams/midterm/mng/:id",
    element: <MngMidterm />,
    protectedFor: ["org"],
  },
  // FINAL
  {
    path: "/exams/final",
    element: <Finals />,
    protectedFor: [],
  },
  {
    path: "/exams/final-absent",
    element: <FinalAbsent />,
    protectedFor: [],
  },
  {
    path: "/exams/final/mng/new",
    element: <MngFinal />,
    protectedFor: ["org"],
  },
  {
    path: "/exams/final/mng/:id",
    element: <MngFinal />,
    protectedFor: ["org"],
  },
  // -------------------------------------------------------------------------------------------- END EXAMS
  // -------------------------------------------------------------------------------------------- START EXAMS
  {
    path: "/pages/coming-soon-cover",
    element: <ComingSoonCover />,
    protectedFor: [],
    layout: "blank",
  },
  {
    path: "/pages/maintenence",
    element: <Maintenence />,
    protectedFor: [],
    layout: "blank",
  },
  //Authentication
  {
    path: "/auth/signin",
    element: (
      <AuthAdminLogin>
        <Login />
      </AuthAdminLogin>
    ),
    protectedFor: ["org"],
    layout: "blank",
  },

  {
    path: "*",
    // element: <ERROR404 />,
    element: <ERROR404 />,
    protectedFor: ["org"],
    layout: "blank",
  },
];

export { routes };
