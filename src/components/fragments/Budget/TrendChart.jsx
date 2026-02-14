import PropTypes from 'prop-types';
import { 
    BarChart, 
    Bar, 
    XAxis, 
    YAxis, 
    CartesianGrid, 
    Tooltip, 
    Legend, 
    ResponsiveContainer 
} from 'recharts';

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const TrendChart = ({ data, isLoading }) => {
    if (isLoading) {
        return (
            <div className="w-full h-80 flex items-center justify-center bg-gray-50 rounded-2xl animate-pulse">
                <div className="flex flex-col items-center gap-3">
                    <div className="w-10 h-10 border-4 border-emerald-200 border-t-emerald-500 rounded-full animate-spin"></div>
                    <span className="text-gray-400 font-medium">Loading chart data...</span>
                </div>
            </div>
        );
    }

    if (!data || data.length === 0) {
        return (
            <div className="w-full h-80 flex items-center justify-center bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                <div className="text-center">
                    <p className="text-gray-400 font-medium">No trend data available</p>
                </div>
            </div>
        );
    }

    // Process data to ensure all months are represented or formatted correctly
    const chartData = data.map(item => ({
        name: monthNames[parseInt(item.month) - 1],
        Income: Number(item.total_income),
        Expense: Number(item.total_expense)
    }));

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white p-4 border border-gray-100 shadow-xl rounded-xl z-50">
                    <p className="text-gray-900 font-bold mb-2">{label}</p>
                    <div className="space-y-1">
                        <p className="text-sm text-emerald-600 flex justify-between gap-4">
                            <span>Income:</span>
                            <span className="font-semibold">
                                Rp {new Intl.NumberFormat('id-ID').format(payload[0].value)}
                            </span>
                        </p>
                        <p className="text-sm text-red-500 flex justify-between gap-4">
                            <span>Expense:</span>
                            <span className="font-semibold">
                                Rp {new Intl.NumberFormat('id-ID').format(payload[1].value)}
                            </span>
                        </p>
                    </div>
                </div>
            );
        }
        return null;
    };

    CustomTooltip.propTypes = {
        active: PropTypes.bool,
        payload: PropTypes.arrayOf(PropTypes.shape({
            value: PropTypes.number,
            name: PropTypes.string,
            dataKey: PropTypes.string
        })),
        label: PropTypes.string
    };

    return (
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm h-full flex flex-col">
            <h3 className="text-lg font-bold text-gray-800 mb-6">Monthly Trend</h3>
            <div className="flex-1 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={chartData}
                        margin={{
                            top: 5,
                            right: 10,
                            left: 10,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                        <XAxis 
                            dataKey="name" 
                            axisLine={false} 
                            tickLine={false} 
                            tick={{ fill: '#9CA3AF', fontSize: 12 }}
                            dy={10}
                        />
                        <YAxis 
                            axisLine={false} 
                            tickLine={false}
                            tick={{ fill: '#9CA3AF', fontSize: 12 }}
                            tickFormatter={(value) => {
                                if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
                                if (value >= 1000) return `${(value / 1000).toFixed(0)}k`;
                                return value;
                            }}
                        />
                        <Tooltip content={<CustomTooltip />} cursor={{ fill: '#F9FAFB' }} />
                        <Legend iconType="circle" />
                        <Bar 
                            dataKey="Income" 
                            fill="#10B981" 
                            radius={[4, 4, 0, 0]} 
                            barSize={20}
                        />
                        <Bar 
                            dataKey="Expense" 
                            fill="#EF4444" 
                            radius={[4, 4, 0, 0]} 
                            barSize={20}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

TrendChart.propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({
        month: PropTypes.string,
        total_income: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        total_expense: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    })),
    isLoading: PropTypes.bool
};

export default TrendChart;
