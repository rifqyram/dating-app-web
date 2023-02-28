import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from "pages/home";
import Setup from "../pages/setup";
import Register from "../pages/register";
import {useEffect, useState} from "react";
import RouteGuard from "./route.guard";
import Partner from "../pages/partner";
import Header from "../components/sections/header";
import Footer from "../components/sections/footer";
import ListPartner from "../pages/list-partner";
import {useNotification} from "../context/notificationContext";
import Snackbar from "../components/ui/snackbar/snackbar";
import Login from "../pages/login";
import NotFound from "../pages/not-found";

export default function AppRoutes() {
    const [open, setOpen] = useState(true);
    const {error} = useNotification();

    useEffect(() => {
        if (error) {
            setOpen(true);
        }
    }, [error]);

    return (
        <Router>
            <Header/>
            {error && <Snackbar open={open} setOpen={setOpen} message={error.message} severity={error.severity} />}
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/auth/register' element={<Register/>}/>
                <Route path='/auth/login' element={<Login/>}/>
                <Route path='/setup' element={
                    <RouteGuard redirectTo='/auth'>
                        <Setup/>
                    </RouteGuard>
                }/>
                <Route path='/partner' element={
                    <RouteGuard redirectTo='/auth'>
                        <Partner/>
                    </RouteGuard>
                }/>
                <Route path='/my-match' element={
                    <RouteGuard redirectTo='/auth'>
                        <ListPartner/>
                    </RouteGuard>
                }/>
                <Route path='*' element={<NotFound />} />
            </Routes>
            <Footer/>
        </Router>
    )
}