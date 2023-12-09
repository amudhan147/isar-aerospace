import React, { useEffect, useState } from 'react';
import { Grid, Typography } from '@mui/material';
import CardComp from '../component/CardComponent';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { getSpectrumData, getSpectrumStatus, } from '../redux/slice/spectrumStatus-Slice';
import AscendComp from '../component/AscendComp';
import StatusCard from '../component/StatusCard';
import ActionComp from '../component/ActionComp';

interface setSpectrumStatus {
    velocity: number;
    altitude: number;
    temperature: number;
    isActionRequired: boolean;
    isAscending: boolean;
    statusMessage: string;
}

function SpectrumStatus() {
    const dispatch = useAppDispatch();
    const getData = useAppSelector(getSpectrumData);
    const [spectrumStatus, setSpectrumStatus] = useState<setSpectrumStatus>({
        velocity: 0,
        altitude: 0,
        temperature: 0,
        isActionRequired: false,
        isAscending: false,
        statusMessage: ""
    });

    useEffect(() => {
        dispatch(getSpectrumStatus({})) //getSpectrumStatus is an action creator

        const interval = setInterval(() => {
            dispatch(getSpectrumStatus({}))
        }, 3000);

        return () => clearInterval(interval);
    }, [])

    useEffect(() => {
        if (getData.getSpectrumStatus) {
            setSpectrumStatus(getData.getSpectrumStatus as setSpectrumStatus);
        } else {
            setSpectrumStatus({
                velocity: 0,
                altitude: 0,
                temperature: 0,
                isActionRequired: false,
                isAscending: false,
                statusMessage: ""
            });
        }
    }, [getData.getSpectrumStatus]);

    return (
        <React.Fragment>
            <Typography variant="h4" sx={{ color: 'black', padding: 1 }}>
                Spectrum Status
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={4}>
                    <CardComp
                        title="Velocity"
                        total={spectrumStatus.velocity ?? 0}
                        unit={"m/s"}
                        icon="icon-park:speed-one" />
                </Grid>
                <Grid item xs={4}>
                    <CardComp
                        title="Altitude"
                        total={spectrumStatus.altitude ?? 0}
                        unit={"m"}
                        icon="material-symbols:altitude" />
                </Grid>
                <Grid item xs={4}>
                    <CardComp
                        title="Temperature"
                        total={spectrumStatus.temperature ?? 0}
                        unit={"°C"}
                        icon="carbon:temperature-hot" />
                </Grid>
                <Grid item xs={4}>
                    <AscendComp
                        title="Ascend"
                        icon="fa-solid:rocket"
                        bool={spectrumStatus.isAscending}
                    />
                </Grid>
                <Grid item xs={4}>
                    <StatusCard
                        title="Status Message"
                        icon="fa-solid:rocket"
                        message={spectrumStatus.statusMessage}
                    />
                </Grid>
                <Grid item xs={4}>
                    <ActionComp
                        title="Action Required"
                        bool={spectrumStatus.isActionRequired ? "true" : "false"}
                    />
                </Grid>
            </Grid>
        </React.Fragment>
    );
}

export default SpectrumStatus;
