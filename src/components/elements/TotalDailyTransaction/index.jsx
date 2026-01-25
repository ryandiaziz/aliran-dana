import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { TransactionType } from '../../../enums/Index.js';
import { showRupiah } from '../../../utils/helper';
import { ArrowUpward, ArrowDownward, AccountBalanceWallet } from '@mui/icons-material';

const StatCard = ({ title, amount, type, icon: Icon }) => {
    let colorClass = 'text-gray-900';
    let bgClass = 'bg-gray-100';
    let iconColor = 'text-gray-500';

    if (type === TransactionType.Income) {
        colorClass = 'text-emerald-600';
        bgClass = 'bg-emerald-50';
        iconColor = 'text-emerald-500';
    } else if (type === TransactionType.Expense) {
        colorClass = 'text-red-600';
        bgClass = 'bg-red-50';
        iconColor = 'text-red-500';
    } else if (type === TransactionType.Total) {
        colorClass = 'text-blue-600';
        bgClass = 'bg-blue-50';
        iconColor = 'text-blue-500';
    }

    return (
        <div className="flex-1 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between min-w-[100px]">
            <div className={`p-2 rounded-xl w-fit mb-3 ${bgClass}`}>
                <Icon className={iconColor} fontSize="small" />
            </div>
            <div>
                <p className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-1">{title}</p>
                <p className={`text-base md:text-lg font-bold ${colorClass} truncate`}>
                    {amount}
                </p>
            </div>
        </div>
    );
};

StatCard.propTypes = {
    title: PropTypes.string.isRequired,
    amount: PropTypes.string.isRequired,
    type: PropTypes.string,
    icon: PropTypes.elementType.isRequired
};

const TotalDailyTransaction = () => {
    const { count } = useSelector((state) => state.transaction);

    return (
        <div className="flex gap-4 overflow-x-auto pb-2">
            <StatCard 
                title="Income" 
                amount={showRupiah(count.income)} 
                type={TransactionType.Income} 
                icon={ArrowUpward}
            />
            <StatCard 
                title="Expense" 
                amount={showRupiah(count.expense)} 
                type={TransactionType.Expense} 
                icon={ArrowDownward}
            />
            <StatCard 
                title="Total" 
                amount={showRupiah(count.total)} 
                type={TransactionType.Total} 
                icon={AccountBalanceWallet}
            />
        </div>
    )
}

export default TotalDailyTransaction;