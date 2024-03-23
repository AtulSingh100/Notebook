import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = (props) => {
  const [credentials, setCredentials] = useState({ email: "", password: "" })
  let navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault(); // e.preventDefault this command stop Page From Reloading //But the Question arises that what is the problem with page reloading //e.preventDefault is used to stop the Perfomance 
    //By preventDefault() we are trying to stop the Submit so that we can get some time //It stops it's default function
    const response = await fetch(`http://localhost:5000/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: credentials.email, password: credentials.password })
    });
    const json = await response.json(); //HERE RESPONSE WILL BE GIVEN WEB TOKEN 
    console.log(json);
    if(json.success){
      //save the auth token and redirect
      localStorage.setItem('token',json.authtoken);
      props.showAlert("Logged in Successfuly","success")
      navigate("/");
    }
    else{
      props.showAlert("Invalid Credentials","danger")
    }
  }

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })  //HERE SPREAD AND REST OPERATOR IS USED
  }
  return (
    <div>
      <form onSubmit={handleSubmit} >
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input type="email" className="form-control" value={credentials.email} onChange={onChange} id="email" name="email" aria-describedby="emailHelp" />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" value={credentials.password} onChange={onChange} name="password" id="password" />
        </div>
        <button type="submit" className="btn btn-primary" > Submit</button>
      </form>
    </div>
  )
}

export default Login
