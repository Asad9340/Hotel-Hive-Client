import React, { useContext, useEffect, useState } from 'react';
import {
  Navbar,
  Collapse,
  Typography,
  Button,
  IconButton,
  Avatar,
  Tooltip,
} from '@material-tailwind/react';
import { Link, NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../Firebase/AuthProvider';

function NavBar() {
  const [theme, setTheme] = useState(
    localStorage.getItem('theme') ? localStorage.getItem('theme') : 'light'
  );

  const handleToggle = e => {
    if (e.target.checked) {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  };
  useEffect(() => {
    localStorage.setItem('theme', theme);
    const localTheme = localStorage.getItem('theme');
    // add custom data-theme attribute to html tag required to update theme using DaisyUI
    document.querySelector('html').setAttribute('data-theme', localTheme);
  }, [theme]);
  const [openNav, setOpenNav] = React.useState(false);

  React.useEffect(() => {
    window.addEventListener(
      'resize',
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);
  const navigate = useNavigate();
  const { user, logOut } = useContext(AuthContext);
  const handleLogOut = () => {
    logOut();
    navigate('/');
  };
  const navList = (
    <ul className="mt-2 mb-4 flex flex-col gap-2 md:gap-3 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center">
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? 'flex items-center  px-3 py-2 bg-orange-700 text-white rounded-md duration-300 font-semibold  font-lato'
              : 'flex items-center font-display text-black px-3 py-2 font-lato'
          }
        >
          Home
        </NavLink>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <NavLink
          to="/rooms"
          className={({ isActive }) =>
            isActive
              ? 'flex items-center  px-3 py-2 bg-orange-700 text-white rounded-md duration-300 font-semibold  font-lato'
              : 'flex items-center font-display text-black px-3 py-2 font-lato'
          }
        >
          Rooms
        </NavLink>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <NavLink
          to="/my-bookings"
          className={({ isActive }) =>
            isActive
              ? 'flex items-center  px-3 py-2 bg-orange-700 text-white rounded-md duration-300 font-semibold  font-lato'
              : 'flex items-center font-display text-black px-3 py-2 font-lato'
          }
        >
          My Bookings
        </NavLink>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <NavLink
          to="/about-us"
          className={({ isActive }) =>
            isActive
              ? 'flex items-center  px-3 py-2 bg-orange-700 text-white rounded-md duration-300 font-semibold  font-lato'
              : 'flex items-center font-display text-black px-3 py-2 font-lato'
          }
        >
          About Us
        </NavLink>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <NavLink
          to="/contact-us"
          className={({ isActive }) =>
            isActive
              ? 'flex items-center  px-3 py-2 bg-orange-700 text-white rounded-md duration-300 font-semibold  font-lato'
              : 'flex items-center font-display text-black px-3 py-2 font-lato'
          }
        >
          Contact Us
        </NavLink>
      </Typography>
      <Typography>
        <label className="swap swap-rotate">
          <input
            type="checkbox"
            className="theme-controller"
            value="synthwave"
            onChange={handleToggle}
            checked={theme === 'light' ? false : true}
          />

          {/* sun icon */}
          <svg
            className="swap-off fill-current w-10 h-10"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
          </svg>

          {/* moon icon */}
          <svg
            className="swap-on fill-current w-10 h-10"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
          </svg>
        </label>
      </Typography>
    </ul>
  );

  return (
    <div className="bg-blue-900">
      <Navbar
        style={{ borderWidth: 0 }}
        className="sticky top-0 z-10 h-max max-w-full  px-4 py-2 lg:px-8 lg:py-4 shadow-none rounded-none "
      >
        <div className="flex items-center justify-between text-blue-gray-900">
          <Link to="/">
            <Typography className="mr-4 cursor-pointer py-1.5 font-semibold lg:font-bold text-xl md:text-2xl text-black font-lato">
              Hotel<span className="text-red-700">H</span>ive
            </Typography>
          </Link>
          <div className="flex items-center justify-between gap-8">
            <div className="mr-4 hidden lg:block">{navList}</div>
            {!user ? (
              <div className="flex items-center gap-x-2">
                <Link to="/signin">
                  <Button
                    variant="filled"
                    size="md"
                    className="hidden lg:inline-block font-lato"
                  >
                    <span>Sign In</span>
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button
                    variant="filled"
                    size="md"
                    className="hidden lg:inline-block font-lato"
                  >
                    <span>Sign Up</span>
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="flex gap-2">
                <Tooltip content={user ? user.displayName : 'Asad'}>
                  <Avatar
                    size="sm"
                    variant="circular"
                    alt="userName"
                    src={
                      user
                        ? user.photoURL
                        : 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80'
                    }
                    className="border-2 border-white hover:z-10"
                  />
                </Tooltip>
                <Button
                  onClick={handleLogOut}
                  variant="filled"
                  size="md"
                  className="hidden lg:inline-block font-lato"
                >
                  <span>LogOut</span>
                </Button>
              </div>
            )}
            <IconButton
              variant="text"
              className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden text-white"
              ripple={false}
              onClick={() => setOpenNav(!openNav)}
            >
              {openNav ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </IconButton>
          </div>
        </div>
        <Collapse open={openNav}>
          {navList}
          {user ? (
            <div className="flex gap-2">
              <Tooltip content={user ? user.displayName : 'Asad'}>
                <Avatar
                  size="sm"
                  variant="circular"
                  alt="userName"
                  src={
                    user
                      ? user.photoURL
                      : 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80'
                  }
                  className="border-2 border-white hover:z-10"
                />
              </Tooltip>
              <Button
                variant="filled"
                size="sm"
                className="inline-block lg:hidden font-lato"
              >
                <span  onClick={handleLogOut}>LogOut</span>
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link className="w-full" to="/signin">
                <Button fullWidth variant="filled" size="sm" className="font-lato">
                  <span>Log In</span>
                </Button>
              </Link>
              <Link className="w-full" to="/signup">
                <Button fullWidth variant="filled" size="sm" className="font-lato">
                  <span>Sign Up</span>
                </Button>
              </Link>
            </div>
          )}
        </Collapse>
      </Navbar>
    </div>
  );
}
export default NavBar;
