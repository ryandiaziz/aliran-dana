/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

const useAddCategory = () => {
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const [isInitialRenderCreate, setIsInitialRenderCreate] = useState(true);
    const [isInitialRenderUpdate, setIsInitialRenderUpdate] = useState(true);
    const { selected, create, update } = useSelector((state) => state.category);

    useEffect(() => {
        if (isInitialRenderUpdate) {            
            setIsInitialRenderUpdate(false);
            return;
        }

        if (!update.isLoading) {
            if (update.isError) {
                enqueueSnackbar(update.errorMessage, { variant: "error" });
            } else {
                enqueueSnackbar("Berhasil menambahkan", { variant: "success" });
                navigate("/categories");
            }
        }
    }, [update.isLoading])

    useEffect(() => {
        if (isInitialRenderCreate) {            
            setIsInitialRenderCreate(false);
            return;
        }

        if (!create.isLoading) {
            if (create.isError) {
                enqueueSnackbar(create.errorMessage, { variant: "error" });
            } else {
                enqueueSnackbar("Berhasil menambahkan", { variant: "success" });
                navigate("/categories");
            }
        }
    }, [create.isLoading])
    return {
        selected,
        create,
        update
    }
}

export default useAddCategory