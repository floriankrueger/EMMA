import * as contentful from 'contentful';

const client = contentful.createClient({
  space: process.env.REACT_APP_CTF_SPACE_ID,
  accessToken: process.env.REACT_APP_CTF_ACCESSTOKEN,
});

export { client };
