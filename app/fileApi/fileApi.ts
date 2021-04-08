const baseUrl = 'https://d15aepxy5dvdf2.cloudfront.net';

import {ImageOrVideo} from 'react-native-image-crop-picker';
import { File } from 'graphql-api';

export async function uploadImage(
  image: ImageOrVideo,
  token: string,
  queryParams: any,
): Promise<any> {
  const data = await fetch(image.path).then((response) => {
    return response.blob();
  });
  const meta = {
    image: { aspectRatio: image.width/image.height }
  };
  const params = {
    ...queryParams,
    meta: JSON.stringify(meta)
  };
  return uploadData(data, image.mime, token, params);
}

export async function uploadData(
  data: Blob,
  mimeType: string,
  token: string,
  queryParams: any,
) {
  let queryString = '';
  if (queryParams) {
    queryString =
      '?' +
      Object.keys(queryParams)
        .map((key: string) => {
          return `${encodeURIComponent(key)}=${encodeURIComponent(
            queryParams[key],
          )}`;
        })
        .join('&');
  }

  console.log('queryString', queryString);

  const headers = new Headers();
  headers.append('Authorization', `Bearer ${token}`);
  headers.append('Content-Type', mimeType);

  return fetch(`${baseUrl}/${queryString}`, {
    method: 'PUT',
    body: data,
    headers,
  }).then((response) => {
    if (response.ok) {
      return response.json();
    }
  });
}

export function urlForFile(file: File, authToken: string) {
  return `https://${file.domain}/?id=${file.id}&token=${authToken}`;
}
