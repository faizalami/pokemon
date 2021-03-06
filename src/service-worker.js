/* eslint-disable no-restricted-globals */

import 'regenerator-runtime';
import { registerRoute } from 'workbox-routing';
import { precacheAndRoute } from 'workbox-precaching';
import {
  pageCache,
  imageCache,
  staticResourceCache,
  googleFontsCache,
} from 'workbox-recipes';
import { createStore, get, set } from 'idb-keyval';
import Md5 from 'crypto-js/md5';

precacheAndRoute(self.__WB_MANIFEST);

pageCache();

googleFontsCache({
  maxAgeSeconds: 31536000,
});

staticResourceCache();

imageCache({
  maxAgeSeconds: 31536000,
});

registerRoute(
  ({ url }) => process.env.REACT_APP_GQL_URI.startsWith(url.origin),
  ({ event }) => cacheFirstPostReq(event),
  'POST',
);

const store = createStore('GraphQL-Cache', 'PostResponses');

async function cacheFirstPostReq (event) {
  const cached = await getCache(event.request.clone());
  return cached ? Promise.resolve(cached) : fetch(event.request.clone())
    .then((response) => {
      setCache(event.request.clone(), response.clone());
      return response;
    });
}

async function serializeResponse (response) {
  let serializedHeaders = {};
  for (let entry of response.headers.entries()) {
    serializedHeaders[entry[0]] = entry[1];
  }
  let serialized = {
    headers: serializedHeaders,
    status: response.status,
    statusText: response.statusText,
  };
  serialized.body = await response.json();
  return serialized;
}

async function setCache (request, response) {
  let body = await request.json();
  let id = Md5(`${body.query}${JSON.stringify(body.variables)}`).toString();

  let entry = {
    query: body.query,
    variables: body.variables,
    response: await serializeResponse(response),
    timestamp: Date.now(),
  };
  set(id, entry, store);
}

async function getCache (request) {
  let data;
  try {
    let body = await request.json();
    let id = Md5(`${body.query}${JSON.stringify(body.variables)}`).toString();
    data = await get(id, store);
    if (!data) {
      return null;
    }

    let cacheControl = request.headers.get('Cache-Control');
    let maxAge = cacheControl ? parseInt(cacheControl.split('=')[1]) : 3600;
    if (Date.now() - data.timestamp > maxAge * 1000) {
      return null;
    }

    return new Response(JSON.stringify(data.response.body), data.response);
  } catch (err) {
    return null;
  }
}
