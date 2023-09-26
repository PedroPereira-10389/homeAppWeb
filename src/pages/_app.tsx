import Head from "next/head";
import '@/styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import type { AppProps } from 'next/app'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from "@/components/menu";
import Layout from "@/components/layout";
import { SessionProvider } from "next-auth/react";

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {

  return <>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Head>
    <SessionProvider session={session} basePath="/api/auth">
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
    <ToastContainer theme="colored" />
  </>

}
