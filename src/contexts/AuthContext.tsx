import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  username: string | null;
  login: (username: string) => void;
  logout: () => void;
  approvedEmails: string[];
  addApprovedEmail: (email: string) => void;
  removeApprovedEmail: (email: string) => void;
  isEmailApproved: (email: string) => boolean;
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

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState<string | null>(null);
  const [approvedEmails, setApprovedEmails] = useState<string[]>(() => {
    // Initialize with some demo approved emails
    const saved = localStorage.getItem('approvedEmails');
    return saved ? JSON.parse(saved) : [
      'john@snapflow.com',
      'sarah@snapflow.com',
      'demo@snapflow.com'
    ];
  });

  useEffect(() => {
    // Check if user is already authenticated on app load
    const authStatus = localStorage.getItem('isAuthenticated');
    const savedUsername = localStorage.getItem('username');
    
    if (authStatus === 'true' && savedUsername) {
      setIsAuthenticated(true);
      setUsername(savedUsername);
    }
  }, []);

  useEffect(() => {
    // Save approved emails to localStorage
    localStorage.setItem('approvedEmails', JSON.stringify(approvedEmails));
  }, [approvedEmails]);

  const login = (username: string) => {
    setIsAuthenticated(true);
    setUsername(username);
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('username', username);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUsername(null);
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('username');
  };

  const addApprovedEmail = (email: string) => {
    if (!approvedEmails.includes(email.toLowerCase())) {
      setApprovedEmails([...approvedEmails, email.toLowerCase()]);
    }
  };

  const removeApprovedEmail = (email: string) => {
    setApprovedEmails(approvedEmails.filter(e => e !== email.toLowerCase()));
  };

  const isEmailApproved = (email: string) => {
    return approvedEmails.includes(email.toLowerCase());
  };

  const value = {
    isAuthenticated,
    username,
    login,
    logout,
    approvedEmails,
    addApprovedEmail,
    removeApprovedEmail,
    isEmailApproved,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 