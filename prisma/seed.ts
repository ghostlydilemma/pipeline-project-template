import { PrismaClient } from '@prisma/client'

const prisma: PrismaClient = new PrismaClient()

async function main() {
  const hr = await prisma.department.upsert({
    where: { id: '1' },
    update: {},
    create: {
      id: '1',
      name: 'HR',
    },
  })

  const development = await prisma.department.upsert({
    where: { id: '2' },
    update: {},
    create: {
      id: '2',
      name: 'Development',
    },
  })

  const testing = await prisma.department.upsert({
    where: { id: '3' },
    update: {},
    create: {
      id: '3',
      name: 'Testing',
    },
  })

  const employee = await prisma.employee.upsert({
    where: { id: '1' },
    update: {},
    create: {
      id: '1',
      firstname: 'Denisse',
      middlename: 'Donald',
      lastname: 'Cobb',
      address: '2883 Ashton Lane, Austin, TX, 78701',
      dateOfBirth: '1983-11-28T00:00:00Z',
      salary: 1865,
      isActive: true,
      activeInCompany: {
        connectOrCreate: {
          create: {
            id: '1',
            startDate: new Date().toISOString(),
            type: 'employment',
          },
          where: {
            id: '1',
          },
        },
      },
      departmentId: '1',
    },
  })

  const absence = await prisma.dateRange.upsert({
    where: { id: '2' },
    update: {},
    create: {
      id: '2',
      startDate: new Date(2022, 9, 7),
      endDate: new Date(2022, 9, 14),
      employeeId: '1',
      type: 'holiday',
    },
  })

  console.log({ hr, development, testing })
  console.log({ employee })
  console.log({ absence })
}

main()
  .then(async () => {
    return await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
