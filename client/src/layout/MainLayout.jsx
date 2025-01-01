import React from 'react';
import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Footer from './Footer';

const MainLayout = () => {
    const { isAuthenticated, user } = useSelector((state) => state.auth);
    const [sidebarOpen, setSidebarOpen] = React.useState(false);

    // If not authenticated, redirect to login
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} user={user} />
            <div className="flex">
                <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} user={user} />
                <main className="flex-1 px-4 sm:px-6 lg:px-8 py-8 min-h-[calc(100vh-4rem-3rem)]">
                    <Outlet />
                </main>
            </div>
            <Footer />
        </div>
    );
};
