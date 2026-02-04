import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

type QueryParamValue = string | number | boolean | null | undefined;
type QueryParams = Record<string, QueryParamValue>;

export function useQueryParams() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();


    const getParam = useCallback(
        (key: string): string | null => {
            return searchParams.get(key);
        },
        [searchParams]
    );

    /**
     * Get all query parameters as an object
     */
    const getAllParams = useCallback((): Record<string, string> => {
        const params: Record<string, string> = {};
        searchParams.forEach((value, key) => {
            params[key] = value;
        });
        return params;
    }, [searchParams]);


    const getFutureParamUrl = useCallback((key: string, value: QueryParamValue): string => {
        const params = new URLSearchParams(searchParams.toString());
        params.set(key, String(value))

        const queryString = params.toString();
        const url = queryString ? `${pathname}?${queryString}` : pathname;
        return url

    }, [searchParams, pathname]);


    /**
     * Set or update a single query parameter
     */
    const setParam = useCallback(
        (key: string, value: QueryParamValue, scroll = false) => {
            const params = new URLSearchParams(searchParams.toString());

            if (value === null || value === undefined || value === '') {
                params.delete(key);
            } else {
                params.set(key, String(value));
            }

            const queryString = params.toString();
            const url = queryString ? `${pathname}?${queryString}` : pathname;

            router.push(url, { scroll });
        },
        [pathname, router, searchParams]
    );



    /**
     * Set or update multiple query parameters at once
     */
    const setParams = useCallback(
        (updates: QueryParams, scroll = false) => {
            const params = new URLSearchParams(searchParams.toString());

            Object.entries(updates).forEach(([key, value]) => {
                if (value === null || value === undefined || value === '') {
                    params.delete(key);
                } else {
                    params.set(key, String(value));
                }
            });

            const queryString = params.toString();
            const url = queryString ? `${pathname}?${queryString}` : pathname;

            router.push(url, { scroll });
        },
        [pathname, router, searchParams]
    );

    /**
     * Delete a specific query parameter
     */
    const deleteParam = useCallback(
        (key: string, scroll = false) => {
            const params = new URLSearchParams(searchParams.toString());
            params.delete(key);

            const queryString = params.toString();
            const url = queryString ? `${pathname}?${queryString}` : pathname;

            router.push(url, { scroll });
        },
        [pathname, router, searchParams]
    );

    /**
     * Delete multiple query parameters
     */
    const deleteParams = useCallback(
        (keys: string[], scroll = false) => {
            const params = new URLSearchParams(searchParams.toString());

            keys.forEach(key => params.delete(key));

            const queryString = params.toString();
            const url = queryString ? `${pathname}?${queryString}` : pathname;

            router.push(url, { scroll });
        },
        [pathname, router, searchParams]
    );

    /**
     * Clear all query parameters
     */
    const clearParams = useCallback(
        (scroll = false) => {
            router.push(pathname, { scroll });
        },
        [pathname, router]
    );

    return {
        // Getters
        getParam,
        getAllParams,

        getFutureParamUrl,

        // Setters
        setParam,
        setParams,

        // Deleters
        deleteParam,
        deleteParams,
        clearParams,

        // Raw access
        searchParams,
    };
}