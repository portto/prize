import {
  createContext,
  ElementType,
  useCallback,
  useEffect,
  useState,
} from "react";
import * as fcl from "@onflow/fcl";

interface AuthContextInterface {
  user?: any;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextInterface>({
  login: () => {},
  logout: () => {},
});

export const withAuthContext = (Component: ElementType) => (props: any) => {
  const [user, setUser] = useState(null);

  const login = useCallback(() => fcl.authenticate(), []);
  const logout = useCallback(() => fcl.unauthenticate(), []);

  useEffect(() => {
    fcl.currentUser().subscribe((currentUser: any) => {
      setUser(currentUser);
    });
  }, []);

  return (
    <AuthContext.Provider value={{ login, logout, user }}>
      <Component {...props} />
    </AuthContext.Provider>
  );
};
export default AuthContext;
