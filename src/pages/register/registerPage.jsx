import { useState } from "react";
import { Box, FormHelperText } from "@mui/material"
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import useLogin from "./useLogin";
import { authLogin } from "../../redux/auth/loginReducers";

const RegisterPage = () => {
    useLogin();
    const dispatch = useDispatch();
    const [emailError, setEmailError] = useState(false);
    const [emailErrorMessage, setEmailErrorMessage] = useState('');
    const [passwordError, setPasswordError] = useState(false);
    const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
    const { isLoading } = useSelector((state => state.auth.login));
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
                    height: 300,
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
                <Button type="submit" variant="contained" disabled={isLoading} sx={{ color: 'white' }}>{isLoading ? 'Loading' : 'Sign in'}</Button>
                <FormHelperText>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                        <Typography sx={{ fontWeight: 'light' }}>No account?</Typography>
                        <Link to={'#'}>
                            <Typography sx={{ cursor: 'pointer' }}> Create one!</Typography>
                        </Link>
                    </Box>
                </FormHelperText>
            </Box>
        </Box>
    )
}

export default RegisterPage;
