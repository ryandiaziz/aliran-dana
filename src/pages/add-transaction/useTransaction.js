import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { listCategories } from "../../redux/category/categoryReducers";
import { listAccounts } from "../../redux/account/accountReducers";

const useTransaction = () => {
    const dispatch = useDispatch();
    const transactionTypesItems = [{ name: "Pendapatan", value : "income" }, { name: "Pengeluaran",  value : "expense"}];
    const { categories } = useSelector((state) => state.category);
    const categoryItems = categories.map((item) => ({ name: item.category_name, value : item.category_id }));

    const { accounts } = useSelector((state) => state.account);
    const accountItems = accounts.map((item) => ({ name: item.account_name, value : item.account_id }));

    useEffect(() => {
        dispatch(listCategories());
        dispatch(listAccounts());
    }, [dispatch])

    return {
        transactionTypesItems,
        categoryItems,
        accountItems
    }
}

export default useTransaction