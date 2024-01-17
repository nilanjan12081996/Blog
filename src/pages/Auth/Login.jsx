// @Author Nilanjan Dasgupta
import { useState } from "react"
import { useAuth } from "../../Context/Auth"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import Layout from "../../Component/layouts/Layout"
import { ToastContainer, toast } from "react-toastify"
import { Paper } from "@mui/material"
import "./reg.css"

const Login=()=>{
    const[email,setEmail]=useState("")
    const[password,setPassword]=useState("")
    const[auth,setAuth]=useAuth()
    const nevigate=useNavigate()
    const handlesubmit=async(e)=>{
        e.preventDefault()
        try {
            const res=await axios.post(`${process.env.REACT_APP_API}/api/login`,{
                email,
                password
            })
            if(res.data && res.data.status)
            {
                toast.success(res.data && res.data.message)
                setAuth({
                    ...auth,
                    user:res.data.user,
                    token: res.data.token
                })
                console.log(res);
                nevigate('/')
                localStorage.setItem("auth",JSON.stringify(res.data))
            }
            else{
                toast.error(res.data.message)
            }
       
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong")
        }
    }
    return(
    <>
    <Layout>
    <center>  <Paper sx={{height:340,width:800, textAlign:'left',marginTop:7, paddingTop:3, boxShadow:'0px 0px 30px rgba(0,0,0,0.8)'}}>
    <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                icon={true}
            />
    <div className="main">
    <div className="pic">
        <img src="https://sales.webtel.in/images/Login-page-character1.png" height={'300px'} width={'350px'}/>
    </div>
    <form onSubmit={handlesubmit}>
   
  <div class="form-group">
    <label for="exampleInputEmail1">Email </label>
    <input type="email" class="form-control" id="exampleInputEmail1" 
    aria-describedby="emailHelp"
    value={email}
    onChange={(e)=>{setEmail(e.target.value)}}
    placeholder="Enter Your Email"
    />
     </div>
  <div class="form-group">
    <label for="exampleInputPassword1">Password</label>
    <input type="password" class="form-control" id="exampleInputPassword1"
    value={password}
    onChange={(e)=>setPassword(e.target.value)}
    placeholder="Enter Your Password"
    
    />
  </div>
  <button type="submit" class="btn btn-primary">Login</button>
  <Link to='/register'>Don't Have Account?Register Here</Link>
</form>
    </div>
    </Paper>
    </center>
    </Layout>
   
  
    </>
    )
}
export default Login