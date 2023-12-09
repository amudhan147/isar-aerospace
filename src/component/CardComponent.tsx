// @mui
import { useTheme, styled } from '@mui/material/styles';
import { Card, CardProps, CardOwnProps, Typography, Box, IconButton, Menu, MenuItem } from '@mui/material';
// components
import Iconify from './iconify';
import React, { useEffect } from 'react';
import { useState } from 'react';
import LineGraph from './LineGraph';

// ----------------------------------------------------------------------


type CustomCardProps = {
    menuselectionprop: string;
} & CardProps & CardOwnProps;

const RootStyle = styled(Card)<CustomCardProps>(({ theme, menuselectionprop }) => ({
    display: 'flex',
    position: 'relative',
    alignItems: 'center',
    paddingTop: menuselectionprop === "Card" ? theme.spacing(12) : theme.spacing(3),
    paddingBottom: menuselectionprop === "Card" ? theme.spacing(12) : theme.spacing(3),
    paddingLeft: menuselectionprop === "Card" ? theme.spacing(3) : theme.spacing(1),
    paddingRight: menuselectionprop === "Card" ? theme.spacing(3) : theme.spacing(1),
    backgroundColor: theme.palette.common.white,
}));

const IconStyle = styled(Iconify)(({ theme }) => ({
    width: 120,
    height: 120,
    opacity: 0.72,
    position: 'absolute',
    right: theme.spacing(3),
    // color: theme.palette.common.white,
}));

const ITEM_HEIGHT = 48;

// ----------------------------------------------------------------------


export default function CardComponent({ title, total, icon, unit, color = 'primary' }: {
    title: string;
    total: number;
    icon: string;
    color?: 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error';
    unit: string;
}) {
    const theme = useTheme();

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [menuSelection, setMenuSelection] = useState<string>("Card");
    const [graphData, setGraphData] = useState<{ x: number[]; y: string[] }>({ x: [], y: [] });

    const open = Boolean(anchorEl);

    useEffect(() => {
        if (graphData.x.length > 5) {
            setGraphData((prev) => ({
                x: prev.x.slice(1),
                y: prev.y.slice(1),
            }));
        } else {
            setGraphData((prev) => ({
                x: [...prev.x, Number(total.toFixed(2))],
                y: [
                    ...prev.y,
                    (() => {
                        const timestamp = new Date();
                        timestamp.setSeconds(timestamp.getSeconds() - 1);
                        const dd = String(timestamp.getDate()).padStart(2, '0');
                        const mm = String(timestamp.getMonth() + 1).padStart(2, '0');
                        const hh = String(timestamp.getHours()).padStart(2, '0');
                        const ss = String(timestamp.getSeconds()).padStart(2, '0');
                        return `${dd}-${mm} ${hh}:${ss}`;
                    })(),
                ],
            }));
        }
    }, [total]);



    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleSelect = (menu: string) => {
        setMenuSelection(menu);
        setAnchorEl(null);
    };

    const options = [
        'Line Graph',
        'Card'
    ];

    return (
        <RootStyle menuselectionprop={menuSelection}>
            <IconButton
                aria-label="more"
                id="long-button"
                aria-controls={open ? 'long-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleClick}
                sx={{ position: 'absolute', zIndex: 1000, top: 0, right: 0 }}
            >
                <Iconify icon={"mi:options-vertical"} sx={undefined} color={theme.palette.info} />
            </IconButton>
            <Menu
                id="long-menu"
                MenuListProps={{
                    'aria-labelledby': 'long-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={() => setAnchorEl(null)}
                PaperProps={{
                    style: {
                        maxHeight: ITEM_HEIGHT * 4.5,
                        width: '20ch',
                    },
                }}
            >
                {options.map((option) => (
                    <MenuItem key={option} selected={option === menuSelection} onClick={() => handleSelect(option)}>
                        {option}
                    </MenuItem>
                ))}
            </Menu>
            {menuSelection === "Card" &&
                <>
                    <Box sx={{ ml: 3, color: 'common.white' }}>
                        <Typography variant="h5" sx={{ color: 'black', opacity: 0.72, }}> {title}</Typography>
                        <Typography variant="h5" sx={{ opacity: 0.72, color: 'black' }}>
                            <b>{`${total?.toFixed(4)} ${unit}` ?? 'N/A'}</b>
                        </Typography>
                    </Box>
                    <IconStyle icon={icon} sx={undefined} />
                </>}

            {menuSelection === 'Line Graph' &&
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography variant="h5" sx={{ color: 'black', opacity: 0.72, ml: 5 }}> {title}</Typography>
                    <LineGraph data={graphData} title={title} />
                </Box>}
        </RootStyle >
    );
}
