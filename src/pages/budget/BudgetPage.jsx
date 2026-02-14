import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSummaryCategory, getSummaryTrend } from '../../redux/transaction.js/transactionReducers';
import CategoryChart from '../../components/fragments/Budget/CategoryChart';
import TrendChart from '../../components/fragments/Budget/TrendChart';
import MainLayout from '../../components/layouts/MainLayout';
import dayjs from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

const BudgetPage = () => {
    const dispatch = useDispatch();
    const { summaryCategory, summaryTrend } = useSelector((state) => state.transaction);
    
    // State for filters
    const [startDate, setStartDate] = useState(dayjs().startOf('year'));
    const [endDate, setEndDate] = useState(dayjs().endOf('year'));
    const [selectedYear, setSelectedYear] = useState(dayjs());
    const [transactionType, setTransactionType] = useState('expense');

    useEffect(() => {
        // Fetch Category Data
        dispatch(getSummaryCategory({
            start_date: startDate.format('YYYY-MM-DD'),
            end_date: endDate.format('YYYY-MM-DD'),
            type: transactionType
        }));
    }, [dispatch, startDate, endDate, transactionType]);

    useEffect(() => {
        // Fetch Trend Data
        dispatch(getSummaryTrend({
            year: selectedYear.format('YYYY')
        }));
    }, [dispatch, selectedYear]);

    return (
        <MainLayout>
            <div className="space-y-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Budget & Analytics</h1>
                        <p className="text-gray-500 mt-1">Visualize your financial flows</p>
                    </div>
                </div>

                {/* Charts Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    
                    {/* Category Chart Section */}
                    <div className="space-y-4">
                        <div className="flex flex-col gap-4 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
                            <div className="flex bg-gray-100 p-1 rounded-xl">
                                <button
                                    onClick={() => setTransactionType('expense')}
                                    className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                                        transactionType === 'expense' 
                                            ? 'bg-white text-red-600 shadow-sm' 
                                            : 'text-gray-500 hover:text-gray-700'
                                    }`}
                                >
                                    Expense
                                </button>
                                <button
                                    onClick={() => setTransactionType('income')}
                                    className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                                        transactionType === 'income' 
                                            ? 'bg-white text-emerald-600 shadow-sm' 
                                            : 'text-gray-500 hover:text-gray-700'
                                    }`}
                                >
                                    Income
                                </button>
                            </div>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <div className="flex gap-2 w-full">
                                    <DatePicker
                                        label="Start Date"
                                        value={startDate}
                                        onChange={(newValue) => setStartDate(newValue)}
                                        slotProps={{ textField: { size: 'small', fullWidth: true } }}
                                    />
                                    <DatePicker
                                        label="End Date"
                                        value={endDate}
                                        onChange={(newValue) => setEndDate(newValue)}
                                        slotProps={{ textField: { size: 'small', fullWidth: true } }}
                                    />
                                </div>
                            </LocalizationProvider>
                        </div>
                        
                        <div className="h-[400px]">
                            <CategoryChart 
                                data={summaryCategory.data} 
                                isLoading={summaryCategory.isLoading} 
                                type={transactionType}
                            />
                        </div>
                    </div>

                    {/* Trend Chart Section */}
                    <div className="space-y-4">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-end gap-4 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    views={['year']}
                                    label="Year"
                                    value={selectedYear}
                                    onChange={(newValue) => setSelectedYear(newValue)}
                                    slotProps={{ textField: { size: 'small', className: 'w-full sm:w-32' } }}
                                />
                            </LocalizationProvider>
                        </div>

                        <div className="h-[400px]">
                            <TrendChart 
                                data={summaryTrend.data} 
                                isLoading={summaryTrend.isLoading} 
                            />
                        </div>
                    </div>
                </div>
                
                {/* Summary Cards (Optional Enhancement) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100">
                        <p className="text-emerald-600 font-medium text-sm">Total Income (Year)</p>
                        <h3 className="text-2xl font-bold text-emerald-900 mt-2">
                            Rp {new Intl.NumberFormat('id-ID').format(
                                summaryTrend.data?.reduce((acc, curr) => acc + Number(curr.total_income), 0) || 0
                            )}
                        </h3>
                    </div>
                    <div className="bg-red-50 p-6 rounded-2xl border border-red-100">
                        <p className="text-red-600 font-medium text-sm">Total Expense (Year)</p>
                        <h3 className="text-2xl font-bold text-red-900 mt-2">
                            Rp {new Intl.NumberFormat('id-ID').format(
                                summaryTrend.data?.reduce((acc, curr) => acc + Number(curr.total_expense), 0) || 0
                            )}
                        </h3>
                    </div>
                    <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
                        <p className="text-blue-600 font-medium text-sm">Net Savings (Year)</p>
                        <h3 className="text-2xl font-bold text-blue-900 mt-2">
                             Rp {new Intl.NumberFormat('id-ID').format(
                                (summaryTrend.data?.reduce((acc, curr) => acc + Number(curr.total_income), 0) || 0) -
                                (summaryTrend.data?.reduce((acc, curr) => acc + Number(curr.total_expense), 0) || 0)
                            )}
                        </h3>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default BudgetPage;
