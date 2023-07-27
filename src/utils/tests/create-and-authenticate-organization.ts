import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'
import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createAndAuthenticateOrganization(app: FastifyInstance) {
  await prisma.organization.create({
    data: {
      admin_name: 'John Doe',
      org_name: 'Org 01',
      email: 'org01@gmail.com',
      password_hash: await hash('123456', 6),
      address_name: 'Blumenau',
      cep: '00000-000',
      phone: '00 000000000',
    },
  })

  const authResponse = await request(app.server).post('/sessions').send({
    email: 'org01@gmail.com',
    password: '123456',
  })

  const { token } = authResponse.body

  return {
    token,
  }
}
