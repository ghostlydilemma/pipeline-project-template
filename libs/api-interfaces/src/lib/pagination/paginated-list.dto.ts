export class PaginatedListDto<T> {
  meta: MetaInformation
  data: T[]
}

class MetaInformation {
  itemsPerPage: number
  totalItems: number
  currentPage: number
  totalPages: number
}
