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

googleFontsCache();

staticResourceCache();

imageCache();

registerRoute(
  ({ url }) => process.env.REACT_APP_GQL_URI.startsWith(url.origin),
  ({ event }) => networkFirstPostReq(event),
  'POST',
);

const store = createStore('GraphQL-Cache', 'PostResponses');

async function networkFirstPostReq (event) {
  return fetch(event.request.clone())
    .then((response) => {
      setCache(event.request.clone(), response.clone());
      return response;
    })
    .catch((err) => {
      return getCache(event.request.clone());
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
  let id = Md5(body.query).toString();

  let entry = {
    query: body.query,
    response: await serializeResponse(response),
    timestamp: Date.now(),
  };
  set(id, entry, store);
}

async function getCache (request) {
  let data;
  try {
    let body = await request.json();
    let id = Md5(body.query).toString();
    data = await get(id, store);
    if (!data) {
      return null;
    }

    let cacheControl = request.headers.get('Cache-Control');
    let maxAge = cacheControl ? parseInt(cacheControl.split('=')[1]) : 3600;
    if (Date.now() - data.timestamp > maxAge * 1000) {
      console.log(`Cache expired. Load from API endpoint.`);
      return null;
    }

    console.log(`Load response from cache.`);
    return new Response(JSON.stringify(data.response.body), data.response);
  } catch (err) {
    return null;
  }
}
