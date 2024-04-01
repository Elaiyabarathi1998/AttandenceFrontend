
// AuthContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { UserService } from '../AuthService/AuthService';

interface AuthContextType {
  user: any | null;
  admin: any | null;
  userDetails : any | null;
  login: (username: string, password: string) => Promise<void>;
  adminLogin: (username: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any | null>(null);
  const [userDetails, setUserDetails] = useState<any | null>(null);
  const [admin, setAdmin] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const userToken = UserService.getUserToken();
      const adminToken = UserService.getAdminToken();

      if (userToken) {
        try {
          const userData = await UserService.fetchUserProfile();
          setUser(userData);
        } catch (error) {
          console.error('Error fetching user profile:', error);
          UserService.removeUserToken();
        }
      }
      if (userToken) {
        try {
          const userData = await UserService.fetchUserProfileDetails();;
          setUserDetails(userData);
        } catch (error) {
          console.error('Error fetching user profile:', error);
          UserService.removeUserToken();
        }
      }
      if (adminToken) {
        try {
          const adminData = await UserService.fetchAdminProfile();
          setAdmin(adminData);
        } catch (error) {
          console.error('Error fetching admin profile:', error);
          UserService.removeAdminToken();
        }
      }

      setLoading(false);
    };

    fetchData();
  }, []);

  const login = async (username: string, password: string) => {
    try {
      await UserService.login(username, password);
      const userData = await UserService.fetchUserProfile();
      const userDataDetails = await UserService.fetchUserProfileDetails();
      setUser(userData);
      setUserDetails(userDataDetails);
    } catch (error) {
      console.error('User login error:', error);
      throw error;
    }
  };

  const adminLogin = async (username: string,password: string) => {
    try {
      await UserService.loginAdmin(username, password);
      const adminData = await UserService.fetchAdminProfile();
      setAdmin(adminData);
      // localStorage.setItem('adminToken', adminData.token);
    } catch (error) {
      console.error('Admin login error:', error);
      throw error;
    }
  };


  const logout = () => {
    UserService.removeUserToken();
    UserService.removeAdminToken();
    localStorage.removeItem('userToken');
    localStorage.removeItem('adminToken');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user,userDetails, admin, login, adminLogin,  logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};