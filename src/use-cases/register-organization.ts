import { OrganizationsRepository } from '@/repositories/organizations-repository'
import { Organization } from '@prisma/client'
import { hash } from 'bcryptjs'
import { OrganizationAlreadyExistsError } from './errors/organization-already-exists-error'

interface RegisterOrganizationUseCaseRequest {
  orgName: string
  adminName: string
  email: string
  password: string
  cep: string
  addressName: string
  phone: string
}

interface RegisterOrganizationUseCaseResponse {
  organization: Organization
}

export class RegisterOrganizationUseCase {
  // eslint-disable-next-line prettier/prettier
  constructor(private organizationRepository: OrganizationsRepository) { }

  async execute({
    orgName,
    adminName,
    email,
    password,
    cep,
    addressName,
    phone,
  }: RegisterOrganizationUseCaseRequest): Promise<RegisterOrganizationUseCaseResponse> {
    const orgWithSameEmail = await this.organizationRepository.findByEmail(
      email,
    )

    if (orgWithSameEmail) {
      throw new OrganizationAlreadyExistsError()
    }

    const password_hash = await hash(password, 6)

    const organization = await this.organizationRepository.create({
      org_name: orgName,
      admin_name: adminName,
      email,
      password_hash,
      cep,
      address_name: addressName,
      phone,
    })

    return { organization }
  }
}
