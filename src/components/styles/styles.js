import { createTheme } from '@mui/material';

export const mainTheme = createTheme({
    palette: {
        primary: {
            main: '#1c242d',
            contrastText: '#ff8b2d',
        },
    },
});

export const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#ff841f',
            contrastText: '#14191d',
        },
        text: {
            secondary: '#ffffff',
        },
        background: {
            paper: '#1c242d',
        },
    },
});

export const buttonSX = {
    width: '8rem',
    color: '#ffffff',
    '&:hover': { bgcolor: '#ff8b2d' },
};

export const contactFormButtonSX = {
    width: '12rem',
    m: '1rem 0',
    ml: '127px',
    color: '#ffffff',
    '&:hover': { bgcolor: '#ff8b2d' },
};

export const boxSX = {
    display: 'flex',
    flexDirection: 'column',
    width: '20rem',
};
