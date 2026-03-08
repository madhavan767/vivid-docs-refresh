import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import {
  User,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut as firebaseSignOut,
  updateProfile,
  UserCredential,
} from "firebase/auth";
import { auth, googleProvider } from "@/config/firebase";

// Guest mode stored in sessionStorage — cleared on tab close
const GUEST_KEY = "viadocs_guest";
const GUEST_ID_KEY = "viadocs_guest_id";

const generateGuestId = () => {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  let id = "guest";
  for (let i = 0; i < 10; i++) {
    id += chars[Math.floor(Math.random() * chars.length)];
  }
  return id;
};

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isGuest: boolean;
  guestId: string | null;
  signInWithEmail: (email: string, password: string) => Promise<UserCredential>;
  signUpWithEmail: (email: string, password: string, fullName: string) => Promise<UserCredential>;
  signInWithGoogle: () => Promise<UserCredential>;
  continueAsGuest: () => void;
  exitGuest: () => void;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  isGuest: false,
  guestId: null,
  signInWithEmail: async () => { throw new Error("AuthProvider not mounted"); },
  signUpWithEmail: async () => { throw new Error("AuthProvider not mounted"); },
  signInWithGoogle: async () => { throw new Error("AuthProvider not mounted"); },
  continueAsGuest: () => {},
  exitGuest: () => {},
  signOut: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isGuest, setIsGuest] = useState(() => sessionStorage.getItem(GUEST_KEY) === "true");
  const [guestId, setGuestId] = useState<string | null>(
    () => sessionStorage.getItem(GUEST_ID_KEY)
  );

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      // If a real user logs in, clear guest mode
      if (firebaseUser) {
        sessionStorage.removeItem(GUEST_KEY);
        sessionStorage.removeItem(GUEST_ID_KEY);
        setIsGuest(false);
        setGuestId(null);
      }
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const signInWithEmail = (email: string, password: string) =>
    signInWithEmailAndPassword(auth, email, password);

  const signUpWithEmail = async (email: string, password: string, fullName: string) => {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(cred.user, { displayName: fullName });
    return cred;
  };

  const signInWithGoogle = () => signInWithPopup(auth, googleProvider);

  const continueAsGuest = () => {
    // Reuse existing guest ID if already set (same session)
    let id = sessionStorage.getItem(GUEST_ID_KEY);
    if (!id) {
      id = generateGuestId();
      sessionStorage.setItem(GUEST_ID_KEY, id);
    }
    sessionStorage.setItem(GUEST_KEY, "true");
    setIsGuest(true);
    setGuestId(id);
  };

  const exitGuest = () => {
    sessionStorage.removeItem(GUEST_KEY);
    sessionStorage.removeItem(GUEST_ID_KEY);
    setIsGuest(false);
    setGuestId(null);
  };

  const signOut = async () => {
    await firebaseSignOut(auth);
    sessionStorage.removeItem(GUEST_KEY);
    sessionStorage.removeItem(GUEST_ID_KEY);
    setIsGuest(false);
    setGuestId(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, isGuest, guestId, signInWithEmail, signUpWithEmail, signInWithGoogle, continueAsGuest, exitGuest, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
