import { useSelector } from "react-redux"

const useCategoriesPage = () => {
    const { categoriesFilter } = useSelector((state) => state.category);
    const categoryItems = categoriesFilter.map((item) => ({
        name: item.category_name,
        value: item.category_id,
        type: item.category_type
    }));

    return {
        categoryItems
    }
}

export default useCategoriesPage