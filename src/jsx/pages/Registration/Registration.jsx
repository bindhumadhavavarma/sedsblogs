import React, { useState } from 'react'
import { AxiosPost } from '../../../context/UserContext'
import { ScaleLoader } from 'react-spinners'
import '../Login/Login.css'
import { toast } from 'react-toastify'

function Registration() {
    const [isLoading, setIsLoading] = useState(false)
    const inititalFormData = { username: '', fullname: '', email: '', password: '' }
    const [formData, setFormData] = useState(inititalFormData)

    const onChangeHandler = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const Register = async (e) => {
        e.preventDefault()
        try {
            setIsLoading(true);
            const data = await AxiosPost("signUp.php", formData);
            if (data.success) {
                setFormData(inititalFormData)
                toast.success("User Registration Successfull")
            }
            else {
                toast.error(data.error)
            }
        } catch {
            toast.error("Server Error!")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <>
            <div className='loginWrapper py-5' >
                <div className='loginForm' style={{maxWidth:"800px"}}>
                    {isLoading ? <div className="row mx-0" style={{ height: "100%" }}><ScaleLoader color='white' cssOverride={{ "display": "flex", "justifyContent": "center", "alignItems": "center" }} /></div> :
                        <form onSubmit={Register}>
                            <div className='row'>
                                <div className='col-md-6'>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail1" className="form-label">User Name</label>
                                        <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='username' value={formData.username} onChange={onChangeHandler} required />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail1" className="form-label">Full Name</label>
                                        <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='fullname' value={formData.fullname} onChange={onChangeHandler} required />
                                    </div>

                                </div>
                                <div className='col-md-6'>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='email' value={formData.email} onChange={onChangeHandler} required />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                                        <input type="password" className="form-control" id="exampleInputPassword1" name='password' value={formData.password} onChange={onChangeHandler} required />
                                    </div>

                                </div>
                            </div>
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </form>
                    }
                </div>
            </div>
        </>
    )
}

export default Registration