import { useState, Suspense, lazy } from "react"; // 1. Ajout de Suspense et lazy
import "./App.css";
import PrivateRoute from "./components/PrivateRoute";
import { Route, Routes } from "react-router-dom";
import { Navbar } from "./components/Navbar";

// 2. Remplacement des imports de pages par des imports dynamiques (lazy)
const HomePage = lazy(() => import("./pages/HomePage").then(m => ({ default: m.HomePage })));
const LoginPage = lazy(() => import("./pages/LoginPage").then(m => ({ default: m.LoginPage })));
const ProjectsPage = lazy(() => import("./pages/ProjectsPage").then(m => ({ default: m.ProjectsPage })));
const ProjectDetailPage = lazy(() => import("./pages/ProjectDetailPage").then(m => ({ default: m.ProjectDetailPage })));
const AdminPage = lazy(() => import("./pages/admin/AdminPage").then(m => ({ default: m.AdminPage })));
const CreateProjectPage = lazy(() => import("./pages/admin/CreateProjectPage").then(m => ({ default: m.CreateProjectPage })));
const EditProjectPage = lazy(() => import("./pages/admin/EditProjectPage").then(m => ({ default: m.EditProjectPage })));
const AboutPage = lazy(() => import("./pages/AboutPage").then(m => ({ default: m.AboutPage })));

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      {/* La Navbar reste en import normal, elle s'affichera immédiatement */}
      <Navbar />
      
      {/* 3. Suspense englobe les Routes. Le fallback s'affiche pendant le téléchargement du composant. */}
      {/* J'ai utilisé Tailwind pour te faire un loader centré qui matche avec ton design */}
      <Suspense fallback={
        <div className="flex h-[calc(100vh-80px)] w-full items-center justify-center text-blue-950 font-bold font-['Atkinson_Hyperlegible']">
          Chargement...
        </div>
      }>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/:id" element={<ProjectDetailPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route
            path="/admin"
            element={
              <PrivateRoute role="admin">
                <AdminPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/projects/new"
            element={
              <PrivateRoute role="admin">
                <CreateProjectPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/projects/:id/edit"
            element={
              <PrivateRoute role="admin">
                <EditProjectPage />
              </PrivateRoute>
            }
          />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;