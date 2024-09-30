/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { Box, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";

import TextInput from "../../components/elements/Inputs/TextInput";
import SelectInput from "../../components/elements/Inputs/SelectInput";
import { createCategory, updateCategory } from "../../redux/category/categoryReducers";

const AddCategoryPage = () => {
    const [isInitialRender, setIsInitialRender] = useState(true);
    const transactionTypesItems = [{ name: "Pendapatan", value: "income" }, { name: "Pengeluaran", value: "expense" }];
    const { loading, error, selected } = useSelector((state) => state.category);
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { category } = useParams();

    const [formValues, setFormValues] = useState({
        category_name: "",
        category_type: "",
        user_id: 2
    });

    const handleChange = (e) => {
        let { name, value } = e.target;

        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (category) dispatch(updateCategory(formValues));
        else dispatch(createCategory(formValues));
    }

    useEffect(() => {
        if (isInitialRender) {
            if (category) {
                setFormValues({
                    category_id: selected.id,
                    category_name: selected.name,
                    category_type: selected.type,
                })
            }
            setIsInitialRender(false);
            return;
        }

        if (!loading) {
            if (error) {
                enqueueSnackbar(error, { variant: "error" });
            } else {
                enqueueSnackbar("Berhasil menambahkan", { variant: "success" });
                navigate("/categories");
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
                label={'Category Name'}
                type={'text'}
                name={'category_name'}
                value={formValues.category_name}
                onChange={handleChange}
            />
            <SelectInput
                value={formValues.category_type}
                values={transactionTypesItems}
                onChange={handleChange}
                name={'category_type'}
                label={'Category Type'}
            />
            <Button type="submit" variant="contained" sx={{ color: 'white' }} disabled={loading}>SIMPAN</Button>
        </Box>
    )
}

export default AddCategoryPage