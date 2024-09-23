// contexts/AuthContext.tsx
import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLoader } from "./LoaderContext";

interface AuthContextData {
  isLoggedIn: boolean;
  userInfo: any;
  isOnboarded: any;
  login: (newState: any) => void;
  logout: () => void;
  setOnboard: (ISONBOARDED: any) => void;
}

const userInitialValue = {
  isLoggedIn: false,
  userInfo: "",
  isOnboarded: false,
  login: () => {},
  logout: () => {},
  setOnboard: () => {},
};

const AuthContext = createContext<AuthContextData>(userInitialValue);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(
    userInitialValue.isLoggedIn
  );
  const [userInfo, setUserInfo] = useState<any>(userInitialValue.userInfo);
  const [isOnboarded, setIsOnboarded] = useState<any>(
    userInitialValue.isOnboarded
  );
  const { setIsLoading } = useLoader();

  useEffect(() => {
    setIsLoading(true);
    const loadUserData = async () => {
      const userData = await AsyncStorage.getItem("userData");
      const onboarding = await AsyncStorage.getItem("isonboarded");
      setUserInfo(userData);
      if (userData) {
        userInitialValue.isLoggedIn = true;
        setIsLoading(false);
        setIsLoggedIn(true);
      } else {
        userInitialValue.isLoggedIn = false;
        setIsLoggedIn(false);
      }

      if (onboarding) {
        setIsOnboarded(true);
      } else {
        setIsOnboarded(false);
      }
    };

    loadUserData();
  }, []);

  const login = async (userData: any) => {
    await AsyncStorage.setItem("userData", JSON.stringify(userData));
    setUserInfo(JSON.stringify(userData.data));
    setIsLoggedIn(true);
  };

  const logout = async () => {
    await AsyncStorage.removeItem("userData");
    setIsLoggedIn(false);
  };

  const setOnboard = async (ISONBOARDED: any) => {
    await AsyncStorage.setItem("isonboarded", JSON.stringify(ISONBOARDED));
    setIsOnboarded(true);
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, login, logout, userInfo, isOnboarded, setOnboard }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
