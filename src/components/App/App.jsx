import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ButtonAppBar from '../AppBar/AppBar';
import ProtectedRoute from '../PrivateRoute';
import PublicRoute from '../PublicRoute';

const HomePage = lazy(() => import('../../pages/HomePage'));

const LoginPage = lazy(() => import('../../pages/LoginPage'));

const RegisterPage = lazy(() => import('../../pages/RegisterPage'));

const ContactsPage = lazy(() => import('../../pages/ContactsPage'));

export default function App() {
    return (
        <Suspense fallback={<ButtonAppBar />}>
            <Routes>
                <Route path="/Phonebook/" element={<ButtonAppBar />}>
                    <Route index element={<HomePage />} />
                    <Route
                        path="register"
                        element={
                            <PublicRoute>
                                <RegisterPage />
                            </PublicRoute>
                        }
                    />
                    <Route
                        path="login"
                        element={
                            <PublicRoute>
                                <LoginPage />
                            </PublicRoute>
                        }
                    />
                    <Route
                        path="contacts"
                        element={
                            <ProtectedRoute>
                                <ContactsPage />
                            </ProtectedRoute>
                        }
                    />
                </Route>
                <Route
                    path="*"
                    element={<Navigate to="/Phonebook/" replace={true} />}
                />
            </Routes>
        </Suspense>
    );
}
