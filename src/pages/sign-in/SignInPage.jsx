import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Visibility, VisibilityOff } from '@mui/icons-material';

import useLogin from "./useLogin";
import { authLogin } from "../../redux/auth/authReducers";
import AuthLayout from "../../components/layouts/AuthLayout";
import Input from "../../components/elements/Inputs/Input";
import Button from "../../components/elements/Buttons/Button";

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
        <AuthLayout 
            title="Welcome Back" 
            subtitle="Sign in to continue to your dashboard."
        >
            <form onSubmit={handleSubmit} className="space-y-5">
                <Input
                    id="sign-in-email"
                    label="Email"
                    type="email"
                    placeholder="your@email.com"
                    error={emailError}
                    errorMessage={emailErrorMessage}
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                />

                <Input
                    id="sign-in-password"
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••"
                    error={passwordError}
                    errorMessage={passwordErrorMessage}
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    endAdornment={
                        <button
                            type="button"
                            onClick={handleTogglePassword}
                            className="focus:outline-none flex items-center justify-center p-1"
                        >
                            {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                        </button>
                    }
                />

                <div className="pt-2">
                    <Button 
                        type="submit" 
                        isLoading={isLoading}
                    >
                        Sign In
                    </Button>
                </div>

                <div className="text-center text-sm text-gray-500">
                    No account?{' '}
                    <Link 
                        to={'/register'} 
                        className="text-emerald-600 font-semibold hover:text-emerald-700 transition-colors"
                    >
                        Create one!
                    </Link>
                </div>
            </form>
        </AuthLayout>
    )
}

export default SignInPage;
