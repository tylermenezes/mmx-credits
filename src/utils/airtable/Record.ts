export type CreditNameOption =
  'Only my discord name'
  | 'Only my name as typed in the "public credit name" section below'
  | 'Both my discord name and public credit name';

export interface Record {
  'Credit Type': string[] | undefined
  'Activity Start Date (Approx)'?: string | undefined
  'Activity End Date (Approx)'?: string | undefined
  'CAD Team Parts Worked On'?: string | undefined
  'PBS Parts Worked On'?: string | undefined
  'MMX Contributor'?: string | undefined
  'Self-Promotion Link'?: string | undefined
  'Credit Name Options'?: CreditNameOption[] | undefined
  'Public Credit Name'?: string | undefined
  'Discord ID': string[] | undefined
}
