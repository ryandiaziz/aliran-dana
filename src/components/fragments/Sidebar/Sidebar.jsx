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

const Sidebar = () => {
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
        <aside className="hidden md:flex flex-col w-64 bg-white border-r border-gray-200 min-h-screen sticky top-0">
            <div className="p-6 border-b border-gray-100 flex items-center justify-center">
                <h1 className="text-2xl font-bold text-emerald-600 tracking-tight">
                    Aliran<span className="text-gray-900">Dana</span>
                </h1>
            </div>

            <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-1">
                {menuItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                        <Link
                            key={item.name}
                            to={item.path}
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
    );
};

export default Sidebar;
