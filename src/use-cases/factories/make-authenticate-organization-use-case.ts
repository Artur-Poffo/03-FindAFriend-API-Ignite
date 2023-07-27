import { PrismaOrganizationsRepository } from '@/repositories/prisma/prisma-organizations-repository'
import { AuthenticateOrganizationUseCase } from '../authenticate-organization'

export function makeAuthenticateOrganizationUseCase() {
  const organizationsRepository = new PrismaOrganizationsRepository()
  const authenticateOrganizationUseCase = new AuthenticateOrganizationUseCase(
    organizationsRepository,
  )

  return authenticateOrganizationUseCase
}
