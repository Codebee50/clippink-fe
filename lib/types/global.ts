export type BreadCrumbItem = {
  label: string;
  href: string;
};

export type PaginationInfo = {
  total: number;
  page: number,
  page_size: number,
  total_pages: number,
  has_next: boolean,
  has_previous: boolean
}

export const DEFAULT_PAGINATION_INFO: PaginationInfo = {
  total: 0,
  page: 1,
  page_size: 12,
  total_pages: 0,
  has_next: false,
  has_previous: false
}