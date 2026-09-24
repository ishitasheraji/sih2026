'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { UserRole } from '@/types';

export interface UserProfile {
  name: string;
  title: string;
  id: string;
  jacketId?: string;
  role: UserRole;
}

interface RoleContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  currentUser: UserProfile;
  roleSubtitle: string;
  roleBadgeColor: string;
  isLoggedIn: boolean;
  isLoginModalOpen: boolean;
  openLoginModal: () => void;
  closeLoginModal: () => void;
  login: (selectedRole: UserRole, userIdentifier?: string) => void;
  logout: () => void;
}

const defaultUsers: Record<UserRole, UserProfile> = {
  Supervisor: {
    name: 'Rescuer Command',
    title: 'Chief Rescue Safety Controller',
    id: 'RSC-01',
    role: 'Supervisor',
  },
  Worker: {
    name: 'Underground Worker',
    title: 'Drill Operator (Jacket #SJ-003)',
    id: 'W1026',
    jacketId: 'SJ-003',
    role: 'Worker',
  },
};

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export function RoleProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<UserRole>('Worker');
  const [currentUser, setCurrentUser] = useState<UserProfile>(defaultUsers['Worker']);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const roleSubtitle = {
    Supervisor: 'Control Room & Safety Management',
    Worker: 'My Smart Jacket & Personal Vitals',
  }[role];

  const roleBadgeColor = {
    Supervisor: 'bg-[#E0F2FE] text-[#0284C7]',
    Worker: 'bg-[#DCFCE7] text-[#15803D]',
  }[role];

  const login = (selectedRole: UserRole, userIdentifier?: string) => {
    setRole(selectedRole);
    if (selectedRole === 'Worker') {
      setCurrentUser({
        name: userIdentifier ? `Worker (${userIdentifier})` : defaultUsers['Worker'].name,
        title: 'Underground Field Miner',
        id: userIdentifier || 'W1026',
        jacketId: 'SJ-003',
        role: 'Worker',
      });
    } else {
      setCurrentUser(defaultUsers['Supervisor']);
    }
    setIsLoggedIn(true);
    setIsLoginModalOpen(false);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setIsLoginModalOpen(true);
  };

  return (
    <RoleContext.Provider
      value={{
        role,
        setRole: (r: UserRole) => login(r),
        currentUser,
        roleSubtitle,
        roleBadgeColor,
        isLoggedIn,
        isLoginModalOpen,
        openLoginModal: () => setIsLoginModalOpen(true),
        closeLoginModal: () => setIsLoginModalOpen(false),
        login,
        logout,
      }}
    >
      {children}
    </RoleContext.Provider>
  );
}

export function useRole() {
  const context = useContext(RoleContext);
  if (!context) {
    throw new Error('useRole must be used within a RoleProvider');
  }
  return context;
}
