// @mui
import { useTheme, styled } from '@mui/material/styles';
import { Card, Typography, Button } from '@mui/material';
// components
import { useAppDispatch } from '../redux/hooks';
import { getTakeAction } from '../redux/slice/spectrumStatus-Slice';

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
    position: 'relative',
    alignItems: 'center',
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    backgroundColor: theme.palette.primary.light,
}));


const BlinkingDiv = styled('div')({
    width: '30px',
    height: '30px',
    backgroundColor: 'red',
    borderRadius: '100px',
    margin: '10px',
    animationName: 'blink',
    animationDuration: '0.5s',
    animationIterationCount: 'infinite',
    position: 'absolute',
    top: '10px',
    left: '10px',

    '@keyframes blink': {
        '50%': {
            opacity: 0,
        },
    },
});

// ----------------------------------------------------------------------


export default function OptionComp({ title, icon, bool, color = 'primary' }: {
    title: string;
    icon?: string;
    color?: 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error';
    bool: string;
}) {
    const theme = useTheme();
    const dispatch = useAppDispatch();
    return (
        <RootStyle
            sx={{
                bgcolor: theme.palette.common.white,
            }}>
            {bool === "true" && <BlinkingDiv>
            </BlinkingDiv>}

            <Typography variant="h5" sx={{ color: 'black', opacity: 0.72 }}>
                {title}: {bool === "true" ? "true" : "false"}
            </Typography>
            {bool === "true" && <Button
                variant='contained'
                onClick={() => dispatch(getTakeAction({}))}
                fullWidth
                sx={{ p: 1.5, marginTop: '20px', alignItems: 'center', justifyContent: 'center', position: 'relative', }}
            >Take Action
            </Button>}


        </RootStyle >
    );
}
// 