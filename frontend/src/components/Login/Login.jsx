import React, { useState,  } from 'react'
import { useNavigate } from "react-router-dom";

function Login() {

    const [userDetails, setUserDetails] = useState({email: '', password:''});
    let navigate = useNavigate();

    const onChange = (e) => {
        setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
      };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch('http://localhost:5000/api/auth/login', {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({email: userDetails.email, password: userDetails.password}),
          });

        const json = await response.json();
        console.log(json);

        if(json.success){
            localStorage.setItem('token', json.authToken)
            navigate('/');
        }
        else{
            alert('Invalid Details');
        }

    }

    return (
        <div>
            <form  onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label for="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name='email' value={userDetails.email} onChange={onChange} aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text" >We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label for="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name='password' value={userDetails.password} onChange={onChange} />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Login