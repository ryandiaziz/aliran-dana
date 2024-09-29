/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { Box, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";

import TextInput from "../../components/elements/Inputs/TextInput";
import { createAccount, updateAccount } from "../../redux/account/accountReducers";

const AddAccountPage = () => {
    const [isInitialRender, setIsInitialRender] = useState(true);
    const { loading, error, selected } = useSelector((state) => state.account);
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { account } = useParams();
    
    const [formValues, setFormValues] = useState({
        name: "",
        balance: 0,
        user_id: 2
    });

    const handleChange = (e) => {
        let { name, value } = e.target;
        if (name === 'balance') value = +value;

        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("form values : ", formValues);
        if (account) dispatch(updateAccount(formValues));
        else dispatch(createAccount(formValues));
    }

    useEffect(() => {
        console.log(isInitialRender);
        
        if (isInitialRender) {
            if(account){
                console.log(selected);
                
                setFormValues({
                    id : selected.id,
                    name : selected.name,
                    balance : selected.balance,
                    user_id : 2
                })
                console.log(formValues);
                
            }
            setIsInitialRender(false);
            return;
        }

        if (!loading) {
            if (error) {
                enqueueSnackbar(error, { variant: "error" });
            } else {
                enqueueSnackbar("Berhasil menambahkan", { variant: "success" });
                navigate("/accounts");
            }
        }
    }, [loading])


    return (
        <Box
            component={'form'}
            onSubmit={handleSubmit}
            sx={{ marginInline: 'auto', marginTop: '64px', paddingInline: 2, paddingBlock: 2, maxWidth: 768, display: 'flex', flexDirection: 'column', gap: 2 }}
        >
            <TextInput
                label={'Account'}
                type={'text'}
                name={'name'}
                value={formValues.name}
                onChange={handleChange}
            />
            <TextInput
                label={'Balance'}
                type={'text'}
                inputMode="numeric"
                name={'balance'}
                value={formValues.balance}
                onChange={handleChange}
            />
            <Button type="submit" variant="contained" sx={{ color: 'white' }} disabled={loading}>SIMPAN</Button>
        </Box>
    )
}

export default AddAccountPage