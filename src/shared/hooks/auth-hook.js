import {useCallback, useEffect, useState} from "react";
let logoutTimer

export const useAuth = () => {
    const [token, setTokn] = useState(false);
    const [tokenExpirationDate,setTokenExpirationDate] = useState()
    const [userId,setUserId] = useState(false)


    const login = useCallback((uid,token, expirationDate) => {
        setTokn(token);
        setUserId(uid)
        const tokenExpirationDate = expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60)
        setTokenExpirationDate(tokenExpirationDate)
        localStorage.setItem('userData',JSON.stringify({userId: uid,token: token,expiration: tokenExpirationDate.toISOString()}))
    }, []);

    const logout = useCallback(() => {
        setTokn(null);
        setTokenExpirationDate(null)
        setUserId(null)
        localStorage.removeItem('userData')
    }, []);

    useEffect(() => {
        if(token && tokenExpirationDate) {
            const reminatingTime = tokenExpirationDate.getTime() - new Date()
            logoutTimer = setTimeout(logout, reminatingTime)
        }else {
            clearTimeout(logoutTimer)
        }
    },[token,logout,tokenExpirationDate])

    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem('userData'))
        if(storedData && storedData.token && new Date(storedData.expiration) > new Date()) {
            login(storedData.userId, storedData.token, new Date(storedData.expiration))
        }
    }, [login]);

    return {token,login,logout,userId}
}