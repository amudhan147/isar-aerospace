import { useRoutes } from 'react-router-dom';
import Home from './pages/Home';
import SpectrumStatus from './pages/SpectrumStatus';
import SpectrumWs from './pages/SpectrumWs';
const MainRouter = () => {
    return useRoutes([
        {
            path: '/',
            element: <Home />,
        },
        {
            path: '/spectrumStatus',
            element: <SpectrumStatus />,
        },
        {
            path: '/spectrumWs',
            element: <SpectrumWs />,
        }
    ]);
};

export default MainRouter;
