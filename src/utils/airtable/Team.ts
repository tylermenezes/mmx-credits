import { Person } from './Person';

export interface Team {
  name: string
  people: Person[]
  subteams?: Team[] | undefined
}
