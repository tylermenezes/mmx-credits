export type CreditNameOption =
  'Only my discord name as typed in the "public credit discord name" section below'
  | 'Only my other name as typed in the "public credit other name" section below'
  | 'Both my discord name AND my other name'
  | 'I do not wish to be credited publicly';

export interface Record {
  'Credit Type': string[] | undefined
  'Activity Start Date (Approx)'?: string | undefined
  'Activity End Date (Approx)'?: string | undefined
  'CAD Team Parts Worked On'?: string | undefined
  'PBS Parts Worked On'?: string | undefined
  'MMX Contributor'?: string | undefined
  'Self-Promotion Link'?: string | undefined
  'Credit Name Options'?: CreditNameOption | undefined
  'Public Credit - Other Name'?: string | undefined
  'Public Credit - Discord Name'?: string | undefined
  'Discord ID'?: string[] | undefined
}
