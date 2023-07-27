import { Pet, Prisma } from '@prisma/client'

export interface fetchByParamsInterface {
  city: string
  age?: number
  dogSize?: 'MINI' | 'SMALL' | 'MEDIUM' | 'BIG' | 'GIANT'
  energyLevel?: number
  independenceLevel?: number
  page: number
}

export interface PetsRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
  findById(id: string): Promise<Pet | null>
  fetchByParams(params: fetchByParamsInterface): Promise<Pet[]>
}
