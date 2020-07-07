import React from 'react';
import { AppProps } from 'next/app';
import '../src/assets/style.css';
import { SaloonProvider } from '@context/saloonsContext';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <SaloonProvider>
      <Component {...pageProps} />
    </SaloonProvider>
  );
};

export default MyApp;
