import { useState } from "react";
import { Box, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

import TextInput from "../../components/elements/Inputs/TextInput";
import { createAccount } from "../../redux/account/accountReducers";

const AddAccountPage = () => {
    const { loading, error } = useSelector((state) => state.account);
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
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
        console.log(formValues);
        dispatch(createAccount(formValues));

        if (!loading) {
            if (error) {
                enqueueSnackbar(error, { variant: "error" });
            } else {
                enqueueSnackbar("Berhasil menambahkan", { variant: "success" });
                navigate("/accounts");
            }
        }
    }

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