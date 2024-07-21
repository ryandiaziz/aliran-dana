import { TextField } from '@mui/material';
import {useState} from 'react'
import MainLayout from '../../components/layouts/MainLayout';

const CustomForm = () => {
    const [value, setValue] = useState("");

    const handleSubmit = (e) =>{
        e.preventDefault();
        console.log(formValues.transaction_note);
    }

    const [formValues, setFormValues] = useState({
        transaction_type: '',
        transaction_amount: '',
        transaction_note: '',
        transaction_date: null,
        user_id: 2,
        category_id: '',
        account_id: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(`handleChange called - name: ${name}, value: ${value}`);
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    return (
        <MainLayout>
            <form onSubmit={handleSubmit}>
                <TextField type="text" name='transaction_note' value={formValues.transaction_note} onChange={handleChange} />
                {/* <input  /> */}
                <button type='submit'>Gas</button>
            </form>
        </MainLayout>
    )
}

export default CustomForm