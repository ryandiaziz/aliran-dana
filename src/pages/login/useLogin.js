/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const useLogin = () => {
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const [isInitialRender, setIsInitialRender] = useState(true);
    const { isLoading, isError, errorMessage } = useSelector((state) => state.auth.login);

    useEffect(() => {
        if (isInitialRender) {
            setIsInitialRender(false);
            return
        }

        if (!isLoading) {
            if (isError) {
                enqueueSnackbar(errorMessage, { variant: "error" });
            } else {
                enqueueSnackbar("Berhasil masuk", { variant: "success" });
                navigate("/");
            }
        }
    }, [isLoading]);
}

export default useLogin;