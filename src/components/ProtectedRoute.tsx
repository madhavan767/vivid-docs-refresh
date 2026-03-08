import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import GuestUpgradeModal from "@/components/GuestUpgradeModal";

interface ProtectedRouteProps {
  children: React.ReactNode;
  /** If true, guest users are also allowed to view the page */
  guestAllowed?: boolean;
  /** Display name of the feature shown in the upgrade modal */
  featureName?: string;
}

const ProtectedRoute = ({ children, guestAllowed = false, featureName }: ProtectedRouteProps) => {
  const { user, isGuest, loading } = useAuth();
  const [modalOpen, setModalOpen] = useState(true);

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

  // Guest mode on allowed route → allow
  if (isGuest && guestAllowed) return <>{children}</>;

  // Guest trying to access a locked route → show upgrade modal over a blurred tools view
  if (isGuest && !guestAllowed) {
    return (
      <>
        <GuestUpgradeModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          featureName={featureName}
        />
        {/* Blurred background hint of the page */}
        <div className="min-h-screen bg-background flex items-center justify-center pointer-events-none select-none">
          <div className="text-center opacity-20">
            <div className="w-16 h-16 rounded-2xl bg-primary/20 mx-auto mb-4" />
            <div className="h-4 w-48 bg-muted rounded-lg mx-auto mb-2" />
            <div className="h-3 w-32 bg-muted rounded-lg mx-auto" />
          </div>
        </div>
      </>
    );
  }

  // Not logged in at all → redirect to login
  return <Navigate to="/login" replace />;
};

export default ProtectedRoute;
