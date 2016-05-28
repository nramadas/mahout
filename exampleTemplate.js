import React from 'react';
import ReactServerDom from 'react-dom/server';
import { Provider } from 'react-redux';
import App from '../../app/App';

const env = process.env.NODE_ENV || 'production';
const jsSrc = env === 'production' ? 'Client.js' : 'DevClient.js';

export default function(data, store) {
  return ReactServerDom.renderToStaticMarkup(
    <html lang="en">
      <head>
        <title>Mahout Generated App</title>
        <meta charSet="utf8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <script
          id='data'
          dangerouslySetInnerHTML={ {
            __html: `window.___r = ${JSON.stringify(data)}`
          } }
        ></script>
        <link rel='stylesheet' href='/fonts/font.css'/>
        <link rel='stylesheet' href='/Client.css'/>
      </head>
      <body>
        <div
          id="container"
          dangerouslySetInnerHTML={ {
            __html: ReactServerDom.renderToString(
              <Provider store={ store }>
                <App />
              </Provider>
            ),
          } }
        />
        <script type="text/javascript" src={ `/${jsSrc}` }></script>
      </body>
    </html>
  );
}
