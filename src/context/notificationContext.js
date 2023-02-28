import {createContext, useContext, useState} from "react";

const NotificationContext = createContext(null);

export const useNotification = () => {
    const notificationContext = useContext(NotificationContext);
    if (!notificationContext) {
        throw new Error('useError must be used within an ErrorProvider');
    }
    return notificationContext;
};

export const NotificationProvider = ({ children }) => {
    const [notification, setNotification] = useState(null);

    const handleNotification = (messageObj) => {
        setNotification(messageObj);
    };

    const clearNotification = () => {
        setNotification(null);
    };

    const value = {
        error: notification,
        handleNotification: handleNotification,
        clearNotification: clearNotification,
    };

    return (
        <NotificationContext.Provider value={value}>
            {children}
        </NotificationContext.Provider>
    );
};