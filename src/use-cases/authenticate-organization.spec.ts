import { InMemoryOrganizationsRepository } from '@/repositories/in-memory/in-memory-organizations-repository'
import { hash } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'
import { AuthenticateOrganizationUseCase } from './authenticate-organization'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

let organizationsRepository: InMemoryOrganizationsRepository
let sut: AuthenticateOrganizationUseCase

describe('Authenticate organization use case', () => {
  beforeEach(() => {
    organizationsRepository = new InMemoryOrganizationsRepository()
    sut = new AuthenticateOrganizationUseCase(organizationsRepository)
  })

  it('should be able to authenticate a organization', async () => {
    await organizationsRepository.create({
      admin_name: 'John Doe',
      org_name: 'My Org',
      email: 'myorg@gmail.com',
      password_hash: await hash('123456', 6),
      cep: '00000-000',
      address_name: 'John Doe Street',
      phone: '000000000',
    })

    const { organization } = await sut.execute({
      email: 'myorg@gmail.com',
      password: '123456',
    })

    expect(organization.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate a organization with wrong email', async () => {
    await expect(() =>
      sut.execute({
        email: 'myorg@gmail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate a organization with wrong password', async () => {
    await organizationsRepository.create({
      admin_name: 'John Doe',
      org_name: 'My Org',
      email: 'myorg@gmail.com',
      password_hash: await hash('123456', 6),
      cep: '00000-000',
      address_name: 'John Doe Home',
      phone: '000000000',
    })

    await expect(() =>
      sut.execute({
        email: 'myorg@gmail.com',
        password: 'wrong-password',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
