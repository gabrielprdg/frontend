//arquivo _document.tsx serve para suprir o index.html onde sera customizado o html
import React from 'react'

import Document, {Html, Head, Main, NextScript} from 'next/document'

export default class MyDocument extends Document {
    render () {
        return (
            <Html>
                <Head>
                  <link rel="preconnect" href="https://fonts.googleapis.com"/>
                  <link rel="preconnect" href="https://fonts.gstatic.com"/>
                  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@700&family=Lexend&display=swap" rel="stylesheet"/>
                  <link href="https://fonts.googleapis.com/css2?family=Poppins&display=swap" rel="stylesheet"/>
                  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" data-crossorigin="anonymous"/>

                  <script src="https://unpkg.com/react/umd/react.production.min.js" data-crossorigin></script>
                  <script src="sliderProductDetails.js"></script>
                  <script
                    src="https://unpkg.com/react-dom/umd/react-dom.production.min.js"
                    data-crossorigin>
                  </script>
                  <script
                    src="https://unpkg.com/react-bootstrap@next/dist/react-bootstrap.min.js"
                    data-crossorigin>
                  </script>

                  {/* Swiper Js*/}
                  <link
                    rel="stylesheet"
                    href="https://unpkg.com/swiper@7/swiper-bundle.min.css"
                  />

                  <script src="https://unpkg.com/swiper@7/swiper-bundle.min.js"></script>
                </Head>
                <body>
                    <Main/>
                    <NextScript/>
                </body>
            </Html>
        )
    }
}