import { Credit } from './Credit'

export interface Person {
  discord?: string | undefined
  name?: string | undefined
  promotionLink?: string | undefined

  credits: Credit[]
  cadParts: string[]
  parts: string[]

  startDate?: string | undefined
  endDate?: string | undefined
}
