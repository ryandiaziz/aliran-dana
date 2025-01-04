import { createTheme } from '@mui/material';

const theme = createTheme({
    palette: {
        primary: {
            main: '#353535',
        },
        secondary: {
            main: '#DF826C',
        },
        expense: {
            main: '#DF826C'
        },
        income: {
            main: '#50B498'
        },
        textPrimary: {
            main: '#151515'
        },
        textSecondary: {
            main: '#686D76'
        }
    },
});

export default theme;