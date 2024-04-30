import React, { useContext, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './Editor.css';
import { AxiosPost, UserContext } from '../../../context/UserContext';
import { toast } from 'react-toastify';

function Editor() {
    const [isLoading, setIsLoading] = useState(false);
    const [value, setValue] = useState('');
    const [formData, setFormData] = useState({
        title: "",
        description: '',
        author: localStorage.getItem('fullname'),
        imagefile: null  // To store the selected file
    });
    const { user } = useContext(UserContext)

    const toolbarOptions = [
        ['bold', 'italic', 'underline', 'strike'],
        ['blockquote', 'code-block'],
        ['link', 'image', 'video', 'formula'],
        [{ 'header': 1 }, { 'header': 2 }],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'list': 'check' }],
        [{ 'script': 'sub' }, { 'script': 'super' }],
        [{ 'indent': '-1' }, { 'indent': '+1' }],
        [{ 'direction': 'rtl' }],
        [{ 'size': ['small', false, 'large', 'huge'] }],
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        [{ 'color': [] }, { 'background': [] }],
        [{ 'font': [] }],
        [{ 'align': [] }],
        ['clean'],
    ];

    const publish = async () => {
        try {
            setIsLoading(true);
            const formDataToSend = new FormData();
            formDataToSend.append('title', formData.title);
            formDataToSend.append('description', formData.description);
            formDataToSend.append('author', formData.author);
            formDataToSend.append('content', value);
            formDataToSend.append('username', localStorage.getItem('username'));
            formDataToSend.append('imagefile', formData.imagefile); // Append the file
            const data = await AxiosPost('publishBlog.php', formDataToSend)
            console.log(data)
            setIsLoading(false);
            toast.success("Blog Published Successfully.")
        } catch (error) {
            console.error('Error publishing:', error);
            setIsLoading(false);
        }
    };

    const onChangeHandler = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Function to handle file selection
    const handleFileChange = (e) => {
        setFormData({ ...formData, imagefile: e.target.files[0] });
    };

    return (
        <>
            {user == null ?

                <div className="mainContainer" style={{ minHeight: "500px" }}>
                    <div className='text-center mt-4' style={{ "width": " 100%" }}><h1>Please Login to start Contributing!</h1></div>
                </div> :
                <>
                    <div className='EditorWrapper'>
                        <div className='Editor'>
                            <ReactQuill theme="snow" id='editor' modules={{ toolbar: toolbarOptions }} value={value} onChange={setValue} />
                            <button className='btn btn-primary' data-bs-toggle="modal" data-bs-target="#PublishModal" style={{ display: "flex", margin: "10px auto" }} onClick={publish}>Publish</button>
                        </div>
                    </div>
                    <div className="modal fade" id="PublishModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h1 className="modal-title fs-5" id="exampleModalLabel">Publish</h1>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body modalbody">
                                    <div id="publishformmsg"></div>
                                    <form id="publishform">
                                        <div id="msg"></div>
                                        <label id="lUsername">Title</label>
                                        <input className="form-control" type="text" name="title" required onChange={onChangeHandler} value={formData.title} />
                                        <label id="lPassword">A two line description</label>
                                        <input type="textarea" className="form-control" name="description" required onChange={onChangeHandler} value={formData.description} />
                                        <label htmlFor="mainimage">Cover Image Link</label>
                                        <input type="file" className="form-control" name="imagefile" required onChange={handleFileChange} />
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                            <button type="submit" className="btn btn-primary" onClick={publish} disabled={isLoading}>{isLoading ? "Processing..." : "Publish"}</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            }
        </>
    );
}

export default Editor;
