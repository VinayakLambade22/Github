import React from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./authContext";
import Dashboard from "./components/dashboard/Dashboard";
import Profile from "./components/user/Profile";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import CreateRepo from "./components/repository/CreateRepo";
import RepoPage from "./components/repository/RepoPage";
import RepoSettings from "./components/repository/RepoSettings";
import NewIssue from "./components/repository/NewIssue";
import Explore from "./components/pages/Explore";
import EditProfile from "./components/user/EditProfile";

const PrivateRoute = () => {
  const { currentUser } = useAuth();
  return currentUser ? <Outlet /> : <Navigate to="/login" replace />;
};
const PublicRoute = () => {
  const { currentUser } = useAuth();
  return !currentUser ? <Outlet /> : <Navigate to="/" replace />;
};

const ProjectRoutes = () => {
  return (
    <Routes>
      <Route element={<PublicRoute />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Route>
      <Route element={<PrivateRoute />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings/profile" element={<EditProfile />} />
        <Route path="/new" element={<CreateRepo />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/:ownerName/:repoName" element={<RepoPage />} />
        <Route
          path="/:ownerName/:repoName/settings"
          element={<RepoSettings />}
        />
        <Route path="/:ownerName/:repoName/issues/new" element={<NewIssue />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default ProjectRoutes;
