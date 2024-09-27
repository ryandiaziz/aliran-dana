import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { listCategories } from "../redux/category/categoryReducers";
import { listAccounts } from "../redux/account/accountReducers";

const useData = () => {
    const dispatch = useDispatch();    
    const { categories } = useSelector((state) => state.category);
    const categoryItems = categories.map((item) => ({ name: item.category_name, value : item.category_id }));

    const { accounts } = useSelector((state) => state.account);
    const accountItems = accounts.map((item) => ({ name: item.account_name, value : item.account_id, balance : item.account_balance }));

    useEffect(() => {
        dispatch(listCategories());
        dispatch(listAccounts());
    }, [dispatch])

    return {
        categoryItems,
        accountItems
    }
}

export default useData