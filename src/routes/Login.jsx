import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from '../utils/validation';
import Footer from '../components/Footer';
import { useDispatch } from 'react-redux';
import { getUser } from '../redux/user/actions';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleSignUp() {
    navigate('/signup');
  }

  function handleLogin() {
    try {
      User.parse({ email, password });
      setErrors(null);

      dispatch(getUser({ email, password })).then(
        () => navigate('/'),
        (err) => setErrors(err?.toString())
      );
    } catch (error) {
      setErrors('Неправильный логин или пароль');
    }
  }

  return (
    <div className="flex flex-col min-w-full min-h-screen">
      <div
        className="flex flex-col gap-2 prose text-center mt-10 min-w-full prose-h1:text-5xl"
        style={{ flex: '1 1 auto' }}
      >
        <h1>Login</h1>
        <input
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mx-auto border border-black font-serif font-semibold px-2 min-w-1/2 max-w-1/2"
        />
        <input
          placeholder="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mx-auto border border-black font-serif font-semibold px-2 min-w-1/2 max-w-1/2"
        />
        <div className="flex flex-row gap-2 justify-center">
          <button
            onClick={handleLogin}
            className="border min-w-1/5 max-w-1/5 cursor-pointer font-bold text-xl border-black hover:bg-gray-200"
          >
            Login
          </button>
          <button
            onClick={handleSignUp}
            className="border min-w-1/5 max-w-1/5 cursor-pointer font-bold text-xl border-black hover:bg-gray-200"
          >
            Sign Up
          </button>
        </div>
        {errors && (
          <div className="text-red-500 font-semibold font-serif text-xs sm:text-xl">
            {errors}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
