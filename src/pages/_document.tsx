import Document, { Html, Head, Main, NextScript } from 'next/document'

export default class myDocument extends Document{
  render() {
    return(
      <Html>
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link href="https://fonts.googleapis.com/css2?family=Noto+Sans:wght@500;600;700&display=swap" rel="stylesheet"/>
          <title>NX-Weather</title> 
          <link rel="shortcut icon" href="/assets/favicon.ico" />
        </Head>
        <body>
          <Main/>
          <NextScript/>
        </body>
      </Html>
    )
  }
}