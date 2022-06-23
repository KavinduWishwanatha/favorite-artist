/* eslint-disable @typescript-eslint/explicit-member-accessibility */
import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from 'next/document'
import { ReactElement } from 'react'


export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx)
    return initialProps
  }

  render(): ReactElement {
    return (
      <Html lang="en">
        <Head>
          <link rel="shortcut icon" href={require('../public/favicon.ico')} />
          <link
            rel="icon"
            href={require('../public/favicon-16x16.png')}
            type="image/png"
            sizes="16x16"
          />
          <link
            rel="icon"
            href={require('../public/favicon-32x32.png')}
            type="image/png"
            sizes="32x32"
          />
          <link
            rel="icon"
            href={require('../public/favicon-96x96.png')}
            type="image/png"
            sizes="96x96"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
