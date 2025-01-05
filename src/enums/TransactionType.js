const TransactionType = Object.freeze({
    Expense: 'expense',
    Income: 'income',
    Total: 'total',
    SendBalance: 'outgoing_transfer',
    ReceiveBalance: 'incoming_transfer'
});

export default TransactionType;