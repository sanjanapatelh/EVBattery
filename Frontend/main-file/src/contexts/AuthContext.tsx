import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  username: string;
  userType: 'ev-manufacturer' | 'battery-manufacturer' | 'ev-consumer' | 'recycler';
  externalId: string;
  universalId: string;
  companyCode: string;
}

interface StoredCredential {
  username: string;
  password: string;
  userId: string;
  userType: 'ev-manufacturer' | 'battery-manufacturer' | 'ev-consumer' | 'recycler';
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  registerUser: (username: string, password: string, userId: string, userType: string) => void;
  isLoading: boolean;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [storedCredentials, setStoredCredentials] = useState<StoredCredential[]>([]);

  useEffect(() => {
    // Load stored credentials from localStorage
    const savedCredentials = localStorage.getItem('userCredentials');
    if (savedCredentials) {
      try {
        setStoredCredentials(JSON.parse(savedCredentials));
      } catch (error) {
        console.error('Error parsing saved credentials:', error);
        localStorage.removeItem('userCredentials');
      }
    }

    // Check if user is logged in from localStorage
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error parsing saved user:', error);
        localStorage.removeItem('user');
      }
    }
    setIsLoading(false);
  }, []);

  // Save credentials to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('userCredentials', JSON.stringify(storedCredentials));
  }, [storedCredentials]);

  const registerUser = (username: string, password: string, userId: string, userType: string) => {
    const newCredential: StoredCredential = {
      username,
      password,
      userId,
      userType: userType as any
    };
    
    setStoredCredentials(prev => [...prev, newCredential]);
    console.log('AuthContext: Registered new user:', newCredential);
  };

  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      console.log('AuthContext: Attempting login for username:', username);
      
      // Call the API login endpoint
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        console.log('AuthContext: Login failed:', errorData.error);
        return false;
      }
      
      const data = await response.json();
      
      if (data.success && data.user) {
        setUser(data.user);
        localStorage.setItem('user', JSON.stringify(data.user));
        console.log('AuthContext: Login successful, user set:', data.user);
        return true;
      } else {
        console.log('AuthContext: Login failed - no user data');
        return false;
      }
      
    } catch (error) {
      console.error('AuthContext: Login error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const value: AuthContextType = {
    user,
    login,
    logout,
    registerUser,
    isLoading,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
