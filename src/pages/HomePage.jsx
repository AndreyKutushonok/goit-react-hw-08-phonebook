import { useSelector } from 'react-redux';
import { getToken } from '../redux/authorization/selectors';

export default function HomePage() {
    const isToken = useSelector(getToken);

    return (
        <>
            <h1>Hello</h1>
            {isToken ? <p>Welcome.</p> : <p>Please, register or log in.</p>}
        </>
    );
}
