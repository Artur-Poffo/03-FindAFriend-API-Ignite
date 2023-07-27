import { OrganizationAlreadyExistsError } from '@/use-cases/errors/organization-already-exists-error'
import { makeRegisterOrganizationsUseCase } from '@/use-cases/factories/make-register-organizations-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerOrganizationBodySchema = z.object({
    orgName: z.string(),
    adminName: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
    cep: z.string().regex(/^\d{5}-\d{3}$/, 'Insert valid format for CEP'),
    addressName: z.string(),
    phone: z
      .string()
      .regex(/^\(?\d{2}\)? ?(?:\d{4,5}-?\d{4})$/, 'Insert valid phone number'),
  })

  const { orgName, adminName, email, password, addressName, cep, phone } =
    registerOrganizationBodySchema.parse(request.body)

  try {
    const registerUseCase = makeRegisterOrganizationsUseCase()

    await registerUseCase.execute({
      orgName,
      adminName,
      email,
      password,
      addressName,
      cep,
      phone,
    })
  } catch (err) {
    if (err instanceof OrganizationAlreadyExistsError) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }

  return reply.status(201).send()
}
