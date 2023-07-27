import { app } from '@/app'
import { prisma } from '@/lib/prisma'
import { createAndAuthenticateOrganization } from '@/utils/tests/create-and-authenticate-organization'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Fetch pets by params (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to fetch a list of pets by params', async () => {
    await createAndAuthenticateOrganization(app)

    const org = await prisma.organization.findFirstOrThrow()

    await prisma.pet.create({
      data: {
        name: 'John Doe Jr.',
        summary: 'John Doe Jr Summary',
        age: 3,
        dog_size: 'BIG',
        energy_level: 3,
        independence_level: 2,
        organization_id: org.id,
      },
    })

    await prisma.pet.create({
      data: {
        name: 'John Doe Jr. 2',
        summary: 'John Doe Jr Summary',
        age: 3,
        dog_size: 'SMALL',
        energy_level: 3,
        independence_level: 2,
        organization_id: org.id,
      },
    })

    const response = await request(app.server)
      .get('/pets')
      .query({ city: 'Blumenau', dogSize: 'SMALL' })
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.pets).toEqual([
      expect.objectContaining({
        name: 'John Doe Jr. 2',
      }),
    ])
  })
})
