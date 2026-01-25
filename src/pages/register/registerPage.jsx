import { Link } from "react-router-dom";
import { useState } from "react";
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useDispatch } from "react-redux";

import useRegister from "./useRegister";
import { authRegister } from "../../redux/auth/authReducers";
import AuthLayout from "../../components/layouts/AuthLayout";
import Input from "../../components/elements/Inputs/Input";
import Button from "../../components/elements/Buttons/Button";

const RegisterPage = () => {
    const dispatch = useDispatch();
    const { isRegisterLoading, isLoginLoading } = useRegister();
    const [usernameError, setUsernameError] = useState(false);
    const [usernameErrorMessage, setUsernameErrorMessage] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [emailErrorMessage, setEmailErrorMessage] = useState('');
    const [passwordError, setPasswordError] = useState(false);
    const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleTogglePassword = () => {
        setShowPassword((prev) => !prev);
    };

    const [form, setForm] = useState({
        username: '',
        email: '',
        password: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateInputs()) dispatch(authRegister(form));
    }

    const validateInputs = () => {
        let isValid = true;

        if (!form.username || form.username.length < 4) {
            setUsernameError(true);
            setUsernameErrorMessage('Username must be at least 4 characters long.');
            isValid = false;
        } else {
            setUsernameError(false);
            setUsernameErrorMessage('');
        }

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
            title="Create an Account" 
            subtitle="Start managing your finances effectively today."
        >
            <form onSubmit={handleSubmit} className="space-y-5">
                <Input
                    id="username"
                    label="Username"
                    type="text"
                    placeholder="josh"
                    error={usernameError}
                    errorMessage={usernameErrorMessage}
                    value={form.username}
                    onChange={(e) => setForm({ ...form, username: e.target.value })}
                />
                
                <Input
                    id="email"
                    label="Email"
                    type="email"
                    placeholder="your@email.com"
                    error={emailError}
                    errorMessage={emailErrorMessage}
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                />

                <Input
                    id="password"
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
                        isLoading={isRegisterLoading || isLoginLoading}
                    >
                        Create Account
                    </Button>
                </div>

                <div className="text-center text-sm text-gray-500">
                    Already have an account?{' '}
                    <Link 
                        to={'/login'} 
                        className="text-emerald-600 font-semibold hover:text-emerald-700 transition-colors"
                    >
                        Sign in
                    </Link>
                </div>
            </form>
        </AuthLayout>
    )
}

export default RegisterPage;
