'use client';

import React, { useState } from 'react';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import LoginModal from '@/components/auth/LoginModal';
import EmergencySosModal from '@/components/ui/EmergencySosModal';
import { RoleProvider } from '@/context/RoleContext';
import { TelemetryProvider } from '@/context/TelemetryContext';

export function ShellLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <RoleProvider>
      <TelemetryProvider>
        <LoginModal />
        <div className="min-h-screen bg-[#EEF3FA] flex">
          {/* Left Sidebar */}
          <Sidebar
            collapsed={collapsed}
            onToggleCollapse={() => setCollapsed(!collapsed)}
            mobileOpen={mobileOpen}
            onCloseMobile={() => setMobileOpen(false)}
          />

          {/* Main Content Area */}
          <div
            className={`
              flex-1 flex flex-col min-w-0 transition-all duration-300 ease-in-out
              ${collapsed ? 'lg:pl-20' : 'lg:pl-72'}
            `}
          >
            {/* Top Bar */}
            <TopBar onOpenMobile={() => setMobileOpen(true)} />

            {/* Floating Rounded White Content Panel (Unstop style: radius 24px) */}
            <main className="flex-1 px-3 sm:px-6 lg:px-8 pb-6">
              <div className="bg-white border border-[#E3EAF5] rounded-[24px] shadow-[0_4px_24px_rgba(15,23,42,0.04)] min-h-[calc(100vh-6.5rem)] p-4 sm:p-6 lg:p-8">
                {children}
              </div>
            </main>
          </div>
        </div>
      </TelemetryProvider>
    </RoleProvider>
  );
}

export default ShellLayout;
