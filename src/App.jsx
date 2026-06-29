import { useState } from "react";
import "./App.css";
import PrivateRoute from "./components/PrivateRoute";
import { Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { ProjectsPage } from "./pages/ProjectsPage";
import { ProjectDetailPage } from "./pages/ProjectDetailPage";
import { AdminPage } from "./pages/admin/AdminPage";
import { CreateProjectPage } from "./pages/admin/CreateProjectPage";
import { EditProjectPage } from "./pages/admin/EditProjectPage";
import { AboutPage } from "./pages/AboutPage";
import { Navbar } from "./components/Navbar";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Navbar />
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
    </>
  );
}

export default App;
