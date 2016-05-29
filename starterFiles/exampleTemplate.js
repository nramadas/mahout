import React from 'react';
import ReactServerDom from 'react-dom/server';

const env = process.env.NODE_ENV || 'production';
const jsSrc = env === 'production'
  ? '/client.js'
  : 'http://localhost:8080/client.js';

const cssSrc = env === 'production'
  ? '/main.css'
  : 'http://localhost:8080/main.css';

export default function() {
  return ReactServerDom.renderToStaticMarkup(
    <html lang="en">
      <head>
        <title>Mahout Generated App</title>
        <meta charSet="utf8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <link rel='stylesheet' href={ cssSrc }/>
      </head>
      <body>
        <div id="container"/>
        <script type="text/javascript" src={ jsSrc }></script>
      </body>
    </html>
  );
}
