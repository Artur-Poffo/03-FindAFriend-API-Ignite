import { Organization, Prisma } from '@prisma/client'
import { hash } from 'bcryptjs'
import { randomUUID } from 'crypto'
import { OrganizationsRepository } from '../organizations-repository'

// eslint-disable-next-line prettier/prettier
export class InMemoryOrganizationsRepository implements OrganizationsRepository {
  public items: Organization[] = []

  async findById(id: string) {
    const organization = this.items.find((item) => item.id === id)

    if (!organization) {
      return null
    }

    return organization
  }

  async findByEmail(email: string) {
    const organization = this.items.find((item) => item.email === email)

    if (!organization) {
      return null
    }

    return organization
  }

  async create(data: Prisma.OrganizationCreateInput) {
    const organization = {
      id: data.id || randomUUID(),
      org_name: data.org_name,
      admin_name: data.admin_name,
      email: data.email,
      password_hash: await hash('123456', 6),
      cep: data.cep,
      address_name: data.admin_name,
      phone: '000000000',
    }

    this.items.push(organization)

    return organization
  }
}
