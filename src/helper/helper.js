import dayjs from 'dayjs';

export const showRupiah = (value) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(value);
}

export const showDateTime = (value) => {
    const date = new Date(value);
    const hours = String(date.getUTCHours()).padStart(2, '0'); // Mengambil jam UTC
    const minutes = String(date.getUTCMinutes()).padStart(2, '0'); // Mengambil menit UTC
    return `${hours}:${minutes}`; // Format HH:mm
};

export const getCurrentDate = () => {
    return dayjs().format('YYYY-MM-DD');
}

export const getFilterDataTransaction = () => {
    if (localStorage.getItem('filter_transaction') === null) {
        const filter = {
            user_id: 2,
            account_id: 0,
            category_id: 0,
            transaction_note: "",
            transaction_type: "all",
            is_relative_date_enabled: false,
            transaction_date_from: getCurrentDate(),
            transaction_date_to: getCurrentDate()
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
        account_id: 0,
        category_id: 0,
        transaction_note: "",
        transaction_type: "all",
        is_relative_date_enabled: false,
        transaction_date_from: getCurrentDate(),
        transaction_date_to: getCurrentDate()
    }
    localStorage.setItem('filter_transaction', JSON.stringify(filter));
}

export const getFilterDataCategory = () => {
    if (localStorage.getItem('filter_category') === null) {
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

export const groupByDate = (transactions) => {
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getUTCDate()).padStart(2, '0'); // Gunakan getUTCDate untuk tanggal UTC
        const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Bulan dimulai dari 0
        const year = date.getUTCFullYear(); // Tahun UTC
        return `${day}-${month}-${year}`;
    };

    return transactions.reduce((groups, transaction) => {
        const formattedDate = formatDate(transaction.transaction_date); // Format tanggal menjadi DD-MM-YYYY
        if (!groups[formattedDate]) {
            groups[formattedDate] = [];
        }
        groups[formattedDate].push(transaction);
        return groups;
    }, {});
};