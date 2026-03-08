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

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isGuest: boolean;
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

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      // If a real user logs in, clear guest mode
      if (firebaseUser) {
        sessionStorage.removeItem(GUEST_KEY);
        setIsGuest(false);
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
    sessionStorage.setItem(GUEST_KEY, "true");
    setIsGuest(true);
  };

  const exitGuest = () => {
    sessionStorage.removeItem(GUEST_KEY);
    setIsGuest(false);
  };

  const signOut = async () => {
    await firebaseSignOut(auth);
    sessionStorage.removeItem(GUEST_KEY);
    setIsGuest(false);
  };

  return (
    <AuthContext.Provider value={{ user, loading, isGuest, signInWithEmail, signUpWithEmail, signInWithGoogle, continueAsGuest, exitGuest, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
