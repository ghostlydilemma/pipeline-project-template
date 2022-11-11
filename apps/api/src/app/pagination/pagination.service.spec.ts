import { PaginatedObject, PaginationService } from './pagination.service'
import { Test, TestingModule } from '@nestjs/testing'

describe('PaginationService', () => {
  let service: PaginationService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PaginationService],
    }).compile()

    service = module.get(PaginationService)
  })

  it('should create a generic paginated list', () => {
    const expectedPaginatedData: PaginatedObject<unknown> = {
      data: [{}, {}, {}],
      meta: {
        currentPage: 0,
        itemsPerPage: 3,
        totalItems: 8,
        totalPages: 3,
      },
    }

    const paginatedObject = service.createPagination([{}, {}, {}], {
      offset: 0,
      limit: 3,
      totalItems: 8,
    })

    expect(paginatedObject).toStrictEqual(expectedPaginatedData)
  })
})
