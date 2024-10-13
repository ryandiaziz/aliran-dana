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

export const getFilterData = () => {
    if (localStorage.getItem('filter') === null){
        const filter = {
            user_id: 2,
            account_id: "0",
            category_id: "0",
            transaction_note: "",
            transaction_type: "all",
            transaction_date: getCurrentDate()
        }
        localStorage.setItem('filter', JSON.stringify(filter))
    }
    return JSON.parse(localStorage.getItem('filter'));
}

export const setFilterData = (data) => {
    localStorage.setItem('filter', JSON.stringify(data));
}