import dayjs from 'dayjs';

export const showRupiah = (value) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(value);
}

export const showDateTime = (value) => {
    const date = dayjs(value);
    return date.format('YYYY-MM-DD HH:mm');
}

export const getCurrentDate = () => {
    return dayjs().format('YYYY-MM-DD');
}

export const getFilterDataTransaction = () => {
    if (localStorage.getItem('filter_transaction') === null){
        const filter = {
            user_id: 2,
            account_id: "0",
            category_id: "0",
            transaction_note: "",
            transaction_type: "all",
            transaction_date: getCurrentDate()
        }
        localStorage.setItem('filter_transaction', JSON.stringify(filter))
    }
    return JSON.parse(localStorage.getItem('filter_transaction'));
}

export const setFilterDataTransaction = (data) => {
    localStorage.setItem('filter_transaction', JSON.stringify(data));
}

export const resetFilterDataTransaction = () => {
    const filter = {
        user_id: 2,
        account_id: "0",
        category_id: "0",
        transaction_note: "",
        transaction_type: "all",
        transaction_date: getCurrentDate()
    }
    localStorage.setItem('filter_transaction', JSON.stringify(filter));
}

export const getFilterDataCategory = () => {
    if (localStorage.getItem('filter_category') === null){
        const filter = {
            transaction_type: 'income'
        }
        localStorage.setItem('filter_category', JSON.stringify(filter));
    }
    return JSON.parse(localStorage.getItem('filter_category'));
}

export const setFilterDataCategory = (data) => {
    localStorage.setItem('filter_category', JSON.stringify(data));
}

export const resetFilterDataCategory = () => {
    const filter = {
        transaction_type: 'income'
    }
    localStorage.setItem('filter_category', JSON.stringify(filter));
    return JSON.parse(localStorage.getItem('filter_category'));
}