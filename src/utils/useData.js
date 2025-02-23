/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { listAccounts } from "../redux/account/accountReducers";
import { listCategories } from "../redux/category/categoryReducers";
import { useDispatch, useSelector } from "react-redux";

const useData = () => {
    const dispatch = useDispatch();
    const { categories, isCategoryInitial } = useSelector((state) => state.category);
    const categoryItems = categories.map((item) => ({ name: item.category_name, value: item.category_id, type: item.category_type }));

    const { accounts, isAccountInitial } = useSelector((state) => state.account);
    const accountItems = accounts.map((item) => ({ name: item.account_name, value: item.account_id, balance: item.account_balance }));

    const transactionTypesItems = [{ name: "Income", value: "income" }, { name: "Expense", value: "expense" }];

    useEffect(() => {
        if (isCategoryInitial) dispatch(listCategories());
        if (isAccountInitial) dispatch(listAccounts());
    }, [dispatch])

    return {
        categoryItems,
        accountItems,
        transactionTypesItems
    }
}

export default useData;