// frontend/src/pages/_document.tsx
import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en"> {/* Set your desired language */}
        <Head>
          {/* You can add custom meta tags, link tags for fonts, favicons here
              These are loaded once for the entire app.
              <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap" rel="stylesheet" />
          */}
        </Head>
        <body>
          <Main /> {/* This is where your _app.tsx and individual pages are rendered */}
          <NextScript /> {/* This loads Next.js's JavaScript bundles */}
        </body>
      </Html>
    );
  }
}

export default MyDocument;