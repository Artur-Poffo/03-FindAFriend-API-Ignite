import { verifyJwt } from '@/http/middlewares/verify-jwt'
import { FastifyInstance } from 'fastify'
import { fetchPetsByParams } from './fetch-pets-by-params'
import { getPetDetails } from './get-pet-details'
import { register } from './register'

export async function petsRoutes(app: FastifyInstance) {
  app.get('/pets', fetchPetsByParams)
  app.get('/pets/:id', getPetDetails)

  // Authenticated routes
  app.post('/pets', { onRequest: [verifyJwt] }, register)
}
