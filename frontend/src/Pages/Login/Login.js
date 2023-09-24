import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';
import { useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();
    let userId;
    const [loginData, setLoginData] = useState({
        email: "",
        password: ""
    });

    const handleOnChange = (event) => {
        if (event.target.name === "userRole" && event.target.checked) {
            setLoginData({
                ...loginData,
                userRole: event.target.value 
            });
        } else {
            setLoginData({
                ...loginData,
                [event.target.name]: event.target.value
            });
        }
    }

    // handle submit
  const handleOnSubmit=(event)=>{
    event.preventDefault();
    console.log(loginData);
    axios.post('http://localhost:8000/branch/login',loginData).then((response)=>{

       
      alert(response.data.message);
      if ((response.data.message)==="Login successful") {
        userId=(response.data.user._id)
        navigate(`/home/${userId}`);
    }
    }).catch((error)=>{
      console.log(error)
    });

  }



    return (
        <div className='loginMain'>
            <div className='loginForm'>
                <form onSubmit={handleOnSubmit}>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="email" onChange={handleOnChange} />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" name="password" onChange={handleOnChange} />
                    </div>
                    <a href='/register'><p>Create Account?</p></a>
                    <button type="submit" className="btn btn-primary">Login</button>
                </form>
            </div>
        </div>
    )
}

export default Login
