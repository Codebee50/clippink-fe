import React from 'react'
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import { PaginationInfo } from '@/lib/types/global'
import { useQueryParams } from '@/hooks/useQueryParams';
import { cn } from '@/lib/utils';

const CustomPagination = ({ paginationInfo }: { paginationInfo: PaginationInfo }) => {

    const { getFutureParamUrl } = useQueryParams();

    const { total, page, page_size, total_pages, has_next, has_previous } = paginationInfo;

    return (
        <Pagination>
            <PaginationContent className='text-greys2 '>

                {
                    has_previous && <PaginationItem>
                        <PaginationPrevious href={getFutureParamUrl("page", page - 1)} />
                    </PaginationItem>
                }

                {
                    Array.from({ length: total_pages }).map((_, index) => (
                        <PaginationItem key={index} className={cn(page === index + 1 && "bg-senary rounded-md text-white")}>
                            <PaginationLink href={getFutureParamUrl("page", index + 1)}>{index + 1}</PaginationLink>
                        </PaginationItem>
                    ))
                }

                {
                    has_next && <>
                        <PaginationItem>
                            <PaginationEllipsis />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationNext href={getFutureParamUrl("page", page + 1)} />
                        </PaginationItem>
                    </>
                }


            </PaginationContent>
        </Pagination>
    )
}

export default CustomPagination