import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { getToken } from '../redux/authorization/selectors';

export default function PublicRoute({ children }) {
    const isToken = useSelector(getToken);

    if (isToken) {
        return <Navigate to="/Phonebook/contacts" replace />;
    }

    return children;
}
