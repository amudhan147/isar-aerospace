import merge from 'lodash/merge';
import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { Box } from '@mui/material';
import BaseOptionChart from './Chart';

export default function LineGraph({ data }) {

    const CHART_DATA = [
        {
            data: [
                { name: 'yaxis', data: data.x },
            ],
        },
    ];

    const chartOptions = merge(BaseOptionChart(), {
        xaxis: {
            categories: data.y,
        },

    });


    return (
        <>
            {CHART_DATA.map((item, index) => (
                <React.Fragment key={index}>
                    <Box key={index} sx={{ mt: 1, mx: 1 }} dir="ltr">
                        <ReactApexChart type="line" series={item.data} options={chartOptions} height={200} />
                    </Box>
                </React.Fragment>
            ))}
        </>
    );
}
