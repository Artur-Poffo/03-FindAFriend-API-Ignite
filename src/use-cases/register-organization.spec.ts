import { InMemoryOrganizationsRepository } from '@/repositories/in-memory/in-memory-organizations-repository'
import { compare } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'
import { OrganizationAlreadyExistsError } from './errors/organization-already-exists-error'
import { RegisterOrganizationUseCase } from './register-organization'

let organizationsRepository: InMemoryOrganizationsRepository
let sut: RegisterOrganizationUseCase

describe('Register organization use case', () => {
  beforeEach(() => {
    organizationsRepository = new InMemoryOrganizationsRepository()
    sut = new RegisterOrganizationUseCase(organizationsRepository)
  })

  it('should be able to register a organization', async () => {
    const { organization } = await sut.execute({
      adminName: 'John Doe',
      orgName: 'My Org',
      email: 'myorg@gmail.com',
      password: '123456',
      cep: '00000-000',
      addressName: 'John Doe Home',
      phone: '000000000',
    })

    expect(organization.id).toEqual(expect.any(String))
  })

  it('should hash organization password upon registration', async () => {
    const { organization } = await sut.execute({
      adminName: 'John Doe',
      orgName: 'My Org',
      email: 'myorg@gmail.com',
      password: '123456',
      cep: '00000-000',
      addressName: 'John Doe Home',
      phone: '000000000',
    })

    const isPasswordCorrectlyHashed = await compare(
      '123456',
      organization.password_hash,
    )

    expect(isPasswordCorrectlyHashed).toEqual(true)
  })

  it('should not be able to register a organization with same email twice', async () => {
    const email = 'johndoe@example.com'

    await sut.execute({
      adminName: 'John Doe',
      orgName: 'My Org',
      email,
      password: '123456',
      cep: '00000-000',
      addressName: 'John Doe Home',
      phone: '000000000',
    })

    await expect(() =>
      sut.execute({
        adminName: 'John Doe',
        orgName: 'My Org',
        email,
        password: '123456',
        cep: '00000-000',
        addressName: 'John Doe Home',
        phone: '000000000',
      }),
    ).rejects.toBeInstanceOf(OrganizationAlreadyExistsError)
  })
})
