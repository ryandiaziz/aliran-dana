/* eslint-disable react/prop-types */

import { styled } from '@mui/material';

const MainLayout = ({ children }) => {    
    const Container = styled('div')({
        paddingInline: 2,
        paddingBlock:8,
        border: '1px dashed grey',
        maxWidth: 768,
        height: '100vh',
        margin: 'auto',
        position: 'relative'
    });

    return (
        <Container component="section">
            {children}
        </Container>
    )
}

export default MainLayout