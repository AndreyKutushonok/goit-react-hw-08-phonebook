import { createSelector } from '@reduxjs/toolkit';

export const getToken = state => state.auth.token;

export const getFilter = state => state.filter.toLowerCase();
export const getContacts = state => state.contacts.item;
export const getUser = state => state.auth.user;
export const getIsLoggedIn = state => state.auth.isLoggedIn;

export const filteredContacts = createSelector(
    [response => response.data, (_, filter) => filter],

    (contacts, filterValue) => {
        return (
            contacts?.filter(({ name }) =>
                name.toLowerCase().startsWith(filterValue)
            ) ?? []
        );
    }
);
