import Cookies from 'universal-cookie';
const cookies = new Cookies();

const AuthAdminLogin = ({ children }) => {
    const user = cookies.get('user');

    if (user && user.email) {
        return (window.location.href = '/');
    }
    return children;
};

export default AuthAdminLogin;
