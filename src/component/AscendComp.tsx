// @mui
import { styled } from '@mui/material/styles';
import { Card, Typography, Box } from '@mui/material';
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
    right: theme.spacing(5),
}));

// ----------------------------------------------------------------------


export default function AscendComp({ title, icon, bool, color = 'primary' }: {
    title: string;
    icon: string;
    color?: 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error';
    bool: boolean | undefined;
}) {

    return (
        <RootStyle
            sx={{
                bgcolor: 'white',
            }}>
            <Box sx={{ ml: 3, color: 'common.white' }}>
                <Typography variant="h5" sx={{ color: 'black', opacity: 0.72, }}> {title}: {bool === true ? 'true' : 'false'}</Typography>
            </Box>
            {bool ? <IconStyle icon={icon} sx={undefined} /> : <IconStyle icon={icon} sx={undefined} rotate={2} />}
        </RootStyle>
    );
}
