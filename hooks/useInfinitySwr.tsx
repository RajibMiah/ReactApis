import { useSWRInfinite } from "swr";


const fetcher = (url) => fetch(url).then((res) => res.json());

export interface QueryParams {
    // id: any;
    text?: string;
    product?: number;
    category?: string;
    is_featured?: boolean;
    page_size?: number;
    categories?:any;
    categoryId?:number;
    ordering?:string
}

export default function useVariant(params: QueryParams) {
    const { text, product, category, categories, categoryId ,  is_featured , ordering, page_size = 1 } = params ?? {};
    const getKey = (index: number = 0) => {
        let queryParams = new URLSearchParams();
        if (text && !(  product || is_featured || categories)) {
            queryParams.append("search", text);
            if(ordering) queryParams.append("ordering" , ordering.toString())
        } else {
            if (product) queryParams.append("product", product.toString());
            if (categories) {
                categories.map(value => {
                    queryParams.append("categories" , value.toString())
                })
            }
        }


        queryParams.append("page", (index + 1).toString());
        queryParams.append("page_size", page_size.toString());

        return `${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/product/v1/xyz/?` + queryParams;
    };

    const { data, error, size, setSize, mutate, isValidating } = useSWRInfinite(getKey, fetcher);

    const variants = data ? data.flatMap(item => item.results) : [];
    const isLoadingInitialData = !data && !error;
    const isLoadingMore =
        isLoadingInitialData ||
        (size > 0 && data && typeof data[size - 1] === "undefined");
    const isReachingEnd = data && data[data.length - 1]?.links.next == null;
    const isRefreshing = isValidating && data && data.length === size;

    const fetchMore = () => setSize(size + 1)

    return {
        isLoading: isLoadingMore,
        isReachingEnd,
        isRefreshing,
        data: variants,
        error,
        mutate,
        fetchMore,
    };
}
