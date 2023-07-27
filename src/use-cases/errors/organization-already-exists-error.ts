export class OrganizationAlreadyExistsError extends Error {
  constructor() {
    super('Email already in use')
  }
}
