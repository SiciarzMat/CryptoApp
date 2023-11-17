import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const cryptoExchangesHeaders = {
  "X-RapidAPI-Key": process.env.REACT_APP_EXCHANGES_API_KEY,
  "X-RapidAPI-Host": process.env.REACT_APP_EXCHANGES_API_HOST,
};

const baseUrl = "https://coinpaprika1.p.rapidapi.com";

const createRequest = (url) => ({ url, headers: cryptoExchangesHeaders });

export const cryptoExchangesApi = createApi({
  reducerPath: "cryptoExchangesApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptoExchanges: builder.query({
      query: () => createRequest(`/exchanges`),
    }),
  }),
});

export const { useGetCryptoExchangesQuery } = cryptoExchangesApi;
