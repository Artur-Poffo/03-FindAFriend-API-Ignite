import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { FetchPetsByParamsUseCase } from '../fetch-pets-by-params'

export function makeFetchPetsByParams() {
  const petsRepository = new PrismaPetsRepository()
  const fetchPetsByParams = new FetchPetsByParamsUseCase(petsRepository)

  return fetchPetsByParams
}
