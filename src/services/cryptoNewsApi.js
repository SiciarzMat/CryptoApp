import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const cryptoNewsHeaders = {
  "X-RapidAPI-Key": process.env.REACT_APP_NEWS_API_KEY,
  "X-RapidAPI-Host": process.env.REACT_APP_NEWS_API_HOST,
};

const baseUrl = "https://real-time-news-data.p.rapidapi.com";

const createRequest = (url) => ({ url, headers: cryptoNewsHeaders });

export const cryptoNewsApi = createApi({
  reducerPath: "cryptoNewsApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptoNews: builder.query({
      query: ({ newsCategory }) =>
        createRequest(`/search?query=${newsCategory}&country=US&lang=en`),
    }),
  }),
});

export const { useGetCryptoNewsQuery } = cryptoNewsApi;
