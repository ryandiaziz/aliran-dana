/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { styled } from "@mui/material"

const ListItemContainer = ({children, onClick}) => {
    const Container = styled('li')(({ theme }) => ({
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        textDecoration: 'none',
        width: '100%',
        boxSizing: 'border-box',
        textAlign: 'left',
        padding: '8px 16px',
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: '#F5F7F8'
        }
    }))
    return (
        <Container onClick={onClick}>{children}</Container>
    )
}

export default ListItemContainer