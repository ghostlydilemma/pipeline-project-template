import { Injectable } from '@nestjs/common'

type PaginationData<T> = T[]
type PaginationMeta = {
  offset: number
  limit: number
  totalItems: number
}
export type PaginatedObject<T> = {
  data: PaginationData<T>
  meta: {
    currentPage: number
    itemsPerPage: number
    totalItems: number
    totalPages: number
  }
}

@Injectable()
export class PaginationService {
  createPagination<T>(data: PaginationData<T>, { offset, limit, totalItems }: PaginationMeta): PaginatedObject<T> {
    return {
      meta: {
        currentPage: offset,
        itemsPerPage: data.length,
        totalItems,
        totalPages: Math.ceil(totalItems / limit),
      },
      data: data,
    }
  }
}
