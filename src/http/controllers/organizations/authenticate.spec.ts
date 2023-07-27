import { app } from '@/app'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Authenticate organization (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to authenticate', async () => {
    await request(app.server).post('/orgs').send({
      adminName: 'John Doe',
      orgName: 'Org 01',
      email: 'org01@gmail.com',
      password: '123456',
      addressName: 'Blumenau',
      cep: '00000-000',
      phone: '00 000000000',
    })

    const response = await request(app.server).post('/sessions').send({
      email: 'org01@gmail.com',
      password: '123456',
    })

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual({
      token: expect.any(String),
    })
  })
})
