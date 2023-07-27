import { OrganizationsRepository } from '@/repositories/organizations-repository'
import { PetsRepository } from '@/repositories/pets-repository'
import { Pet } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface RegisterPetUseCaseRequest {
  name: string
  summary: string
  age: number
  dogSize: 'MINI' | 'SMALL' | 'MEDIUM' | 'BIG' | 'GIANT'
  energyLevel: number
  independenceLevel: number
  organizationId: string
}

interface RegisterPetUseCaseResponse {
  pet: Pet
}

export class RegisterPetUseCase {
  // eslint-disable-next-line prettier/prettier
  constructor(private petRepository: PetsRepository, private organizationRepository: OrganizationsRepository) { }

  async execute({
    name,
    summary,
    age,
    dogSize,
    energyLevel,
    independenceLevel,
    organizationId,
  }: RegisterPetUseCaseRequest): Promise<RegisterPetUseCaseResponse> {
    const organizationExists = await this.organizationRepository.findById(
      organizationId,
    )

    if (!organizationExists) {
      throw new ResourceNotFoundError()
    }

    const pet = await this.petRepository.create({
      name,
      summary,
      age,
      dog_size: dogSize,
      energy_level: energyLevel,
      independence_level: independenceLevel,
      organization_id: organizationId,
    })

    return { pet }
  }
}
