import { lazy, Suspense, useContext, useEffect } from 'react';

/// Components
import Index from "./jsx";
import { Route, Routes } from 'react-router-dom';
/// Style
// import "./vendor/bootstrap-select/dist/css/bootstrap-select.min.css";
// import "./css/main.css";
import { UserContext } from './context/UserContext';
import Home from './jsx/pages/Home/Home';
import Header from './jsx/layouts/Header';
import Footer from './jsx/layouts/Footer';
import Editor from './jsx/pages/Editor/Editor';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
import Blogs from './jsx/pages/Blogs/Blogs';


const Registration = lazy(() => import('./jsx/pages/Registration/Registration'));
const Login = lazy(() => {
    return new Promise(resolve => {
        setTimeout(() => resolve(import('./jsx/pages/Login/Login')), 500);
    });
});

function App() {
    const { user } = useContext(UserContext);

    let routes = (
        <Routes>
        <Route path='/blogs' element={<Home />} />
            <Route path='/allblogs' element={<Blogs />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Registration />} />
            <Route path='/Editor' element={<Editor />} />
            <Route path='*' element={<Home />} />
        </Routes>
    );
    if (user != null) {
        return (
            <>
                <Suspense fallback={
                    <div id="preloader">
                        <div className="sk-three-bounce">
                            <div className="sk-child sk-bounce1"></div>
                            <div className="sk-child sk-bounce2"></div>
                            <div className="sk-child sk-bounce3"></div>
                        </div>
                    </div>
                }
                >   <ToastContainer></ToastContainer>
                    <Index />

                </Suspense>
            </>
        );

    } else {
        return (
            <div >
                <ToastContainer></ToastContainer>
                <Header />
                <Suspense fallback={
                    <div id="preloader">
                        <div className="sk-three-bounce">
                            <div className="sk-child sk-bounce1"></div>
                            <div className="sk-child sk-bounce2"></div>
                            <div className="sk-child sk-bounce3"></div>
                        </div>
                    </div>
                }
                >
                    {routes}
                </Suspense>
                <Footer />
            </div>
        );
    }
};


export default App;

