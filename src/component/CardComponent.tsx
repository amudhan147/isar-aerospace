// @mui
import { useTheme, styled } from '@mui/material/styles';
import { Card, Typography, Box, IconButton } from '@mui/material';
// components
import Iconify from './iconify';

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
    display: 'flex',
    position: 'relative',
    alignItems: 'center',
    paddingTop: theme.spacing(12),
    paddingBottom: theme.spacing(12),
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    backgroundColor: theme.palette.primary.light,
}));

const IconStyle = styled(Iconify)(({ theme }) => ({
    width: 120,
    height: 120,
    opacity: 0.72,
    position: 'absolute',
    right: theme.spacing(3),
    // color: theme.palette.common.white,
}));

// ----------------------------------------------------------------------


export default function CardComponent({ title, total, icon, unit, color = 'primary' }: {
    title: string;
    total: number;
    icon: string;
    color?: 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error';
    unit: string;
}) {
    const theme = useTheme();
    return (
        <RootStyle
            sx={{
                bgcolor: 'white',
            }}>
            <Box sx={{ ml: 3, color: 'common.white' }}>
                <Typography variant="h5" sx={{ color: 'black', opacity: 0.72, }}> {title}</Typography>
                <Typography variant="h5" sx={{ opacity: 0.72, color: 'black' }}>
                    <b>{`${total?.toFixed(4)} ${unit}` ?? 'N/A'}</b>
                </Typography>
            </Box>
            <IconStyle icon={icon} sx={undefined} />
            <IconButton sx={{ position: 'absolute', top: 3, right: 3 }}>
                <Iconify icon={"mi:options-vertical"} sx={undefined} color={theme.palette.info} />
            </IconButton>
        </RootStyle>
    );
}
