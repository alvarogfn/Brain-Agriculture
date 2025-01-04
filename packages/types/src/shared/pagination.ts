export type Paginated<Content> = {
  content: Content[];
  first: boolean;
  last: boolean;
  number: number;
  numberOfElements: number;
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
};

export type Pagination = {
  page?: number;
  size?: number;
  sort?: string[];
};
