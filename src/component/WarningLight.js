import React from 'react';
import { useTheme, styled } from '@mui/material/styles';
import { Badge, Box } from '@mui/material';

const BlinkKeyframes = styled('div')({
    animation: '$blink 1s infinite',
    borderRadius: '50%',
    backgroundColor: 'red',
    width: 12,
    height: 12,
    marginRight: 8,
    display: 'inline-block',
});

const RootStyle = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(2),
}));

export default function BlinkingDot() {
    return (
        <RootStyle>
            <BlinkKeyframes />
            <Box>
                {/* Your other content here */}
                {/* For example, you might include a Material-UI dot using Badge
                <Badge color="primary" variant="dot">
                   
                </Badge> */}
            </Box>
        </RootStyle>
    );
}
