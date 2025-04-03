
import { createContext, useContext } from 'react';
import { User } from '@supabase/supabase-js';
import { UserRole } from '@/types/roleTypes';

// Mock user data for debugging
const mockUser: User = {
  id: 'mock-user-id',
  app_metadata: {},
  user_metadata: { name: 'Debug User' },
  aud: 'authenticated',
  created_at: new Date().toISOString(),
};

// Mock auth context values
export const mockAuthValues = {
  session: { user: mockUser, access_token: 'mock-token', refresh_token: 'mock-refresh' },
  user: mockUser,
  userRoles: ['admin', 'staff'] as UserRole[],
  userSuspended: false,
  loading: false,
  signUp: async (email: string, password: string, name: string) => ({ error: null }),
  signIn: async (email: string, password: string) => ({ error: null }),
  signOut: async () => {},
};

// Create context with mock values
export const MockAuthContext = createContext(mockAuthValues);

// Export hook to use the mock auth context
export const useAuth = () => useContext(MockAuthContext);
