import dayjs from 'dayjs';

export const showRupiah = (value) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0}).format(value);
}

export const showDateTime = (value) => {
    const date = dayjs(value);
    return date.format('YYYY-MM-DD HH:mm');
}

export const getCurrentDate = () =>{
    return dayjs().format('YYYY-MM-DD');
}