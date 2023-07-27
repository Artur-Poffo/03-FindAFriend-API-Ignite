import { Pet, Prisma } from '@prisma/client'
import { randomUUID } from 'crypto'
import { PetsRepository, fetchByParamsInterface } from '../pets-repository'

// eslint-disable-next-line prettier/prettier
export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = []
  public testCity = 'Blumenau'

  async findById(id: string) {
    const pet = this.items.find((item) => item.id === id)

    if (!pet) {
      return null
    }

    return pet
  }

  async fetchByParams({
    city,
    page,
    age,
    dogSize,
    energyLevel,
    independenceLevel,
  }: fetchByParamsInterface) {
    return this.items
      .filter(() => this.testCity === city)
      .filter((item) => (age ? item.age === age : item))
      .filter((item) => (dogSize ? item.dog_size === dogSize : item))
      .filter((item) =>
        energyLevel ? item.energy_level === energyLevel : item,
      )
      .filter((item) =>
        independenceLevel
          ? item.independence_level === independenceLevel
          : item,
      )
      .slice((page - 1) * 20, page * 20)
  }

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = {
      id: data.id || randomUUID(),
      name: data.name,
      summary: data.summary,
      age: data.age,
      dog_size: data.dog_size,
      energy_level: data.energy_level,
      independence_level: data.independence_level,
      organization_id: data.organization_id || null,
    }

    this.items.push(pet)

    return pet
  }
}
