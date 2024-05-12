import { createBrowserRouter } from 'react-router-dom';
import Root from '../Layout/Root';
import Homepage from '../Pages/Home/Homepage';
import SignIn from '../Pages/SignIn/SignIn';
import Signup from '../Pages/Signup/Signup';
import Error from './../Pages/Error/Error';
import Rooms from '../Pages/Rooms/Rooms';
import MyBookings from '../Pages/MyBookings/MyBookings';
import AboutUs from '../components/AboutUs/AboutUs';
import ContactUs from '../components/ContactUs/ContactUs';
import ViewDetails from '../components/ViewDetails/ViewDetails';
import PrivateRoute from './PrivateRoute';
import Review from '../components/Review/Review';
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
        element: (
          <PrivateRoute>
            <MyBookings />
          </PrivateRoute>
        )
      },
      {
        path: '/about-us',
        element: <AboutUs />,
      },
      {
        path: '/contact-us',
        element: <ContactUs />,
      },
      {
        path: '/rooms/review/:token',
        element: <Review/>
      },
      {
        path: '/rooms/:id',
        element: (
          <PrivateRoute>
            <ViewDetails />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
