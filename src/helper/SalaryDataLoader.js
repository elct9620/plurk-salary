// Fetch API didn't support progress feature
// Content-Length is not available when server didn't shared it

import { SALARY_API_URL } from '../constants';

export default function(onProgress) {
  const request = new XMLHttpRequest();
  request.addEventListener('progress', (ev) => {
    if (onProgress && ev.lengthComputable) {
      onProgress((ev.loaded / ev.total) * 100);
    }
  })

  request.open('GET', SALARY_API_URL);

  return new Promise((resolve) => {
    request.addEventListener('load', () => resolve(JSON.parse(request.responseText)))
    request.send();
  });
}
