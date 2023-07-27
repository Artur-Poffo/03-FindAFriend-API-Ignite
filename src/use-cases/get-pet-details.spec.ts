import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { GetPetDetailsUseCase } from './get-pet-details'

let petsRepository: InMemoryPetsRepository
let sut: GetPetDetailsUseCase

describe('Get pet details use case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    sut = new GetPetDetailsUseCase(petsRepository)
  })

  it('should be able to get pet details', async () => {
    await petsRepository.create({
      id: 'pet-01',
      name: 'John Doe Jr.',
      summary: 'Summary of John Doe Jr.',
      age: 3,
      dog_size: 'MINI',
      energy_level: 5,
      independence_level: 1,
      organization_id: 'org-01',
    })

    const { pet } = await sut.execute({
      petId: 'pet-01',
    })

    expect(pet.id).toEqual(expect.any(String))
  })

  it('should not be able to get pet details of a inexistent pet', async () => {
    await expect(() =>
      sut.execute({
        petId: 'pet-01',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
