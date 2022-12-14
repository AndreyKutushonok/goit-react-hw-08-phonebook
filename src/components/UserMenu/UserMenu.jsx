import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logOutState } from '../../redux/authorization/slice';
import {
    useGetAuthQuery,
    useLogoutMutation,
} from '../../redux/authorization/api';
import { getToken } from '../../redux/authorization/selectors';
import { useState, useEffect } from 'react';
import { Button, Typography, CircularProgress } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { useSnackbar } from 'notistack';

export default function UserMenu() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [LogOutApi, { isLoading, isSuccess, isError, error }] =
        useLogoutMutation();
    const isToken = useSelector(getToken);
    const [isSkip, setIsSkip] = useState(false);
    const { data } = useGetAuthQuery(null, { skip: isSkip || !isToken });
    const { enqueueSnackbar } = useSnackbar();
    const [isLoggedOutApi, setIsLoggedOutApi] = useState(false);

    const handleLogout = async () => {
        setIsSkip(true);
        await LogOutApi();
    };

    useEffect(() => {
        if (isSuccess) {
            navigate('/Phonebook/');
            setIsLoggedOutApi(true);
        }
        if (isError && error?.originalStatus === 404) {
            enqueueSnackbar("Sorry, we can't find this page", {
                variant: 'error',
            });
        } else if (isError && error?.status === 'FETCH_ERROR') {
            enqueueSnackbar('Internet is disconnected', {
                variant: 'error',
            });
        } else if (isError) {
            enqueueSnackbar('Something went wrong, please try again later', {
                variant: 'error',
            });
        }
    }, [
        enqueueSnackbar,
        error?.originalStatus,
        error?.status,
        isError,
        isLoading,
        isSuccess,
        navigate,
    ]);

    useEffect(() => {
        if (isLoggedOutApi) {
            dispatch(logOutState());
            enqueueSnackbar('You have logged out successfully', {
                variant: 'success',
            });
        }
    }, [dispatch, enqueueSnackbar, isLoggedOutApi]);

    if (data) {
        return (
            <Typography variant="h6" component="div">
                Welcome {data.name}
                <Button
                    variant="contained"
                    type="submit"
                    margin="normal"
                    onClick={handleLogout}
                    sx={{ ml: 4 }}
                    endIcon={
                        isLoading ? (
                            <CircularProgress
                                size={16}
                                thickness={6}
                                color="inherit"
                            />
                        ) : (
                            <LogoutIcon />
                        )
                    }
                >
                    Logout
                </Button>
            </Typography>
        );
    }
}
