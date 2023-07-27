import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeFetchPetsByParams } from '@/use-cases/factories/make-fetch-pets-by-params-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function fetchPetsByParams(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const fetchPetsByParamsQuerySchema = z.object({
    city: z.string(),
    age: z.number().optional(),
    energyLevel: z.number().optional(),
    independenceLevel: z.number().optional(),
    dogSize: z.enum(['MINI', 'SMALL', 'MEDIUM', 'BIG', 'GIANT']).optional(),
    page: z.coerce.number().min(1).default(1),
  })

  const { city, age, dogSize, energyLevel, independenceLevel, page } =
    fetchPetsByParamsQuerySchema.parse(request.query)

  try {
    const fetchPetsByParamsUseCase = makeFetchPetsByParams()

    const { pets } = await fetchPetsByParamsUseCase.execute({
      city,
      age,
      dogSize,
      energyLevel,
      independenceLevel,
      page,
    })

    return reply.status(200).send({ pets })
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message })
    }

    throw err
  }
}
