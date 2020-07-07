import { GetServerSideProps, NextPage } from 'next';

// For this demo the saloons page will be the startpage
const Index: NextPage = () => {
  return null;
};
export default Index;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  ctx.req.headers = {};

  ctx.res.setHeader('Location', '/saloons');
  ctx.res.statusCode = 301;
  ctx.res.end();

  // Need to return something
  return { props: {} };
};
