// pages/_document.js
import Document, { Html, Head, Main, NextScript } from 'next/document';
import { renderToString } from 'react-dom/server';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const originalRenderPage = ctx.renderPage;

    let serverSideHtml;

    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App) => (props) => {
          const appHtml = renderToString(<App {...props} />);
          serverSideHtml = appHtml;
          return <App {...props} />;
        },
      });

    const initialProps = await Document.getInitialProps(ctx);

    if (serverSideHtml) {
      console.log('Server-side HTML:', serverSideHtml);
    }

    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
