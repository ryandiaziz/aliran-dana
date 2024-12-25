import useData from "../../../utils/useData";

const useSearchDrawerTransaction = () => {
    const { categoryItems, accountItems, transactionTypesItems } = useData();
    categoryItems.unshift({name: 'All', value: 0});
    accountItems.unshift({name: 'All', value: 0});
    transactionTypesItems.unshift({name: 'All', value: 'all'});

    return {
        categoryItems,
        accountItems,
        transactionTypesItems
    }
}

export default useSearchDrawerTransaction