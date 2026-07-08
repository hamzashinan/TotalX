import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import type { ReactElement } from "react";

interface Props {
  children: ReactElement;
}

export default function ProtectedRoute({
  children,
}: Props) {
  const { user, loading } = useAuth();

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return children;
}