import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { PetsRepository, fetchByParamsInterface } from '../pets-repository'

export class PrismaPetsRepository implements PetsRepository {
  async findById(id: string) {
    const pet = await prisma.pet.findUnique({
      where: {
        id,
      },
    })

    return pet
  }

  async fetchByParams({
    city,
    age,
    dogSize,
    energyLevel,
    independenceLevel,
    page,
  }: fetchByParamsInterface) {
    const pets = await prisma.pet.findMany({
      where: {
        Organization: {
          address_name: city,
        },
        age,
        dog_size: dogSize,
        energy_level: energyLevel,
        independence_level: independenceLevel,
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return pets
  }

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = await prisma.pet.create({
      data,
    })

    return pet
  }
}
