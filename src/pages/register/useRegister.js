/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { message } from "../../utils/message";

const useRegister = () => {
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const [isInitialRender, setIsInitialRender] = useState(true);
    const registerState = useSelector((state) => state.auth.register);
    const loginState = useSelector((state) => state.auth.login);

    useEffect(() => {
        if (isInitialRender) {
            setIsInitialRender(false);
            return;
        }

        if (!registerState.isLoading) {
            if (registerState.isError) {
                enqueueSnackbar(registerState.errorMessage, { variant: "error" });
            } else {
                enqueueSnackbar(message.successRegister, { variant: "success" });
            }
        }
    }, [registerState.isLoading]);

    useEffect(() => {
        if (isInitialRender) {
            setIsInitialRender(false);
            return;
        }

        if (!loginState.isLoading) {
            if (loginState.isError) {
                enqueueSnackbar(loginState.errorMessage, { variant: "error" });
            } else {
                enqueueSnackbar(message.successLogin, { variant: "success" });
                navigate("/", { replace: true });
            }
        }
    }, [loginState.isLoading]);

    return {
        isRegisterLoading: registerState.isLoading,
        isLoginLoading: loginState.isLoading
    }
}

export default useRegister;