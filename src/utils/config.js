export const config = () => {
    const environment = import.meta.env.VITE_ENVIRONMENT || 'DEVELOPMENT';

    switch (environment) {
        case 'PRODUCTION':
            return {
                apiUrl: import.meta.env.VITE_PROD_API_URL,
            };
        case 'DEVELOPMENT':
            return {
                apiUrl: import.meta.env.VITE_DEV_API_URL,
            };
        default:
            throw new Error(`Unknown environment: ${environment}`);
    }
};