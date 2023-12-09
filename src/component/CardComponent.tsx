// @mui
import { useTheme, styled } from '@mui/material/styles';
import { Card, Typography, Box, IconButton, Menu, MenuItem, CardHeader } from '@mui/material';
// components
import Iconify from './iconify';
import React, { useEffect } from 'react';
import { useState } from 'react';
import LineGraph from './LineGraph';

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
                x: prev.x.slice(3),
                y: prev.y.slice(3),
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
                        // const mm = String(timestamp.getMonth() + 1).padStart(2, '0');
                        const yy = String(timestamp.getFullYear()).slice(-2);
                        const hh = String(timestamp.getHours()).padStart(2, '0');
                        const ss = String(timestamp.getSeconds()).padStart(2, '0');
                        return `${dd}-${yy} ${hh}:${ss}`;
                    })()]

            }));
        }
    }, [total]);



    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleSelect = (menu: string) => {
        console.log(menu);
        setMenuSelection(menu);
        setAnchorEl(null);
    };

    const options = [
        'Line Graph',
        'Card'
    ];
    return (
        <React.Fragment>
            {menuSelection === "Card" && <RootStyle sx={{ bgcolor: 'white' }}>
                <Box sx={{ ml: 3, color: 'common.white' }}>
                    <Typography variant="h5" sx={{ color: 'black', opacity: 0.72, }}> {title}</Typography>
                    <Typography variant="h5" sx={{ opacity: 0.72, color: 'black' }}>
                        <b>{`${total?.toFixed(4)} ${unit}` ?? 'N/A'}</b>
                    </Typography>
                </Box>
                <IconStyle icon={icon} sx={undefined} />
            </RootStyle>
            }
            <IconButton
                aria-label="more"
                id="long-button"
                aria-controls={open ? 'long-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleClick}
                sx={{ position: 'absolute', top: 35, ml: 45, zIndex: 1000 }}
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
                // onClose={handleClose}
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
            {menuSelection === 'Line Graph' && <Card>
                <CardHeader title={title} />
                <LineGraph data={graphData} />
            </Card>}
        </React.Fragment>
    );
}
