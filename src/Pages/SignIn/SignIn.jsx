import { useContext, useState } from 'react';
import { FaGoogle } from 'react-icons/fa';
import { FaGithub } from 'react-icons/fa';
import { Typography, Input, Button } from '@material-tailwind/react';
import { EyeSlashIcon, EyeIcon } from '@heroicons/react/24/solid';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { AuthContext } from '../../Firebase/AuthProvider';

export function SignIn() {
  const [error, setError] = useState('');
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisiblity = () => setPasswordShown(cur => !cur);
  const { googleLogin, githubLogin, loginUser, setUser } =
    useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location?.state || '/';
  const handleGoogleLogin = () => {
    googleLogin()
      .then(result => {
        setUser(result.user);
        toast.success('SignIn with Google Successfully');
        navigate(from);
      })
      .catch(error => console.log(error));
  };
  const handleGithubLogin = () => {
    githubLogin()
      .then(result => {
        console.log(result.user);
        toast.success('SignIn with Github Successfully');
        setUser(result.user);
        navigate(from);
      })
      .catch(error => console.log(error));
  };
  const handleLoginUser = e => {
    e.preventDefault();
    setPasswordShown(false);
    const email = e.target.email.value;
    const password = e.target.password.value;
    loginUser(email, password)
      .then(result => {
        setUser(result.user);
        toast.success('Login Successfully!');
        navigate(from);
      })
      .catch(() => {
        setError('Wrong Email or Password');
        toast.error('Wrong Email or Password');
      });
  };
  return (
    <div className=" font-fontPrimary">
      <section className="grid text-center  items-center p-8">
        <Typography
          variant="h3"
          color="black"
          className="mb-2  font-fontPrimary"
        >
          Sign In
        </Typography>
        <Typography className="mb-6 text-black font-normal text-[18px] font-fontPrimary">
          Enter your email and password to sign in
        </Typography>
        <form
          onSubmit={handleLoginUser}
          className="mx-auto max-w-[24rem] text-left"
        >
          <div className="mb-6">
            <label htmlFor="email">
              <Typography
                variant="small"
                className="mb-2 block font-medium text-black  font-fontPrimary"
              >
                Your Email
              </Typography>
            </label>
            <Input
              id="email"
              color="gray"
              size="lg"
              type="email"
              name="email"
              label="Email"
              className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200  font-fontPrimary"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password">
              <Typography
                variant="small"
                className="mb-2 block font-medium text-black  font-fontPrimary"
              >
                Password
              </Typography>
            </label>
            <Input
              size="lg"
              label="Password"
              name="password"
              className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
              type={passwordShown ? 'text' : 'password'}
              icon={
                <i onClick={togglePasswordVisiblity}>
                  {passwordShown ? (
                    <EyeIcon className="h-5 w-5" />
                  ) : (
                    <EyeSlashIcon className="h-5 w-5" />
                  )}
                </i>
              }
            />
          </div>
          <small className="text-red-700 -mb-3 animate__animated animate__shakeX">
            {error}
          </small>
          <Button
            type="submit"
            color="gray"
            size="lg"
            className="mt-4  font-fontPrimary"
            fullWidth
          >
            sign in
          </Button>
          <div className="flex justify-between gap-4 mx-0 md:mx-6">
            <Button
              onClick={handleGoogleLogin}
              variant="outlined"
              size="md"
              className="mt-4 flex  items-center justify-center gap-2 text-black  font-fontPrimary"
              fullWidth
            >
              <FaGoogle className="text-lg text-black" />
              google
            </Button>
            <Button
              onClick={handleGithubLogin}
              variant="outlined"
              size="md"
              className="mt-4 flex  items-center justify-center gap-2 font-fontPrimary text-black"
              fullWidth
            >
              <FaGithub className="text-lg text-black" />
              Github
            </Button>
          </div>
          <Typography
            variant="small"
            color="gray"
            className="mt-4 text-center font-normal font-fontPrimary text-black"
          >
            Not registered?{' '}
            <Link to="/signup" className="font-medium text-black">
              Create account
            </Link>
          </Typography>
        </form>
      </section>
    </div>
  );
}

export default SignIn;
