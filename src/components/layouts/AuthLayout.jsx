import PropTypes from 'prop-types';

const AuthLayout = ({ children, title, subtitle }) => {
    return (
        <div className="flex justify-center items-center min-h-screen p-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-6 border border-gray-100">
                <div className="text-center space-y-2">
                    {title && (
                        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
                            {title}
                        </h1>
                    )}
                    {subtitle && (
                        <p className="text-sm text-gray-500">
                            {subtitle}
                        </p>
                    )}
                </div>
                {children}
            </div>
        </div>
    );
};

AuthLayout.propTypes = {
    children: PropTypes.node.isRequired,
    title: PropTypes.string,
    subtitle: PropTypes.string
};

export default AuthLayout;
