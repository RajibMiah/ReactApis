import useSWR from "swr";


const fetcher = (url) => fetch(url).then((res) => res.json());

interface QueryParams {
    nested?: boolean;
}
export default function useAppConstants() {

    const getUrl = () => {
        let queryParams = new URLSearchParams();

        return `${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/product/v1/xyz/`;
    };

    const { data, mutate, error } = useSWR(`${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/core/v1/app-constants/`, fetcher);
    const Constants = data ?? [];
    const isLoading = !data && !error;
    return {
        constants: Constants,
        error,
        mutate,
    };
}
