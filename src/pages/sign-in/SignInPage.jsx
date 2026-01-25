import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Visibility, VisibilityOff } from '@mui/icons-material'; // Keeping icons for now, can be replaced or styled

import useLogin from "./useLogin";
import { authLogin } from "../../redux/auth/authReducers";

const SignInPage = () => {
    useLogin();
    const dispatch = useDispatch();
    const [emailError, setEmailError] = useState(false);
    const [emailErrorMessage, setEmailErrorMessage] = useState('');
    const [passwordError, setPasswordError] = useState(false);
    const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
    const { isLoading } = useSelector((state => state.auth.login));
    const [showPassword, setShowPassword] = useState(false);

    const handleTogglePassword = () => {
        setShowPassword((prev) => !prev);
    };

    const [form, setForm] = useState({
        email: '',
        password: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateInputs()) dispatch(authLogin(form));
    }

    const validateInputs = () => {
        let isValid = true;

        if (!form.email || !/\S+@\S+\.\S+/.test(form.email)) {
            setEmailError(true);
            setEmailErrorMessage('Please enter a valid email address.');
            isValid = false;
        } else {
            setEmailError(false);
            setEmailErrorMessage('');
        }

        if (!form.password || form.password.length < 6) {
            setPasswordError(true);
            setPasswordErrorMessage('Password must be at least 6 characters long.');
            isValid = false;
        } else {
            setPasswordError(false);
            setPasswordErrorMessage('');
        }

        return isValid;
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100 font-pixel">
            <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-6 bg-white w-full max-w-[350px] p-8 border-2 border-black shadow-pixel mx-4"
            >
                <div className="mb-4 text-center">
                    <h1 className="text-3xl font-bold tracking-widest text-black/80">SIGN IN</h1>
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="sign-in-email" className="uppercase text-sm">Email</label>
                    <input
                        id="sign-in-email"
                        type="email"
                        placeholder="your@email.com"
                        className={`border-2 border-black p-2 outline-none focus:shadow-pixel transition-none font-sans ${emailError ? 'bg-red-100' : ''}`}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />
                    {emailError && <span className="text-red-600 text-xs font-bold">{emailErrorMessage}</span>}
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="sign-in-password" className="uppercase text-sm">Password</label>
                    <div className={`flex relative items-center border-2 border-black bg-white focus-within:shadow-pixel transition-none ${passwordError ? 'bg-red-100' : ''}`}>
                        <input
                            id="sign-in-password"
                            type={showPassword ? 'text' : 'password'}
                            placeholder="••••••"
                            autoComplete="current-password"
                            className="flex-grow p-2 outline-none font-sans bg-transparent pr-80"
                            onChange={(e) => setForm({ ...form, password: e.target.value })}
                        />
                        <button
                            type="button"
                            onClick={handleTogglePassword}
                            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 focus:outline-none"
                        >
                            {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                        </button>
                    </div>
                    {passwordError && <span className="text-red-600 text-xs font-bold">{passwordErrorMessage}</span>}
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className="mt-4 bg-green-600 text-white font-bold py-3 px-4 border-2 border-black shadow-pixel hover:bg-green-700 hover:translate-y-1 hover:shadow-none transition-all active:translate-y-1 active:shadow-none disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wider"
                >
                    {isLoading ? 'Loading...' : 'Sign in'}
                </button>

                <div className="text-center text-sm mt-2">
                    <span>No account? </span>
                    <Link to={'/register'} className="text-green-700 font-bold hover:underline">
                        Create one!
                    </Link>
                </div>
            </form>
        </div>
    )
}

export default SignInPage;

