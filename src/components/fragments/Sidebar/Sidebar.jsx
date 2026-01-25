import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';
import { 
    Dashboard as DashboardIcon, 
    ReceiptLong as ReceiptIcon, 
    AccountBalanceWallet as WalletIcon, 
    PieChart as BudgetIcon, 
    Settings as SettingsIcon,
    Logout as LogoutIcon
} from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { authLogout } from '../../../redux/auth/authSlice';

const Sidebar = ({ isOpen, onClose }) => {
    const location = useLocation();
    const dispatch = useDispatch();

    const menuItems = [
        { name: 'Dashboard', icon: <DashboardIcon />, path: '/' },
        { name: 'Transactions', icon: <ReceiptIcon />, path: '/transactions' },
        { name: 'Wallets', icon: <WalletIcon />, path: '/wallets' },
        { name: 'Budget', icon: <BudgetIcon />, path: '/budget' },
        { name: 'Settings', icon: <SettingsIcon />, path: '/settings' },
    ];

    const handleLogout = () => {
        dispatch(authLogout());
    };

    return (
        <>
            {/* Mobile Backdrop */}
            <div 
                className={`fixed inset-0 bg-black/50 z-30 transition-opacity duration-300 md:hidden ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={onClose}
                aria-hidden="true"
            />

            {/* Sidebar */}
            <aside className={`
                fixed md:static inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200 
                transform transition-transform duration-300 ease-in-out md:transform-none
                ${isOpen ? 'translate-x-0' : '-translate-x-full'}
                flex flex-col h-full
            `}>
                <div className="p-6 border-b border-gray-100 flex items-center justify-between md:justify-center">
                    <h1 className="text-2xl font-bold text-emerald-600 tracking-tight">
                        Aliran<span className="text-gray-900">Dana</span>
                    </h1>
                    {/* Close button for mobile inside sidebar (optional but good for accessibility) */}
                    <button onClick={onClose} className="md:hidden text-gray-500 hover:text-gray-700">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-1">
                    {menuItems.map((item) => {
                        const isActive = location.pathname === item.path;
                        return (
                            <Link
                                key={item.name}
                                to={item.path}
                                onClick={onClose} // Close sidebar on mobile when link clicked
                                className={`
                                    flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
                                    ${isActive 
                                        ? 'bg-emerald-50 text-emerald-700 font-medium shadow-sm ring-1 ring-emerald-100' 
                                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                    }
                                `}
                            >
                                <span className={isActive ? 'text-emerald-600' : 'text-gray-400'}>
                                    {item.icon}
                                </span>
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-gray-100">
                    <button 
                        onClick={handleLogout}
                        className="flex items-center gap-3 w-full px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-colors font-medium"
                    >
                        <LogoutIcon className="text-red-500" />
                        Logout
                    </button>
                </div>
            </aside>
        </>
    );
};

Sidebar.propTypes = {
    isOpen: PropTypes.bool,
    onClose: PropTypes.func
};

export default Sidebar;
