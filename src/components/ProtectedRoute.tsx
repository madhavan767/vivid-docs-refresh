import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
  /** If true, guest users (no login) are also allowed */
  guestAllowed?: boolean;
}

const ProtectedRoute = ({ children, guestAllowed = false }: ProtectedRouteProps) => {
  const { user, isGuest, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-2 border-border border-t-primary rounded-full animate-spin" />
          <p className="text-sm text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // Logged-in user → always allow
  if (user) return <>{children}</>;

  // Guest mode → only allow if route is guest-permitted
  if (isGuest && guestAllowed) return <>{children}</>;

  // Guest trying to access a locked route → show login with message
  if (isGuest && !guestAllowed) return <Navigate to="/login?reason=guest" replace />;

  // Not logged in at all → redirect to login
  return <Navigate to="/login" replace />;
};

export default ProtectedRoute;
