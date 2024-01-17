// @Author Nilanjan Dasgupta
import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import "./reg.css"
import Layout from "../../Component/layouts/Layout";
import { Paper } from "@mui/material";

const Register=()=>{
    const initialState={
        name:"",
        email:"",
        mobile:"",
        password:"",
        photo:""
    }
    // const[name,setName]=useState("")
    // const[email,setEmail]=useState("")
    // const[mobile,setMobile]=useState("")
    // const[password,setPassword]=useState("")
    // const[photo,setPhoto]=useState("")
    const[user,setUser]=useState(initialState)
    const[img,setImg]=useState()
    const navigate=useNavigate()
    let name,value
    const postUser=(e)=>{
        name=e.target.name
        value=e.target.value
        setUser({...user,[name]:value})
    }
    const handleSubmit=async(e)=>{
        e.preventDefault()
        let formdata=new FormData()
        formdata.append("name",user.name)
        formdata.append("email",user.email)
        formdata.append("mobile",user.mobile)
        formdata.append("password",user.password)
        formdata.append("photo",img)
        try {
            const res=await axios.post(`${process.env.REACT_APP_API}/api/register`,
           formdata
            )
            if(res && res.data.success)
            {
                toast.success(res.data && res.data.message)
                console.log(res);
                navigate('/login')
            }
                else{
                    toast.error(res.data.message)
                }
        } catch (error) {
            console.log(error);
            toast.error("Something went Wrong")
        }
    }
    return(
    <>
    <Layout>
      <center>  <Paper sx={{height:650,width:800, textAlign:'left',marginTop:2, paddingTop:3, boxShadow:'0px 0px 30px rgba(0,0,0,0.5)'}}>
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
        <img src="https://s3.ap-south-1.amazonaws.com/content.imsindia.com/ims-india/wp-content/uploads/2023/09/IPMAT-Registration-.jpg" height={'500px'} width={'400px'}/>
    </div>
    <form onSubmit={handleSubmit}>
    
  <div className="form-group">
    <label for="exampleInputEmail1">Name</label>
    <input type="text" className="form-control" id="exampleInputEmail1" 
    value={user.name}
    name="name"
    onChange={e => postUser(e)}
    placeholder="Enter Your Name"
    />
  </div>
  <div className="form-group">
    <label for="exampleInputEmail1">Email</label>
    <input type="email" className="form-control" id="exampleInputEmail1" 
    value={user.email}
    onChange={e => postUser(e)}
    name="email"
    placeholder="Enter Your Email"
    />
  </div>
  <div className="form-group">
    <label for="exampleInputEmail1">Password</label>
    <input type="password" className="form-control" id="exampleInputEmail1" 
   name="password"
   value={user.password}
    onChange={e => postUser(e)}
    placeholder="Enter Your Password"
    />
</div>
<div className="form-group">
    <label for="exampleInputEmail1">Mobile</label>
    <input type="text" className="form-control" id="exampleInputEmail1" 
    value={user.mobile}
    name="mobile"
    onChange={e => postUser(e)}
    placeholder="Enter Your Phone"
    />
  </div>
  <div class="form-group">
    <label for="exampleInputPassword1">Upload Photo</label>
    <input type="file" class="form-control"
     name="img" value={user.class}
      onChange={(e) => setImg(e.target.files[0])}
      accept="image/*"/>
      {
        img!==""&&img!==undefined&&img!==null?(
          <img
          style={{ height: "100px" }}
          src={URL.createObjectURL(img)}
          alt=""
          className="upload-img"
      />
        ):(
          <>
          {img === "" && <p>Drag or drop content here</p>}
          </>
        )
      }
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
    </div>
  


        </Paper>
        </center>
    </Layout>
   
    </>
    )
}
export default Register