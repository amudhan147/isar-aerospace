import merge from 'lodash/merge';
import ReactApexChart from 'react-apexcharts';
import BaseOptionChart from './Chart';
import { Box } from '@mui/material';

export default function LineGraph({ data, title }) {

    const CHART_DATA = [
        {
            data: [
                { name: title, data: data.x },
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
                <Box key={index} dir="ltr">
                    <ReactApexChart type="line" series={item.data} options={chartOptions} height={200} width={380} />
                </Box>
            ))}
        </>
    );
}
