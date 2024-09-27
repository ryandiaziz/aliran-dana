import useData from "../../helper/useData";

const useTransaction = () => {
    const transactionTypesItems = [{ name: "Pendapatan", value : "income" }, { name: "Pengeluaran",  value : "expense"}];
    const {categoryItems, accountItems} = useData();

    return {
        transactionTypesItems,
        categoryItems,
        accountItems
    }
}

export default useTransaction