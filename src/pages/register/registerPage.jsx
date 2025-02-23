/* eslint-disable react-hooks/exhaustive-deps */
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";
import { useState } from "react";
import { Box, FormHelperText } from "@mui/material"
import { useDispatch } from "react-redux";

import useRegister from "./useRegister";
import { authRegister } from "../../redux/auth/authReducers";

const RegisterPage = () => {
    const dispatch = useDispatch();
    const { isRegisterLoading, isLoginLoading } = useRegister();
    const [usernameError, setUsernameError] = useState(false);
    const [usernameErrorMessage, setUsernameErrorMessage] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [emailErrorMessage, setEmailErrorMessage] = useState('');
    const [passwordError, setPasswordError] = useState(false);
    const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
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
        <Box sx={{
            maxWidth: 'xl',
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <Box
                component={'form'}
                onSubmit={handleSubmit}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    bgcolor: 'white',
                    width: 350,
                    borderRadius: 2,
                    p: 3,
                    boxShadow: 2,
                    m: { xs: 2, md: 0 }
                }}
            >
                <Typography
                    variant="h6"
                    noWrap
                    sx={{
                        mr: 2,
                        fontFamily: 'monospace',
                        fontWeight: 700,
                        letterSpacing: '.3rem',
                        color: 'primary.main',
                        textDecoration: 'none',
                        mb: '1rem'
                    }}
                >
                    REGISTER
                </Typography>
                <TextField
                    id="username"
                    size="small"
                    label="Username"
                    type="username"
                    placeholder="josh"
                    error={usernameError}
                    helperText={usernameErrorMessage}
                    onChange={(e) => setForm({ ...form, username: e.target.value })}
                />
                <TextField
                    id="sign-in-email"
                    size="small"
                    label="Email"
                    type="email"
                    placeholder="your@email.com"
                    error={emailError}
                    helperText={emailErrorMessage}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
                <TextField
                    id="sign-in-password"
                    size="small"
                    label="Password"
                    type="password"
                    placeholder="••••••"
                    autoComplete="current-password"
                    error={passwordError}
                    helperText={passwordErrorMessage}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                />
                <Button type="submit" variant="contained" disabled={isRegisterLoading || isLoginLoading} sx={{ color: 'white' }}>{isRegisterLoading || isLoginLoading ? 'Loading' : 'Submit'}</Button>
                <FormHelperText>
                    Already have account?
                    <Link to={'/login'}>
                        Login!
                    </Link>
                </FormHelperText>
            </Box>
        </Box>
    )
}

export default RegisterPage;
