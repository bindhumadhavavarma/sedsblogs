import React, { useContext, useEffect } from "react";

/// React router dom
import { Routes, Route } from "react-router-dom";

/// Css
import "./index.css";

/// Layout
import Header from "./layouts/Header";
import Footer from "./layouts/Footer";
/// Dashboard

/// Widget
///Accounts
import Home from "./pages/Home/Home";
import Blogs from "./pages/Blogs/Blogs";
import Editor from "./pages/Editor/Editor";
import BlogPage from "./pages/Blogs/BlogPage";
import MyBlogs from "./pages/MyBlogs/MyBlogs";
import Accounts from "./pages/Accounts/Accounts";
import BlogApprovals from "./pages/BlogApprovals/BlogApprovals";

const Markup = () => {
    let routes = [
        /// Dashboard
        { url: "", component: <Home /> },
        { url: "allblogs", component: <Blogs /> },
        { url: "myblogs", component: <MyBlogs /> },
        { url: "editor", component: <Editor /> },
        { url: "viewblog", component: <BlogPage /> }

    ];

    if (localStorage.getItem("privilege") === "admin") {
        routes = [
            /// Dashboard
            { url: "", component: <Home /> },
            { url: "allblogs", component: <Blogs /> },
            { url: "myblogs", component: <MyBlogs /> },
            { url: "editor", component: <Editor /> },
            { url: "viewblog", component: <BlogPage /> },
            { url: "accounts", component: <Accounts /> },
            { url: "blogapprovals", component: <BlogApprovals /> }
        ];
    }


    let path = window.location.pathname;
    path = path.split("/");
    path = path[path.length - 1];



    return (
        <>
            <div
                id="main-wrapper"
                className={'show'}
            >
                <Header />

                <div className="content-body">
                    <div
                        className="container-fluid"

                    >

                        <Routes>
                            {routes.map((data, i) => (
                                <Route
                                    key={i}
                                    exact
                                    path={`/${data.url}`}
                                    element={data.component}
                                />
                            ))}
                        </Routes>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    );
};

export default Markup;
