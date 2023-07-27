import { OrganizationsRepository } from '@/repositories/organizations-repository'
import { Organization } from '@prisma/client'
import { compare } from 'bcryptjs'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

interface AuthenticateOrganizationUseCaseRequest {
  email: string
  password: string
}

interface AuthenticateOrganizationUseCaseResponse {
  organization: Organization
}

export class AuthenticateOrganizationUseCase {
  // eslint-disable-next-line prettier/prettier
  constructor(private organizationRepository: OrganizationsRepository) { }

  async execute({
    email,
    password,
  }: AuthenticateOrganizationUseCaseRequest): Promise<AuthenticateOrganizationUseCaseResponse> {
    const organization = await this.organizationRepository.findByEmail(email)

    if (!organization) {
      throw new InvalidCredentialsError()
    }

    const doesPasswordMatches = await compare(
      password,
      organization.password_hash,
    )

    if (!doesPasswordMatches) {
      throw new InvalidCredentialsError()
    }

    return { organization }
  }
}
