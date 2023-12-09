import { Grid, Link, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const navigate = useNavigate()
    return (
        <React.Fragment>
            <Typography variant="h4" sx={{ color: 'black', opacity: 0.72 }}>
                Isar Aerospace Assignment
            </Typography>
            <Grid container spacing={1} m={5}>
                <Grid item xs={12}>
                    <Link sx={{ fontSize: 'h5' }} onClick={() => navigate('/spectrumStatus')}>Spectrum Status</Link>
                </Grid>
                <Grid item xs={12}>
                    <Link onClick={() => navigate('/spectrumWs')}>Spectrum WS</Link>
                </Grid>
                <Grid item xs={12}>
                    <Link onClick={() => navigate('/comments')}>Comments for api improvements</Link>
                </Grid>
            </Grid>
        </React.Fragment>
    )
}

export default Home