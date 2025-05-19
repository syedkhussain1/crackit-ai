'use client';

import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex bg-background">
      {/* Sidebar - fixed position on large screens */}
      <div className="hidden lg:block w-64 fixed inset-y-0 z-30 border-r border-border">
        <Sidebar />
      </div>
      
      {/* Main content area */}
      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen">
        {/* Navbar - sticky at top */}
        <div className="sticky top-0 z-20 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <Navbar />
        </div>
        
        {/* Page content with proper padding */}
        <main className="flex-1 p-4 md:p-6 lg:p-8 max-w-7xl mx-auto w-full">
          {children}
        </main>
      </div>
      <ToastContainer position="top-center" autoClose={2000} theme="colored" />
    </div>
  );
}