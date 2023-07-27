import { app } from '@/app'
import { createAndAuthenticateOrganization } from '@/utils/tests/create-and-authenticate-organization'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Register pet (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to register a new pet', async () => {
    const { token } = await createAndAuthenticateOrganization(app)

    const response = await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'John Doe Jr.',
        summary: 'Some summary.',
        age: 3,
        dogSize: 'MINI',
        energyLevel: 4,
        independenceLevel: 3,
      })

    expect(response.statusCode).toEqual(201)
  })
})
