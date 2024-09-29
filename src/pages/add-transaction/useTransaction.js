/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import useData from "../../helper/useData";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const useTransaction = () => {
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const [isInitialRender, setIsInitialRender] = useState(true);
    const { categoryItems, accountItems, transactionTypesItems } = useData();
    const { isLoading, isError, errorMessage } = useSelector((state) => state.transaction.create);

    useEffect(() => {
        if (isInitialRender) {
            setIsInitialRender(false);
            return;
        }

        if (!isLoading) {
            if (isError) {
                enqueueSnackbar(errorMessage, { variant: "error" });
            } else {
                enqueueSnackbar("Berhasil menambahkan", { variant: "success" });
                navigate("/");
            }
        }
    }, [isLoading])

    return {
        categoryItems,
        accountItems,
        transactionTypesItems
    }
}

export default useTransaction