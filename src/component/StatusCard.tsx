// @mui
import { styled } from '@mui/material/styles';
import { Card, Typography, Box, Avatar } from '@mui/material';
// components
import Iconify from './iconify';

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
    display: 'flex',
    position: 'relative',
    alignItems: 'center',
    paddingTop: theme.spacing(7.5),
    paddingBottom: theme.spacing(7.5),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    backgroundColor: theme.palette.common.white,
}));



// ----------------------------------------------------------------------


export default function CardComponent({ icon, message, color = 'info' }: {
    title?: string;
    message: string;
    icon?: string;
    color?: 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error';
}) {

    return (
        <RootStyle
            sx={{
                bgcolor: 'white',
            }}>
            <Box sx={{ ml: 3, color: 'common.white' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar><Iconify icon={icon} sx={undefined} /></Avatar>&nbsp;
                    <Typography variant="h5" sx={{ color: 'black', opacity: 0.72, }}>Sepctrum</Typography>
                </Box>
                <Typography variant="h6" sx={{ color: 'black', opacity: 0.72, ml: 6 }}>{message}</Typography>
            </Box>
        </RootStyle>
    );
}
