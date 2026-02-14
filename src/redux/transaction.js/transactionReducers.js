import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { listAccounts } from '../account/accountReducers';
import { getFilterDataTransaction } from '../../utils/helper';
import { config } from '../../utils/config';
import TransactionType from '../../enums/TransactionType';

const { apiUrl } = config();
const URL = `${apiUrl}/api/transactions`;

export const filterTransactions = createAsyncThunk('transaction/filterTransactions', async (data, thunkAPI) => {
    try {
        const response = await axios({
            method: 'POST',
            url: `${URL}/filter`,
            data: getFilterDataTransaction()
        })
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
})

export const createTransactions = createAsyncThunk('transaction/createTransactions', async (data, thunkAPI) => {
    try {
        const response = await axios({
            method: 'POST',
            url: `${URL}`,
            data
        })
        if (!response.data.metaData.status) throw new Error(response.data.metaData.message);
        thunkAPI.dispatch(filterTransactions());
        thunkAPI.dispatch(listAccounts());
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message)
    }
})

export const transferTransactions = createAsyncThunk('transaction/transferTransaction', async (data, thunkAPI) => {
    try {
        const sendBalanceBody = {
            transaction_note: `Send Balance`,
            transaction_amount: data.transaction_amount + data.admin_fee,
            transaction_type: TransactionType.SendBalance,
            transaction_date: data.transaction_date,
            category_id: 1,
            account_id: data.from_account
        }

        const receiveBalanceBody = {
            transaction_note: `Receive Balance`,
            transaction_amount: data.transaction_amount + data.admin_fee,
            transaction_type: TransactionType.ReceiveBalance,
            transaction_date: data.transaction_date,
            category_id: 2,
            account_id: data.to_account
        }

        await axios({
            method: 'POST',
            url: `${URL}`,
            data: sendBalanceBody
        })

        const responseReceiveBalance = await axios({
            method: 'POST',
            url: `${URL}`,
            data: receiveBalanceBody
        })

        if (!responseReceiveBalance.data.metaData.status) throw new Error(responseReceiveBalance.data.metaData.message);
        thunkAPI.dispatch(filterTransactions());
        thunkAPI.dispatch(listAccounts());
        return responseReceiveBalance.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message)
    }
})

export const getSummaryCategory = createAsyncThunk('transaction/getSummaryCategory', async (data, thunkAPI) => {
    try {
        const response = await axios({
            method: 'GET',
            url: `${URL}/summary/category`,
            params: data
        })
        if (!response.data.metaData.status) throw new Error(response.data.metaData.message);
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
})

export const getSummaryTrend = createAsyncThunk('transaction/getSummaryTrend', async (data, thunkAPI) => {
    try {
        const response = await axios({
            method: 'GET',
            url: `${URL}/summary/trend`,
            params: data
        })
        if (!response.data.metaData.status) throw new Error(response.data.metaData.message);
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
})