import type { NextApiRequest, NextApiResponse } from 'next'
import { airtable } from '../../utils';

export default async function (req: NextApiRequest, res: NextApiResponse) {
  res.send(await airtable.fetchAllPeople());
}
