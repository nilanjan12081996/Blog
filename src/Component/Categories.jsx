// @Author Nilanjan Dasgupta
import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Footer from "./layouts/Footer"

const Categories=()=>{
const{_id}=useParams()

console.log("props",_id);
const[categoryD,setCategoryD]=useState([])
const getCategory=async()=>{
    const cate=await axios.get(`https://restapinodejs.onrender.com/api/category/post/${_id}`)
    setCategoryD(cate?.data?.data)
    console.log(cate?.data?.data);
}
useEffect(()=>{
getCategory()
},[])
return(
    <>
         <div class="card">
  
  <div class="card-body">
    {
      categoryD.map((cat)=>{
        return(
          <>
          <img src={`https://restapinodejs.onrender.com/api/blog/image/${cat._id}`} alt="pic" height={"200px"} width={"350px"} />
    <h5 class="card-title">{cat?.title}</h5>
    <p class="card-text"><div dangerouslySetInnerHTML={{__html:cat?.postText}}></div></p>
          </>
        )
      })
    }
  
  </div>
</div>

    </>
)
}
export default Categories