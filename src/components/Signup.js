import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Signup = (props) => {
    const [credentials, setCredentials] = useState({ name:" ",  email: "", password: "", })
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault(); // e.preventDefault this command stop Page From Reloading //But the Question arises that what is the problem with page reloading //e.preventDefault is used to stop the Perfomance 
        //By preventDefault() we are trying to stop the Submit so that we can get some time //It stops it's default function
        const {name,email,password} = credentials;
        const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name,email,password })
        });
        const json = await response.json(); //HERE RESPONSE WILL BE GIVEN WEB TOKEN 
        console.log(json);
        if (json.success) {
            //save the auth token and redirect
            localStorage.setItem('token', json.authtkoen);
            navigate("/");
            props.showAlert("Account Created Successfuly","success")
        }
        else {
            props.showAlert("Invalid Details","danger")
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })  //HERE SPREAD AND REST OPERATOR IS USED
    }

    return (
        <div className='container'>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" name="name" onChange={onChange} aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" onChange={onChange} aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password" onChange={onChange}  required />
                </div>
                {/* I AM NOT PUTTING CONFIRM PASSWORD  */}
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Signup
