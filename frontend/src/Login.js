import React, {  useState } from "react";
import "./styles.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const userLogin = async () => {
    console.log("IN USER LOGIN");
   // navigate('/sidebar')
    try {
      const response = await fetch("http://localhost:5000/users/login", {
        method: 'POST',  
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }), 
      
      });
      //navigate('/sidebar')
      console.log(response);
      if (response && response.status === 200) {
        console.log(response)
        let id = response.data;
        this.$cookies.set("cookies-id", id.token);
        this.$cookies.set("user-details", {
          id: id.id,
          user: id.user,
          P_Login_Name: id.P_Login_Name,
          status: id.status,
        });
        navigate('/sidebar')
      }
      console.log(message);
      const responseData = await response.json();
      setMessage(responseData.message); // Update state with the FList data
      toast.setMessage('Success Notification ')

    } catch (error) {
      setMessage(error.message || 'Something went wrong!');
      toast.error('Error');
      console.log("error" + error);
    }
  };


  return (
    <div className="form">
      <form >
        <div className="input-container">
          <label>Username </label>
          <input value={email} type="text" name="Email" onChange={(e) => setEmail(e.target.value)} required />

        </div>
        <div className="input-container">
          <label>Password </label>
          <input value={password} type="password" name="Password" onChange={(e) => setPassword(e.target.value)} required />

        </div>
        <div className="button-container">
          <button className="btn btn-success" onClick={userLogin}>Login</button>
          {/* <a href="/Sidebar"> Login</a> */}
        </div>
      </form>
    </div>
  );
};

export default Login;