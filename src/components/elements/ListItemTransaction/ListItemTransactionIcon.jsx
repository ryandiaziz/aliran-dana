/* eslint-disable no-unused-vars */
import { styled } from '@mui/material'

// eslint-disable-next-line react/prop-types
const ListItemTransactionIcon = ({children, category}) => {
    const Container = styled('div')({
        minWidth : 56
    });

    const IconWrapper = styled('div')(({theme})=>({
        background : category === 'income' ? theme.palette.primary.main : theme.palette.expense.main,
        borderRadius : '50%',
        height : 40,
        width : 40,
        display : 'flex',
        justifyContent : 'center',
        alignItems : 'center',
        color : 'white'
    }));

    return (
        <Container>
            <IconWrapper>
                {children}
            </IconWrapper>
        </Container>
    )
}

export default ListItemTransactionIcon