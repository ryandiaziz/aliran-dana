import dayjs from "dayjs";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Select from "../../components/elements/Inputs/Select";
import Input from "../../components/elements/Inputs/Input";
import CurrencyInput from "../../components/elements/Inputs/CurrencyInput";
import Button from "../../components/elements/Buttons/Button";
import MainLayout from "../../components/layouts/MainLayout";

import useTransaction from "./useTransaction";
import { createTransactions } from "../../redux/transaction.js/transactionReducers";

const AddTransactionPage = () => {
    const dispatch = useDispatch();
    // Using native datetime-local requires YYYY-MM-DDTHH:mm format
    const [date, setDate] = useState(dayjs().format('YYYY-MM-DDTHH:mm'));
    
    // Local categories filtering state
    const [filteredCategories, setFilteredCategories] = useState([]);
    
    const { isLoading } = useSelector((state) => state.transaction.create);
    const { categoryItems, accountItems, transactionTypesItems } = useTransaction();
    
    const [formValues, setFormValues] = useState({
        transaction_type: "",
        transaction_amount: "",
        transaction_note: "",
        transaction_date: dayjs().format('YYYY-MM-DD HH:mm:ss.SSS'),
        category_id: "",
        account_id: ""
    });

    const handleCategoryFilter = (type) => {
        // Filter categories based on transaction type (income/expense)
        // Assuming your items have a 'type' property that matches the transaction type value
        // You might need to adjust logic if values don't match exactly
        setFilteredCategories(categoryItems.filter((item) => item.type === type));
    };

    const handleChange = (e) => {
        let { name, value } = e.target;
        
        if (name === 'transaction_amount') value = +value; // Convert to number
        
        if (name === 'transaction_type') {
            handleCategoryFilter(value); 
            // Reset category when type changes
            setFormValues(prev => ({ ...prev, [name]: value, category_id: "" }));
        } else {
            setFormValues(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleDateChange = (e) => {
        const newDate = e.target.value;
        setDate(newDate);
        setFormValues(prev => ({
            ...prev,
            // Format back to what backend expects
            transaction_date: dayjs(newDate).format('YYYY-MM-DD HH:mm:ss.SSS')
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(createTransactions(formValues));
    }

    return (
        <MainLayout>
            <div className="max-w-2xl mx-auto">
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-900">Add Transaction</h1>
                    <p className="text-gray-500 text-sm mt-1">Record your income or expense.</p>
                </div>

                <form onSubmit={handleSubmit} className="bg-white p-6 md:p-8 rounded-2xl border border-gray-100 shadow-sm space-y-5">
                    
                    <Select
                        label="Type"
                        name="transaction_type"
                        value={formValues.transaction_type}
                        onChange={handleChange}
                        options={transactionTypesItems} // Ensure these items have label/value structure suitable for Select/English
                        placeholder="Select Type"
                    />

                    <Select
                        label="Category"
                        name="category_id"
                        value={formValues.category_id}
                        onChange={handleChange}
                        options={filteredCategories}
                        placeholder="Select Category"
                    />

                    <Select
                        label="Account"
                        name="account_id"
                        value={formValues.account_id}
                        onChange={handleChange}
                        options={accountItems}
                        placeholder="Select Account"
                    />

                    <CurrencyInput
                        label="Amount"
                        name="transaction_amount"
                        value={formValues.transaction_amount}
                        onChange={handleChange}
                        placeholder="0"
                    />

                    <Input
                        label="Note"
                        name="transaction_note"
                        value={formValues.transaction_note}
                        onChange={handleChange}
                        placeholder="Description (optional)"
                    />

                    <Input
                        label="Date"
                        type="datetime-local"
                        value={date}
                        onChange={handleDateChange}
                    />

                    <div className="pt-4">
                        <Button 
                            type="submit" 
                            isLoading={isLoading}
                            variant="primary"
                        >
                            Save Transaction
                        </Button>
                    </div>
                </form>
            </div>
        </MainLayout>
    )
}

export default AddTransactionPage;