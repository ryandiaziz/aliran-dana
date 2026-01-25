import { useState } from 'react';
import PropTypes from 'prop-types';
import Sidebar from '../../fragments/Sidebar/Sidebar';
import { Menu as MenuIcon } from '@mui/icons-material';

const MainLayout = ({ children }) => {    
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="flex min-h-screen bg-gray-50">
            <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
            
            <div className="flex-1 flex flex-col min-h-screen">
                {/* Mobile Header */}
                <header className="md:hidden bg-white border-b border-gray-200 p-4 flex items-center gap-3 sticky top-0 z-20">
                    <button 
                        onClick={() => setIsSidebarOpen(true)}
                        className="p-1 -ml-1 text-gray-600 hover:text-gray-900 focus:outline-none"
                    >
                        <MenuIcon />
                    </button>
                    <span className="text-xl font-bold text-emerald-600 tracking-tight">
                        Aliran<span className="text-gray-900">Dana</span>
                    </span>
                </header>

                <main className="flex-1 w-full max-w-7xl mx-auto p-4 md:p-8 overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    )
}

MainLayout.propTypes = {
    children: PropTypes.node.isRequired
}

export default MainLayout