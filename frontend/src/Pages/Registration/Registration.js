import React,{useState} from 'react'
import axios from 'axios'
import './Registration.css';

function Registration() {

    const [RegistrationData, setRegistrationData] = useState({
        headBranch:"",
        userBranch:"", 
        userRole:"",   
        email: "",
        password: ""
    });

    const handleOnChange = (event) => {
        if (event.target.name === "userRole" && event.target.checked) {
            setRegistrationData({
                ...RegistrationData,
                userRole: event.target.value 
            });
        } else {
            setRegistrationData({
                ...RegistrationData,
                [event.target.name]: event.target.value
            });
        }
    }

    // handle submit
  const handleOnSubmit=(event)=>{
    event.preventDefault();
    axios.post('http://localhost:8000/branch/register',RegistrationData).then((response)=>{
      alert(response.data.message);
    }).catch((error)=>{
      console.log(error.data)
    });

  }



    return (
        <div className='loginMain'>
            <div className='loginForm'>
                <form onSubmit={handleOnSubmit}>
                    <div className='radioButtons'>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="userRole" id="branch" value="Branch" onChange={handleOnChange} />
                            <label className="form-check-label" htmlFor="branch">
                                Branch
                            </label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="userRole" id="company" value="Company" onChange={handleOnChange} />
                            <label className="form-check-label" htmlFor="company">
                                Head Branch
                            </label>
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Head Branch</label>
                        <input type="text" className="form-control" id="headBranch" aria-describedby="emailHelp" name="headBranch" onChange={handleOnChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Sub Branch</label>
                        <input type="text" className="form-control" id="userBranch" aria-describedby="emailHelp" name="userBranch" onChange={handleOnChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email Address</label>
                        <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="email" onChange={handleOnChange} />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" name="password" onChange={handleOnChange} />
                    </div>
                    <a href='/'><p>Login?</p></a>
                    <button type="submit" className="btn btn-primary">Register</button>
                </form>
            </div>
        </div>
    )
}



  


export default Registration