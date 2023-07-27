import { app } from '@/app'
import { prisma } from '@/lib/prisma'
import { createAndAuthenticateOrganization } from '@/utils/tests/create-and-authenticate-organization'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Get pet details (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get pet details', async () => {
    await createAndAuthenticateOrganization(app)

    const org = await prisma.organization.findFirstOrThrow()

    const pet = await prisma.pet.create({
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

    const response = await request(app.server).get(`/pets/${pet.id}`).send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.pet).toEqual(
      expect.objectContaining({
        name: 'John Doe Jr.',
      }),
    )
  })
})
