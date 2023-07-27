import { InMemoryOrganizationsRepository } from '@/repositories/in-memory/in-memory-organizations-repository'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { hash } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { RegisterPetUseCase } from './register-pet'

let petsRepository: InMemoryPetsRepository
let organizationsRepository: InMemoryOrganizationsRepository
let sut: RegisterPetUseCase

describe('Register pet use case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    organizationsRepository = new InMemoryOrganizationsRepository()
    sut = new RegisterPetUseCase(petsRepository, organizationsRepository)
  })

  it('should be able to register a new pet', async () => {
    await organizationsRepository.create({
      id: 'org-01',
      admin_name: 'John Doe',
      org_name: 'My Org',
      email: 'myorg@gmail.com',
      password_hash: await hash('123456', 6),
      cep: '00000-000',
      address_name: 'John Doe Street',
      phone: '000000000',
    })

    const { pet } = await sut.execute({
      name: 'John Doe Jr.',
      summary: 'Summary of John Doe Jr.',
      age: 3,
      dogSize: 'MINI',
      energyLevel: 5,
      independenceLevel: 1,
      organizationId: 'org-01',
    })

    expect(pet.id).toEqual(expect.any(String))
  })

  it('should not be able to register a new pet in a inexistent organization', async () => {
    await expect(() =>
      sut.execute({
        name: 'John Doe Jr.',
        summary: 'Summary of John Doe Jr.',
        age: 3,
        dogSize: 'MINI',
        energyLevel: 5,
        independenceLevel: 1,
        organizationId: 'org-01',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
