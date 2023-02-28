import {Fragment, useEffect, useState} from "react";
import {Box, Drawer as MUIDrawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import {ExitToApp, Favorite, FavoriteBorder, Home, Person, Settings} from "@mui/icons-material";
import RouteNavigation from "routes/routeNavigation";
import {getMyInfo} from "services/auth.service";

export function Drawer({open, setOpen}) {
    const [authenticate, setAuthenticate] = useState(null);
    const {navigateTo, navigate} = RouteNavigation();
    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setOpen(!open);
    };

    let menuListAuthenticated = [
        {label: 'Find Match', icon: <FavoriteBorder/>, path: '/partner'},
        {label: 'List Match', icon: <Favorite/>, path: '/my-match'},
        {label: 'Settings', icon: <Settings/>, path: '/setup'},
        {label: 'Logout', icon: <ExitToApp/>, path: '/auth/login'},
    ]

    let menuListUnauthenticated = [
        {label: 'Home', icon: <Home/>, path: '/'},
        {label: 'Sign In', icon: <Person/>, path: '/auth/login'}
    ]

    function handleClick(path) {
        if (path === '/auth/login') {
            sessionStorage.removeItem('token');
            setAuthenticate(false);
            navigateTo(path);
            return;
        }
        navigateTo(path);
    }

    async function fetchMyInfo() {
        try {
            const {data} = await getMyInfo();
            if (Object.keys(data).length !== 0) {
                setAuthenticate(true);
            }
        } catch (e) {
        }
    }


    useEffect(() => {
        fetchMyInfo();
    }, [navigate, authenticate])

    const list = (anchor) => (
        <Box
            sx={{width: anchor}}
            role="presentation"
            onClick={toggleDrawer(anchor, open)}
            onKeyDown={toggleDrawer(anchor, open)}
        >
            <List>
                {
                    authenticate && authenticate ?
                        menuListAuthenticated.map((text, index) => (
                            <ListItem key={text.label} disablePadding>
                                <ListItemButton onClick={e => handleClick(text.path)}>
                                    <ListItemIcon>
                                        {text.icon}
                                    </ListItemIcon>
                                    <ListItemText primary={text.label}/>
                                </ListItemButton>
                            </ListItem>
                        )) : (
                            menuListUnauthenticated.map((text, index) => (
                                <ListItem key={text.label} disablePadding>
                                    <ListItemButton onClick={e => handleClick(text.path)}>
                                        <ListItemIcon>
                                            {text.icon}
                                        </ListItemIcon>
                                        <ListItemText primary={text.label}/>
                                    </ListItemButton>
                                </ListItem>
                            ))

                        )
                }
            </List>
        </Box>
    );

    return (
        <div>
            <Fragment>
                <MUIDrawer
                    anchor='top'
                    open={open}
                    onClose={toggleDrawer('top', open)}>
                    {list('top')}
                </MUIDrawer>
            </Fragment>
        </div>
    );
}