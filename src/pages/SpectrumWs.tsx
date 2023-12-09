import React, { useEffect, useState } from 'react';
import { Alert, Grid, Snackbar, Slide, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import CardComp from '../component/CardComponent';
import AscendComp from '../component/AscendComp';
import StatusCard from '../component/StatusCard';
import { actionTakenClear, getSpectrumData } from '../redux/slice/spectrumStatus-Slice';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import OptionComp from '../component/OptionComp';
import { TransitionProps } from '@mui/material/transitions';

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

interface setSpectrumStatus {
    Velocity: number;
    Altitude: number;
    Temperature: number;
    IsActionRequired: boolean;
    IsAscending: boolean;
    StatusMessage: string;
    event: string;
}

function SpectrumWs() {
    const getData = useAppSelector(getSpectrumData);
    const dispatch = useAppDispatch();
    const [spectrumStatus, setSpectrumStatus] = useState<setSpectrumStatus>({
        Velocity: 0,
        Altitude: 0,
        Temperature: 0,
        IsActionRequired: false,
        IsAscending: false,
        StatusMessage: "",
        event: ""
    });
    const [snackBarMessage, setSnackBarMessage] = useState({
        type: 'info',
        desc: '',
        enable: false,
    });
    const [isWebSocketConnected, setIsWebSocketConnected] = useState(false);

    useEffect(() => {
        connectWebSocket()
        return () => {
            setIsWebSocketConnected(true);
        };
    }, []);


    const connectWebSocket = () => {
        const socket = new WebSocket(
            "wss://webfrontendassignment-isaraerospace.azurewebsites.net/api/SpectrumWS"
        );

        socket.onopen = (event) => {
            setIsWebSocketConnected(false);
            socket.send(JSON.stringify(event));
        };

        socket.onmessage = function (event) {
            const data = JSON.parse(event.data);
            try {
                setSpectrumStatus(data);
            } catch (err) {
                console.log(err);
            }
        };

        socket.onclose = (event) => {
            if (event.wasClean) {
                console.log(`Connection closed cleanly, code=${event.code}, reason=${event.reason}`);
                setIsWebSocketConnected(true);
            } else {
                console.error('Connection died');
            }
        };
        return () => {
            socket.close();
        };
    };

    useEffect(() => {
        if (getData.takeActionBoolen === 1) {
            setSnackBarMessage({
                type: 'success',
                desc: 'Action has been taken',
                enable: true,
            });
            dispatch(actionTakenClear({})); // Pass an empty object as the argument
        } else if (getData.takeActionBoolen === -1) {
            setSnackBarMessage({
                type: 'error',
                desc: 'Something went wrong',
                enable: true,
            });
            dispatch(actionTakenClear({})); // Pass an empty object as the argument
        }
    }, [getData.takeActionBoolen]);

    const handleClose = () => {
        setSnackBarMessage({
            type: 'info',
            desc: '',
            enable: false,
        });
    };


    let vertical: any = 'top';
    let horizontal: any = 'right';

    return (
        <React.Fragment>
            <Snackbar
                anchorOrigin={{ vertical, horizontal }}
                open={snackBarMessage.enable}
                autoHideDuration={3000}
                onClose={handleClose}
            >
                <Alert onClose={handleClose} severity={snackBarMessage.type as 'error' | 'warning' | 'info' | 'success'}>
                    {snackBarMessage.desc}
                </Alert>
            </Snackbar>
            <Grid container spacing={3} marginTop={1}>
                <Grid item xs={4}>
                    <CardComp
                        title="Velocity"
                        total={spectrumStatus.Velocity ?? 0}
                        unit={"m/s"}
                        icon="icon-park:speed-one" />
                </Grid>
                <Grid item xs={4}>
                    <CardComp
                        title="Altitude"
                        total={spectrumStatus.Altitude ?? 0}
                        unit={"m"}
                        icon="material-symbols:altitude" />
                </Grid>
                <Grid item xs={4}>
                    <CardComp
                        title="Temperature"
                        total={spectrumStatus.Temperature ?? 0}
                        unit={"°C"}
                        icon="carbon:temperature-hot" />
                </Grid>
                <Grid item xs={4}>
                    <AscendComp
                        title="Ascend"
                        icon="fa-solid:rocket"
                        bool={spectrumStatus.IsAscending}
                    />
                </Grid>
                <Grid item xs={4}>
                    <StatusCard
                        title="Status Message"
                        icon="fa-solid:rocket"
                        message={spectrumStatus.StatusMessage}
                    />
                </Grid>
                <Grid item xs={4}>
                    <OptionComp
                        title="Action Required"
                        bool={spectrumStatus.IsActionRequired ? "true" : "false"}
                    />
                </Grid>
            </Grid>
            <Dialog
                open={isWebSocketConnected}
                TransitionComponent={Transition}
                keepMounted
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{"Socket Closed!"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        Please click on reconnect button to connect to socket again.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => connectWebSocket()}>Reconnect</Button>
                </DialogActions>
            </Dialog>

        </React.Fragment>
    );
}

export default SpectrumWs;
