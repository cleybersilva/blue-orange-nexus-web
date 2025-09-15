import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { SidebarProvider } from '@/components/ui/sidebar';
import { SaasSidebar } from './SaasSidebar';
import { SaasHeader } from './SaasHeader';
import { Toaster } from '@/components/ui/toaster';

export const SaasLayout = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <SaasSidebar />
        <div className="flex-1 flex flex-col">
          <SaasHeader />
          <main className="flex-1 p-6 overflow-auto">
            <Outlet />
          </main>
        </div>
        <Toaster />
      </div>
    </SidebarProvider>
  );
};