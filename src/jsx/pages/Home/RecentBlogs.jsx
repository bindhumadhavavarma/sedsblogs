import React, { useEffect, useState } from 'react'
import { AxiosPost } from '../../../context/UserContext';
import { Link } from 'react-router-dom';
import { ScaleLoader } from 'react-spinners';
import { toast } from 'react-toastify';

function RecentBlogs() {
    const [blogs, setBlogs] = useState([])
    const [isLoading,setIsLoading] = useState(false)
    var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const formatDate = (dateStr) => {
        var dateObj = new Date(dateStr);
        var day = dateObj.getDate();
        var month = monthNames[dateObj.getMonth() + 1];
        var year = dateObj.getFullYear();

        return { day: day, month: month, year: year };
    }


    const fetchBlogs = async () => {
        try {
            setIsLoading(true);
            const data = await AxiosPost('fetchRecentBlogs.php');
            console.log(data)
            if (data.success) {
                setBlogs(data.blogs)
            }
            else {
            }
        } catch {
            toast.error("Server Error")
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(()=>{fetchBlogs()},[])

    return (
        <>
            <div className="anchor" id="Blogs"></div>
            <section className="Blogs">
                <div className="sectionHeading" style={{ "paddingTop": " 40px", "color": "var(--secondary)" }}>Recent Blogs</div>
                <hr />
                <section className="mainrow_1" style={{ "textAlign": " center", "width": " 100%" }}>
                    <div className="row d-flex justify-items-center justify-content-center flex-wrap">
                        { isLoading?<div className="row mx-0" style={{ height: "100%" }}><ScaleLoader color='white' cssOverride={{ "display": "flex", "justifyContent": "center", "alignItems": "center"}} /></div> :
                            blogs.map(blog => 
                                <div className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4 example-2 card" key={blog.blog_id}>
                                    <div className="wrapper" style={{ "background": " url(https://sedsvitap.in/sedsblogsAPIs/uploads/"+blog.imagelink+") center/cover no-repeat" }}>
                                        <div className="header">
                                        <div className="date"> <span className="day">{formatDate(blog.time).day}</span> <span className="month">{formatDate(blog.time).month}</span> <span className="year">{formatDate(blog.time).year}</span>
                                            </div>
                                        </div>
                                        <div className="data">
                                            <div className="content"> <span className="author">{blog.author}</span>
                                                <h1 className="title"><a href="viewBlog.php?blog_id='.$row['id'].'">{blog.title}</a></h1>
                                                <p className="text">{blog.description}</p>
                                                <a href="#" className="button" onClick={()=>{window.localStorage.setItem('selectedblog',blog.blog_id);window.location.replace('/viewblog')}} >View more</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            )
                        }
                    </div>
                    <div style={{ "paddingBottom": " 20px" }}>
                        <Link className="btn btn-primary" to="/allblogs">View All</Link>
                    </div>
                </section>
            </section>
        </>
    )
}

export default RecentBlogs