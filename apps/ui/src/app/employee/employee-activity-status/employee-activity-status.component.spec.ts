import { DateRangeDto } from '@pipeline-project-template/api-interfaces'
import { EmployeeActivityStatusComponent } from './employee-activity-status.component'
import { TestBed } from '@angular/core/testing'

describe('EmployeeActivityStatusComponent', () => {
  let component: EmployeeActivityStatusComponent

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EmployeeActivityStatusComponent],
    })

    component = TestBed.inject(EmployeeActivityStatusComponent)
  })

  it('should get the last three entries of 5 given date-ranges', () => {
    const allDateranges: DateRangeDto[] = [
      {
        endDate: new Date(2022, 7, 15),
        startDate: new Date(2022, 7, 12),
        type: 'employment',
      },
      {
        endDate: new Date(2022, 8, 15),
        startDate: new Date(2022, 8, 12),
        type: 'employment',
      },
      {
        endDate: new Date(2022, 9, 15),
        startDate: new Date(2022, 9, 12),
        type: 'employment',
      },
      {
        endDate: new Date(2022, 10, 15),
        startDate: new Date(2022, 10, 12),
        type: 'employment',
      },
      {
        endDate: new Date(2022, 11, 15),
        startDate: new Date(2022, 11, 12),
        type: 'employment',
      },
    ]
    const expectedDateranges: DateRangeDto[] = [
      {
        endDate: new Date(2022, 9, 15),
        startDate: new Date(2022, 9, 12),
        type: 'employment',
      },
      {
        endDate: new Date(2022, 10, 15),
        startDate: new Date(2022, 10, 12),
        type: 'employment',
      },
      {
        endDate: new Date(2022, 11, 15),
        startDate: new Date(2022, 11, 12),
        type: 'employment',
      },
    ]

    expect(component.getLastThreeArrayValues(allDateranges)).toStrictEqual(expectedDateranges)
  })

  it('should get the last three entries of 3 given date-ranges', () => {
    const allDateranges: DateRangeDto[] = [
      {
        endDate: new Date(2022, 9, 15),
        startDate: new Date(2022, 9, 12),
        type: 'employment',
      },
      {
        endDate: new Date(2022, 10, 15),
        startDate: new Date(2022, 10, 12),
        type: 'employment',
      },
      {
        endDate: new Date(2022, 11, 15),
        startDate: new Date(2022, 11, 12),
        type: 'employment',
      },
    ]
    const expectedDateranges: DateRangeDto[] = [
      {
        endDate: new Date(2022, 9, 15),
        startDate: new Date(2022, 9, 12),
        type: 'employment',
      },
      {
        endDate: new Date(2022, 10, 15),
        startDate: new Date(2022, 10, 12),
        type: 'employment',
      },
      {
        endDate: new Date(2022, 11, 15),
        startDate: new Date(2022, 11, 12),
        type: 'employment',
      },
    ]

    expect(component.getLastThreeArrayValues(allDateranges)).toStrictEqual(expectedDateranges)
  })

  it('should get the last three entries of 1 given date-ranges', () => {
    const allDateranges: DateRangeDto[] = [
      {
        endDate: new Date(2022, 11, 15),
        startDate: new Date(2022, 11, 12),
        type: 'employment',
      },
    ]
    const expectedDateranges: DateRangeDto[] = [
      {
        endDate: new Date(2022, 11, 15),
        startDate: new Date(2022, 11, 12),
        type: 'employment',
      },
    ]

    expect(component.getLastThreeArrayValues(allDateranges)).toStrictEqual(expectedDateranges)
  })

  it('should get the last three entries of no given date-ranges', () => {
    const allDateranges: DateRangeDto[] = []
    const expectedDateranges: DateRangeDto[] = []

    expect(component.getLastThreeArrayValues(allDateranges)).toStrictEqual(expectedDateranges)
  })
})
