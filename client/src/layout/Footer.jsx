const Footer = () => {
    return (
        <footer className="bg-white shadow-lg mt-auto">
            <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center">
                    <div className="text-sm text-gray-500">
                        © {new Date().getFullYear()} Your Company. All rights reserved.
                    </div>
                    <div className="flex space-x-6">
                        <a href="#" className="text-gray-500 hover:text-gray-900 text-sm">
                            Privacy Policy
                        </a>
                        <a href="#" className="text-gray-500 hover:text-gray-900 text-sm">
                            Terms of Service
                        </a>
                        <a href="#" className="text-gray-500 hover:text-gray-900 text-sm">
                            Contact Us
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export { MainLayout, Navbar, Sidebar, Footer };
