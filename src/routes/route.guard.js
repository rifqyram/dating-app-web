import {Navigate, useLocation} from "react-router-dom";
import {getMyInfo} from "../services/auth.service";
import {useEffect, useState} from "react";

export default function RouteGuard({children, redirectTo}) {
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    function reValidate() {
        getMyInfo()
            .then(v => setIsAuthenticated(true))
            .catch(e => setIsAuthenticated(false))
    }

    const location = useLocation();

    useEffect(() => {
        reValidate();
    }, [])

    if (isAuthenticated === null) {
        return null;
    }

    if (isAuthenticated) {
        return children
    }

    sessionStorage.removeItem('token');

    return <Navigate to={redirectTo} state={{from: location}} replace/>

}