//arquivo _document.tsx serve para suprir o index.html onde sera customizado o html
import React from 'react'

import Document, {Html, Head, Main, NextScript} from 'next/document'
import Script from 'next/script'

export default class MyDocument extends Document {
    render () {
        return (
            <Html>
                <Head>
                  <link rel="shortcut icon" href="usefashion.ico" type="image/x-icon" />
                  <link rel="preconnect" href="https://fonts.googleapis.com"/>
                  <link rel="preconnect" href="https://fonts.googleapis.com"/>
                  <link rel="preconnect" href="https://fonts.gstatic.com" data-crossorigin/>
                  <link href="https://fonts.googleapis.com/css2?family=PT+Serif&display=swap" rel="stylesheet"/>
                  <link rel="preconnect" href="https://fonts.gstatic.com"/>
                  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@700&family=Lexend&display=swap" rel="stylesheet"/>
                  <link href="https://fonts.googleapis.com/css2?family=Poppins&display=swap" rel="stylesheet"/>
                  <link rel="preconnect" href="https://fonts.googleapis.com"/>
                  <link rel="preconnect" href="https://fonts.gstatic.com" data-crossorigin/>
                  <link href="https://fonts.googleapis.com/css2?family=PT+Serif&family=Poppins:wght@500&display=swap" rel="stylesheet"/>
                  <script src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"></script>

                  <script src="https://unpkg.com/react/umd/react.production.min.js" data-crossorigin></script>
                  <script
                    src="https://unpkg.com/react-dom/umd/react-dom.production.min.js"
                    data-crossorigin>
                  </script>
                </Head>
                <body>
                    <Main/>
                    <NextScript/>
                </body>
            </Html>
        )
    }
}