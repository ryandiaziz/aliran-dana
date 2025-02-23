/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import TextInput from "../../components/elements/Inputs/TextInput";
import useAddAccount from "./useAddAccount";
import { createAccount, updateAccount } from "../../redux/account/accountReducers";
import PrimaryButton from "../../components/elements/Buttons/PrimaryButton";

const AddAccountPage = () => {
    const dispatch = useDispatch();
    const { account } = useParams();
    const { selected, create, update } = useAddAccount();
    const [formValues, setFormValues] = useState({
        account_name: "",
        account_balance: 0
    });

    const handleChange = (e) => {
        let { name, value } = e.target;
        if (name === 'balance') value = parseInt(value);

        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (account) dispatch(updateAccount(formValues));
        else dispatch(createAccount(formValues));
    }

    useEffect(() => {
        if (account) {
            setFormValues({
                account_id: selected.id,
                account_name: selected.name,
                account_balance: selected.balance
            })
        }
    }, [])

    return (
        <Box
            component={'form'}
            onSubmit={handleSubmit}
            sx={{
                marginInline: 'auto',
                marginTop: '64px',
                paddingInline: 2,
                paddingBlock: 2,
                maxWidth: 768,
                display: 'flex',
                flexDirection: 'column',
                gap: 2
            }}
        >
            <TextInput
                label={'Account'}
                type={'text'}
                name={'account_name'}
                value={formValues.account_name}
                onChange={handleChange}
            />
            <TextInput
                label={'Balance'}
                type={'number'}
                inputMode="numeric"
                name={'account_balance'}
                value={formValues.account_balance}
                onChange={handleChange}
            />
            <PrimaryButton
                type='submit'
                disabled={create.isLoading || update.isLoading}
                text='SIMPAN'
            />
        </Box>
    )
}

export default AddAccountPage;