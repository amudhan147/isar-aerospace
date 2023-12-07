import React, { useEffect, useState } from 'react';
import './App.css';
import { Grid } from '@mui/material';
import CardComp from './component/CardComponent';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import { getSpectrumData, getSpectrumStatus } from './redux/slice/spectrumStatus-Slice';
import AscendComp from './component/AscendComp';
import RedBlinkingLight from './component/WarningLight';

interface setSpectrumStatus {
  velocity: number;
  altitude: number;
  temperature: number;
  isActionRequired: boolean;
  isAscending: boolean;
  statusMessage: string;
}

function App() {
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
      <Grid container spacing={2} marginTop={1}>
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
        <Grid item xs={8}>
          <AscendComp
            title="statusMessage"
            icon="fa-solid:rocket"
            bool={spectrumStatus.isAscending}
          />
          <RedBlinkingLight />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default App;
