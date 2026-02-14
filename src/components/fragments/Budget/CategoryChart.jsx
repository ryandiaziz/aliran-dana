import PropTypes from 'prop-types';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const COLORS = ['#10B981', '#3B82F6', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899', '#6366F1'];

const CategoryChart = ({ data, isLoading, type }) => {
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
                    <p className="text-gray-400 font-medium">No data available for this period</p>
                    <p className="text-xs text-gray-400 mt-1">Try selecting a different date range</p>
                </div>
            </div>
        );
    }

    // Transform data for converting total to number
    const chartData = data.map(item => ({
        ...item,
        value: Number(item.total)
    }));

    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
        const RADIAN = Math.PI / 180;
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);
      
        return percent > 0.05 ? (
          <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central" className="text-xs font-bold">
            {`${(percent * 100).toFixed(0)}%`}
          </text>
        ) : null;
    };

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white p-3 border border-gray-100 shadow-lg rounded-xl">
                    <p className="text-sm font-semibold text-gray-900">{payload[0].name}</p>
                    <p className="text-emerald-600 font-bold">
                        Rp {new Intl.NumberFormat('id-ID').format(payload[0].value)}
                    </p>
                </div>
            );
        }
        return null;
    };

    CustomTooltip.propTypes = {
        active: PropTypes.bool,
        payload: PropTypes.arrayOf(PropTypes.shape({
            name: PropTypes.string,
            value: PropTypes.number,
            payload: PropTypes.object
        }))
    };

    return (
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm h-full flex flex-col">
            <h3 className="text-lg font-bold text-gray-800 mb-6 capitalize">{type} by Category</h3>
            <div className="flex-1 w-full min-h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={chartData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={renderCustomizedLabel}
                            outerRadius={100}
                            fill="#8884d8"
                            dataKey="value"
                            nameKey="category_name"
                        >
                            {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip content={<CustomTooltip />} />
                        <Legend 
                            verticalAlign="bottom" 
                            height={36} 
                            iconType="circle"
                            formatter={(value) => <span className="text-sm text-gray-600 ml-1">{value}</span>}
                        />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

CategoryChart.propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({
        category_name: PropTypes.string,
        total: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    })),
    isLoading: PropTypes.bool,
    type: PropTypes.string
};

export default CategoryChart;
