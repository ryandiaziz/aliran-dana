/* eslint-disable react/prop-types */

import { styled } from '@mui/material';

const MainLayout = ({ children }) => {    
    const Container = styled('div')({
        marginTop: 64,
        paddingInline: 2,
        paddingBlock:8,        
        maxWidth: 768,
        marginInline: 'auto',
        position: 'relative'
    });

    return (
        <Container component="section">
            {children}
        </Container>
    )
}

export default MainLayout