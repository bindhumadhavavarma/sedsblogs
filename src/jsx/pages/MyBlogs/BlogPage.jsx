import React, { useContext, useEffect, useState } from 'react'
import { AxiosPost, UserContext } from '../../../context/UserContext';
import { ScaleLoader } from 'react-spinners';

function BlogPage() {
    const [blog, setBlog] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    const fetchBlog = async () => {
        try {
            setIsLoading(true);
            const data = await AxiosPost('fetchBlogContent.php', { blog_id: window.localStorage.getItem('selectedblog') });
            console.log(data)
            if (data.success) {
                setBlog(data.blog)
            }
            else {
            }
        } catch {
            toast.error("Server Error")
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => { fetchBlog() }, [])
    return (
        <>
            {isLoading || blog == null ?
                <div className="row mx-0" style={{ height: "100%" }}><ScaleLoader color='white' cssOverride={{ "display": "flex", "justifyContent": "center", "alignItems": "center"}} /></div> : 
                <div style={{ minHeight: "500px", backgroundColor: "white",color:"black" }} dangerouslySetInnerHTML={{ __html: blog.content }}></div>}
        </>
    )
}

export default BlogPage