import axios from 'axios';

export const getAccessToken = async () => {
  const ulr1 = `https://${process.env.CTP_CLIENT_ID}:${process.env.CTP_CLIENT_SECRET}@auth.${process.env.CTP_REGION}.commercetools.com/oauth/token?grant_type=client_credentials&scope=${process.env.CTP_SCOPES}`;

  //   make request to get token
  const {
    data: { access_token },
  } = await axios.post(ulr1);

  return access_token;
};
