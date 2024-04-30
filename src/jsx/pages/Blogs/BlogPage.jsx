import React, { useEffect, useState } from 'react'
import { AxiosPost } from '../../../context/UserContext';
import { toast } from 'react-toastify';

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
                <div style={{ minHeight: "500px", backgroundColor: "white" }} >Loading...</div> :
                <div style={{ minHeight: "500px", backgroundColor: "white",color:"black", padding:"50px" }} dangerouslySetInnerHTML={{ __html: blog.content }}></div>}
        </>
    )
}

export default BlogPage