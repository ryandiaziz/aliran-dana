import PropTypes from 'prop-types';
import Sidebar from '../../fragments/Sidebar/Sidebar';

const MainLayout = ({ children }) => {    
    return (
        <div className="flex min-h-screen bg-gray-50">
            <Sidebar />
            <main className="flex-1 w-full max-w-7xl mx-auto p-4 md:p-8 overflow-y-auto h-screen">
                {children}
            </main>
        </div>
    )
}

MainLayout.propTypes = {
    children: PropTypes.node.isRequired
}

export default MainLayout