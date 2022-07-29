import { useSelector } from 'react-redux';
import { getToken } from 'redux/authorization/selectors';
import { Outlet } from 'react-router';
import UserMenu from '../UserMenu/UserMenu';
import { Navigation } from '../Navigation/Navigation';
import { AuthNav } from '../AuthorizationNav/AuthorizationNav';
import {
    AppBar,
    Stack,
    Box,
    Toolbar,
    Container,
    Typography,
    ThemeProvider,
} from '@mui/material';
import { darkTheme } from 'components/styles/styles';

export default function ButtonAppBar() {
    const isToken = useSelector(getToken);

    return (
        <>
            <Stack spacing={2} sx={{ flexGrow: 1 }}>
                <ThemeProvider theme={darkTheme}>
                    <Box sx={{ flexGrow: 1 }}>
                        <AppBar position="static" color="primary">
                            <Container sx={{ mt: '1rem' }}>
                                <Toolbar>
                                    <Typography
                                        variant="h6"
                                        component="div"
                                        sx={{ flexGrow: 1 }}
                                    >
                                        <Navigation />
                                    </Typography>
                                    {isToken ? <UserMenu /> : <AuthNav />}
                                </Toolbar>
                            </Container>
                        </AppBar>
                    </Box>
                </ThemeProvider>
            </Stack>
            <Container sx={{ mt: '1rem' }}>
                <Outlet />
            </Container>
        </>
    );
}
