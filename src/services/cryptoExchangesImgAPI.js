import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const cryptoExchangesHeaders = {
  "X-RapidAPI-Key": process.env.REACT_APP_EXCHANGES_IMG_API_KEY,
  "X-RapidAPI-Host": process.env.HOST,
};

const baseUrl = "https://coingecko.p.rapidapi.com";

const createRequest = (url) => ({ url, headers: cryptoExchangesHeaders });

export const cryptoExchangesImgApi = createApi({
  reducerPath: "cryptoExchangesImgApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptoExchangesImg: builder.query({
      query: () => createRequest(`/exchanges`),
    }),
  }),
});

export const { useGetCryptoExchangesImgQuery } = cryptoExchangesImgApi;
