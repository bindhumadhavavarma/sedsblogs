import React, { useContext, useEffect } from 'react'
import logo from '../../assets/images/logobg.png'
import { Link } from 'react-router-dom'
import { UserContext } from '../../context/UserContext'

function Header() {
    const { user, logout } = useContext(UserContext)
    useEffect(() => { console.log(user) }, [user])

    const scrollToSection = (event) => {
        event.preventDefault();
        const targetSection = document.querySelector("#Blogs");
        if (targetSection) {
            window.scrollTo({
                top: targetSection.offsetTop,
                behavior: "smooth"
            });
        }
    };


    return (
        <>
            <div style={{ marginBottom: "75px" }}>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
                    <a className="navbar-brand ms-3 me-0" href="#">
                        <img src={logo} width="140" height="50" className="d-inline-block align-top" alt="" />
                    </a>
                    <button className="navbar-toggler me-2" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse p-2" id="navbarSupportedContent" style={{ "marginTop": "3px" }}>
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to="/blogs">Home</Link>
                            </li>

                            <li className="nav-item" id="nav-item">
                                <Link className="nav-link" to="/blogs" onClick={scrollToSection}>Recent Blogs</Link>
                            </li>

                            <li className="nav-item" id="nav-item">
                                <Link className="nav-link" to="/allblogs">Explore</Link>
                            </li>
                            {
                                localStorage.getItem('privilege') === "admin" ? <>
                                    <li className="nav-item" id="nav-item">
                                        <Link className="nav-link" to="/accounts">Accounts</Link>
                                    </li>
                                    <li className="nav-item" id="nav-item">
                                        <Link className="nav-link" to="/blogapprovals">BlogApprovals</Link>
                                    </li>
                                </> : <></>
                            }
                        </ul>
                        <div className="d-flex ms-auto form-inline my-2 me-4 my-lg-0">
                            {user == null ?
                                <>
                                    <Link type="button" id="navlink" className="nav-link me-3" to="/login" >Login</Link>
                                    <Link type="button" id="navlink" className="nav-link me-3" to="/register" >Register</Link>
                                </> :
                                <span className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        {localStorage.getItem('fullname')}
                                    </a>
                                    <ul className="dropdown-menu">
                                        <li><Link className="dropdown-item" to="/myblogs">My Blogs</Link></li>
                                        <li><hr className="dropdown-divider" /></li>
                                        <li><a className="dropdown-item" href="#" onClick={logout}>Logout</a></li>
                                    </ul>
                                </span>
                            }
                            {/* */}
                        </div>
                    </div>
                </nav >
            </div >
        </>
    )
}

export default Header