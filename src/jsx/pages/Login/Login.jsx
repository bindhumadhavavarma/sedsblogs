import React, { useContext, useState } from 'react'
import './Login.css'
import { UserContext } from '../../../context/UserContext'
import { ScaleLoader } from 'react-spinners'
import { toast } from 'react-toastify'

function Login() {
    const [isLoading, setIsLoading] = useState(false)
    const inititalFormData = { username: '', password: '' }
    const [formData, setFormData] = useState(inititalFormData)
    const { loginUser, loggedInCheck } = useContext(UserContext)

    const onChangeHandler = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const Login = async (e) => {
        e.preventDefault()
        try {
            setIsLoading(true);
            const data = await loginUser(formData);
            if (data.success) {
                e.target.reset();
                await loggedInCheck();
                toast.success("Logged in successfully!")
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
            <div className='loginWrapper py-5'>
                <div className='loginForm'>
                    {isLoading ? <div className="row mx-0" style={{ height: "100%" }}><ScaleLoader color='white' cssOverride={{ "display": "flex", "justifyContent": "center", "alignItems": "center"}} /></div> :
                        <form onSubmit={Login}>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Username</label>
                                <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='username' value={formData.username} onChange={onChangeHandler} />
                                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                                <input type="password" className="form-control" id="exampleInputPassword1" name='password' value={formData.password} onChange={onChangeHandler} />
                            </div>
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </form>
                    }
                </div>
            </div>
        </>
    )
}

export default Login