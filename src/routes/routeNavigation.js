import {useLocation, useNavigate} from "react-router-dom";

export default function RouteNavigation() {
    const navigate = useNavigate();
    const location = useLocation();

    const navigateTo = url => {
        navigate(url);
    }

    return {navigateTo, navigate, location};
}