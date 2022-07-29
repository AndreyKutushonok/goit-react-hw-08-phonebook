import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { configureStore } from '@reduxjs/toolkit';
import { contactsApi } from './contacts/contactsApi';
import { authApi } from './authorization/api';
import { authSlice } from './authorization/slice';
import { contactFilter } from './contacts/filterSlice';

const authPersistConfig = {
    key: 'auth',
    storage,
    whitelist: ['token'],
};

const authReducer = persistReducer(authPersistConfig, authSlice.reducer);

export const store = configureStore({
    reducer: {
        [contactsApi.reducerPath]: contactsApi.reducer,
        [authApi.reducerPath]: authApi.reducer,
        [contactFilter.name]: contactFilter.reducer,
        auth: authReducer,
    },
    middleware: getDefaultMiddleware => [
        ...getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    FLUSH,
                    REHYDRATE,
                    PAUSE,
                    PERSIST,
                    PURGE,
                    REGISTER,
                ],
            },
        }),
        contactsApi.middleware,
        authApi.middleware,
    ],
});

export const persistor = persistStore(store);
