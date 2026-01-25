import { useSelector } from 'react-redux';
import ShowLoading from '../../elements/Loading';
import ListItemTransaction from '../../elements/ListItemTransaction'; // Assuming this component needs refactoring too, but for now using it or finding it.

const ListTransactions = () => {
    const { transactions, isLoading } = useSelector((state) => state.transaction.list);

    const hasTransactions = Object.keys(transactions).length > 0;

    if (isLoading) {
        return (
            <div className="flex justify-center items-center py-10">
                <ShowLoading />
            </div>
        );
    }

    if (!hasTransactions) {
        return (
            <div className="flex flex-col items-center justify-center py-12 text-center bg-white rounded-2xl shadow-sm border border-gray-100 mt-6">
                <div className="bg-gray-50 p-4 rounded-full mb-4">
                    <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900">No transactions</h3>
                <p className="text-gray-500 text-sm mt-1">
                    No transactions found for this date.
                </p>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-6 mt-6 pb-20">
            {Object.keys(transactions).map((date) => (
                <div key={date} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="bg-gray-50/50 px-6 py-3 border-b border-gray-100">
                        <h4 className="font-semibold text-gray-700 text-sm tracking-wide bg-white inline-block px-3 py-1 rounded-lg border border-gray-100 shadow-sm">
                            {date}
                        </h4>
                    </div>
                    <div className="divide-y divide-gray-50">
                        {transactions[date].map((transaction) => (
                            <ListItemTransaction
                                key={transaction.transaction_id}
                                transactionData={transaction}
                            />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default ListTransactions;
