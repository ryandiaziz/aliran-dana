import useData from "../../../helper/useData";

const useSearchDrawerCategory = () => {
    const { transactionTypesItems } = useData();
    transactionTypesItems.unshift({name: 'All', value: 'all'});

    return {
        transactionTypesItems,
    }
}

export default useSearchDrawerCategory