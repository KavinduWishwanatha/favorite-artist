import { NextPage, NextPageContext } from 'next';
import Error from 'next/error';
import { ISiteExport } from '../@types';

export const ErrorComp: NextPage<ISiteExport> = ({ errorCode }) => {
  return <Error statusCode={errorCode || 404} />;
};

ErrorComp.getInitialProps = ({ res, err }: NextPageContext) => {
  if (err) {
    console.error(err);
  }
  const errorCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { errorCode };
};

export default ErrorComp;
