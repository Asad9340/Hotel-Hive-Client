import { createBrowserRouter } from 'react-router-dom';
import Root from '../Layout/Root';
import Homepage from '../Pages/Home/Homepage';
import SignIn from '../Pages/SignIn/SignIn';
import Signup from '../Pages/Signup/Signup';
import Error from './../Pages/Error/Error';
import Rooms from '../Pages/Rooms/Rooms';
import MyBookings from '../Pages/MyBookings/MyBookings';
import AboutUs from '../components/AboutUs/AboutUs';
const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <Error />,
    children: [
      {
        path: '/',
        element: <Homepage />,
      },
      {
        path: '/signin',
        element: <SignIn />,
      },
      {
        path: '/signup',
        element: <Signup />,
      },
      {
        path: '/rooms',
        element: <Rooms />,
      },
      {
        path: '/my-bookings',
        element: <MyBookings/>
      },
      {
        path: '/about-us',
        element: <AboutUs/>
      },
    ],
  },
]);

export default router;