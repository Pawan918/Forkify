import { async } from 'regenerator-runtime';
import { TIMOUT_SEC } from './config.js';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};
export const AJAX = async function (url, uploadData = undefined) {
  try {
    const fetchPro = uploadData
      ? await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(uploadData),
        })
      : await fetch(url);

    const res = await Promise.race([fetchPro, timeout(TIMOUT_SEC)]);
    const data = await res.json();
    // console.log(data);
    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    return data;
  } catch (err) {
    throw err;
  }
};
// export const getJSON = async function (url) {};

// export const sendJSON = async function (url, uploadData) {
//   try {
//     // const fetchPro = fetch(
//     //   'https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886'
//     // );
//     const fetchPro = await fetch(url, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(uploadData),
//     });
//     const res = await Promise.race([fetchPro, timeout(TIMOUT_SEC)]);
//     const data = await res.json();
//     // console.log(data);
//     if (!res.ok) throw new Error(`${data.message} (${res.status})`);
//     return data;
//   } catch (err) {
//     throw err;
//   }
// };
