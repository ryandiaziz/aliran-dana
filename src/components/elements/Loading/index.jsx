import CircularProgress from '@mui/material/CircularProgress';
import { styled } from '@mui/material'

const ShowLoading = () => {
    const LoadingContainer = styled('div')({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '50vh',
        width: '100%'
    })

    return (
        <LoadingContainer><CircularProgress /></LoadingContainer>
    )
}

export default ShowLoading