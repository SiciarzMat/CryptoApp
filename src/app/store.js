import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";

import { cryptoApi } from "../services/cryptoApi";
import { cryptoNewsApi } from "../services/cryptoNewsApi";
import { cryptoExchangesApi } from "../services/cryptoExchangesAPI";
import { cryptoExchangesImgApi } from "../services/cryptoExchangesImgAPI";

export default configureStore({
  reducer: {
    [cryptoApi.reducerPath]: cryptoApi.reducer,
    [cryptoNewsApi.reducerPath]: cryptoNewsApi.reducer,
    [cryptoExchangesApi.reducerPath]: cryptoExchangesApi.reducer,
    [cryptoExchangesImgApi.reducerPath]: cryptoExchangesImgApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      cryptoApi.middleware,
      cryptoNewsApi.middleware,
      cryptoExchangesApi.middleware,
      cryptoExchangesImgApi.middleware,
    ]),
});
