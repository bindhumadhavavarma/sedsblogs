import { createContext, useState, useEffect } from "react";
import axios from 'axios';

export const UserContext = createContext();
export const Axios = axios.create({ baseURL: 'https://sedsvitap.in/sedsblogsAPIs/' });

export const AxiosPost = async (apiname, body) => {
    const { data } = await Axios.post(apiname, body, {
        cache: false,
    })
    return data;
}

export const AxiosGet = async (apiname) => {
        const { data } = await Axios.get(apiname);
        console.log(data)
        return data;
}

export const UserContextProvider = ({ children }) => {
    const [theUser, setUser] = useState(null);
    const [selectedBlog,setSelectedBlog] = useState(null)
    const [wait, setWait] = useState(false);
    const loginUser = async ({ username, password }) => {
        setWait(true);
        try {
            const { data } = await Axios.post('login.php', { username, password });
            console.log(data);
            if (data.success && data.token) {
                localStorage.setItem('loginToken', data.token);
                localStorage.setItem('username', data.userData.username);
                localStorage.setItem('fullname',data.userData.fullName)
                localStorage.setItem('privilege', data.privilege)
                loggedInCheck();
                setWait(false);
                window.location.href = "/blogs"
                return { Success: true };
            } else {
                return {success: false, error:data.error}
            }
            setWait(false);
        } catch (err) {
            setWait(false);
            return { success: false, message: 'Server Error!' };
        }
    }
    const loggedInCheck = async () => {
        const loginToken = localStorage.getItem('loginToken');
        Axios.defaults.headers.common['Authorization'] = 'Bearer ' + loginToken;
        if (loginToken) {
            const { data } = await Axios.get('getUser.php');
            console.log(data)
            if (data.success && data.userData) {
                setUser(data.userData);
                return;
            }
            setUser(null);
        }
    }
    useEffect(() => {
        async function asyncCall() {
            await loggedInCheck();
        }
        asyncCall();
    }, []);

    useEffect(()=>{
        console.log("user chagned"+theUser)
    },[theUser])

    const logout = () => {
        localStorage.clear();
        setUser(null);
    }


    return (
        <UserContext.Provider value={{ loginUser, wait, user: theUser, loggedInCheck, logout, selectedBlog, setSelectedBlog }}>
            {children}
        </UserContext.Provider>
    );
}
export default UserContextProvider;