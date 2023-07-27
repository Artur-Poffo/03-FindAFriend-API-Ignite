import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { FetchPetsByParamsUseCase } from './fetch-pets-by-params'

let petsRepository: InMemoryPetsRepository
let sut: FetchPetsByParamsUseCase

describe('Fetch pets by params use case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    sut = new FetchPetsByParamsUseCase(petsRepository)
  })

  it('should be able to fetch a list of pets by params', async () => {
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

    await petsRepository.create({
      id: 'pet-02',
      name: 'John Doe Jr. 2',
      summary: 'Summary of John Doe Jr.',
      age: 3,
      dog_size: 'BIG',
      energy_level: 5,
      independence_level: 1,
      organization_id: 'org-01',
    })

    const { pets } = await sut.execute({
      city: 'Blumenau',
      dogSize: 'BIG',
    })

    expect(pets).toHaveLength(1)
    expect(pets).toEqual([expect.objectContaining({ name: 'John Doe Jr. 2' })])
  })

  it('should be able to fetch a paginated list of pets by params', async () => {
    for (let i = 1; i <= 22; i++) {
      await petsRepository.create({
        name: `John Doe ${i}`,
        summary: 'Summary of John Doe Jr.',
        age: 3,
        dog_size: 'MINI',
        energy_level: 5,
        independence_level: 1,
        organization_id: 'org-01',
      })
    }

    const { pets } = await sut.execute({
      city: 'Blumenau',
      page: 2,
    })

    expect(pets).toHaveLength(2)
    expect(pets).toEqual([
      expect.objectContaining({ name: 'John Doe 21' }),
      expect.objectContaining({ name: 'John Doe 22' }),
    ])
  })
})
