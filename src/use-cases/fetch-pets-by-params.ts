import { PetsRepository } from '@/repositories/pets-repository'
import { Pet } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface FetchPetsByParamsUseCaseRequest {
  city: string
  age?: number
  energyLevel?: number
  dogSize?: 'MINI' | 'SMALL' | 'MEDIUM' | 'BIG' | 'GIANT'
  independenceLevel?: number
  page?: number
}

interface FetchPetsByParamsUseCaseResponse {
  pets: Pet[]
}

export class FetchPetsByParamsUseCase {
  // eslint-disable-next-line prettier/prettier
  constructor(private petRepository: PetsRepository) { }

  async execute({
    city,
    age,
    dogSize,
    energyLevel,
    independenceLevel,
    page = 1,
  }: FetchPetsByParamsUseCaseRequest): Promise<FetchPetsByParamsUseCaseResponse> {
    const pets = await this.petRepository.fetchByParams({
      city,
      page,
      age,
      dogSize,
      energyLevel,
      independenceLevel,
    })

    if (!pets) {
      throw new ResourceNotFoundError()
    }

    return { pets }
  }
}
