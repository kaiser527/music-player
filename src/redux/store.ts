import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Action,
  combineReducers,
  configureStore,
  ThunkAction,
} from "@reduxjs/toolkit";
import { WHITELIST_REDUCER } from "constants/utils";
import { getPersistConfig } from "redux-deep-persist";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import accountReducer from "./slice/AccountSlice";
import favoriteReducer from "./slice/FavoriteSlice";
import playlistReducer from "./slice/PlaylistSlice";
import trackReducer from "./slice/TrackSlice";
import userReducer from "./slice/UserSlice";

const rootReducer = combineReducers({
  account: accountReducer,
  track: trackReducer,
  favorite: favoriteReducer,
  user: userReducer,
  playlist: playlistReducer,
});

const persistConfig = getPersistConfig({
  key: "root",
  storage: AsyncStorage,
  whitelist: WHITELIST_REDUCER,
  rootReducer,
});

export const store = configureStore({
  reducer: persistReducer(persistConfig, rootReducer),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const persistor = persistStore(store);
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
