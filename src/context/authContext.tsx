import { createContext, useState, useEffect, ReactNode } from "react";
import { User, onAuthStateChanged, getIdToken } from "firebase/auth";
import { auth } from "../firebase";

type AuthContextType = {
  user: User | null;
  setAuthData: (user: User, token: string) => void;
  logout: () => void;
  loading: boolean;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const setAuthData = async (user: User) => {
    setUser(user);
    const token = await user.getIdToken();
    localStorage.setItem("fireToken", token);
  };

  const logout = () => {
    auth.signOut();
    setUser(null);
    localStorage.removeItem("fireToken");
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const token = await getIdToken(firebaseUser);
        setUser(firebaseUser);
        localStorage.setItem("fireToken", token);
      } else {
        setUser(null);
        localStorage.removeItem("fireToken");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setAuthData, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
