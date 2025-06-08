// frontend/src/pages/_app.tsx
import type { AppProps } from 'next/app';
import Head from 'next/head';
import Navbar from '../components/Navbar'; // Path is correct from pages to components
import '../styles/globals.css'; // <<-- Keep this, it *should* work if globals.css is in src/styles/

// If the above line still fails, try this:
// import '@/styles/globals.css'; // This uses the path alias you set up!

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Zyon E-commerce</title>
        <meta name="description" content="Your one-stop shop for all your needs." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <Component {...pageProps} />
      </main>
    </>
  );
}

export default MyApp;