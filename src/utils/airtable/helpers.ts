import { default as Query } from 'airtable/lib/query';
import { default as Record } from 'airtable/lib/record';

export async function fetchPages(request: Query): Promise<Record[]> {
  const result: Record[] = [];

  await new Promise((resolve, reject) => {
    request.eachPage((records, nextPage) => {
        records.forEach((rec) => result.push(rec));
        nextPage();
    }, (err: any) => err ? reject(JSON.stringify(err)) : resolve(null));
  });

  return result;
}
