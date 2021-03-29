import { GetStaticPropsResult } from 'next';
import IndexPage, { IndexProps, getStaticProps as indexGetStaticProps } from './index';

export default IndexPage;

export async function getStaticProps(): Promise<GetStaticPropsResult<IndexProps>> {
  const { props, ...rest } = await indexGetStaticProps() as {
    props: IndexProps,
    revalidate: number | boolean | undefined
  };

  return {
    props: {
      ...props,
      milkyWay: 'solid',
    },
    ...rest,
  }
}
