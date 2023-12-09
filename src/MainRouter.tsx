import { useRoutes } from 'react-router-dom';
import Home from './pages/Home';
import SpectrumStatus from './pages/SpectrumStatus';
import SpectrumWs from './pages/SpectrumWs';
import Comments from './pages/Comments';
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
        },
        {
            path: '*',
            element: <Home />,
        },
        {
            path: '/comments',
            element: <Comments />,
        }
    ]);
};

export default MainRouter;
