// @Author Nilanjan Dasgupta
import axios from "axios"
import { useEffect, useState } from "react"
import { Navigate, useParams } from "react-router-dom"
import Layout from "./layouts/Layout"
import { Button, Paper, Skeleton, Typography } from "@mui/material"
import "./blog.css"
import { toast } from "react-toastify"
import { useAuth } from "../Context/Auth"
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import CommentIcon from '@mui/icons-material/Comment';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import Footer from "./layouts/Footer"



const Blog = () => {
  const [loading, setLoading] = useState(true);
  const { id } = useParams()
  const [blogd, setBlogd] = useState({})
  const [comment_res, setComment_res] = useState([])
  const [like, setLike] = useState([])
  const [unlike, setunLike] = useState([])
  const [islikeClicked, setIsLikeClicked] = useState(localStorage.getItem(`liked_${id}`) === 'true');
  const [isUnlikeClicked, setIsUnlikeClicked] = useState(localStorage.getItem(`unliked_${id}`) === 'true')

  const handleLike = async () => {
    try {
      if (!islikeClicked) {
        const res = await axios.put(`https://restapinodejs.onrender.com/api/blog/like/${id}`);
        setLike(res?.data.likes)
        getBlog()
        setIsLikeClicked(true)
        localStorage.setItem(`liked_${id}`, 'true');
      } else {
        toast.warn("Already Liked")
      }

    } catch (error) {
      console.error("Error liking the blog:", error);
    }
  }
  const likedData = JSON.parse(localStorage.getItem("likedData")) || {};
  //unlike
  const handleUnLike = async () => {
    try {
      if (!isUnlikeClicked) {
        const res = await axios.put(`https://restapinodejs.onrender.com/api/blog/unlike/${id}`);
        setunLike(res?.data.likes)
        getBlog()
        setIsUnlikeClicked(true)
        localStorage.setItem(`unliked_${id}`, 'true');
      } else {
        toast.warn("Already Liked")
      }

    } catch (error) {
      console.error("Error liking the blog:", error);
    }
  }
  const unlikedData = JSON.parse(localStorage.getItem("unlikedData")) || {};


  //fetch Comment
  const getComment = async () => {
    const com = await axios.get(`${process.env.REACT_APP_API}/api/comment/${id}`)
    console.log(com?.data?.post?.comment?.comments);
    setComment_res(com?.data?.post?.comment?.comments)

  }

  useEffect(() => {
    getComment()
  }, [])
  //get single blog
  const getBlog = async () => {
    const oneblog = await axios.get(`${process.env.REACT_APP_API}/api/blogdetails/${id}`)
    setBlogd(oneblog.data)
    console.log(oneblog?.data);
    setLoading(false)
  }

  useEffect(() => {
    getBlog()
  }, [])
  //load more button
  const load = 3
  const [loadMore, setLoadMore] = useState(load)
  const handleLoadMore = () => {
    setLoadMore(loadMore + load)
  }
  //comment post
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [comment, setComment] = useState("")

  const handleComment = async (e) => {
    e.preventDefault()
    try {


      const res = await axios.post(`https://restapinodejs.onrender.com/api/blog/${id}/comment/create`, {
        name,
        email,
        comment
      })
      toast.success(res?.data?.message)
      setComment("");
      setName("");
      setEmail("");
      console.log("comment add successfully");

      getComment()

    } catch (error) {
      toast.error("something went wrong")
    }
  }


  return (
    <>
      <Layout>
        {/* <div class="card">
          <div class="card-body">
            <h3 class="card-title qu">{ }</h3>
           

            <p class="card-text text"><div dangerouslySetInnerHTML={{ __html: blogd?.data?.postText }} /></p>

            <p><span>
              {
                <Button onClick={() => handleLike()}

                  disabled={islikeClicked}
                ><ThumbUpIcon /></Button>
              }
              {blogd?.data?.likes}
            </span>
              <span>
                {
                  <Button onClick={() => handleUnLike()}
                    disabled={isUnlikeClicked}
                  ><ThumbDownIcon /></Button>
                }
                {blogd?.data?.unlikes}
              </span>
              <span><CommentIcon sx={{ color: '#0339fc' }} />{comment_res?.length}</span>
            </p>




          </div>

        </div> */}

        {
          loading ? (
            <>
              {[1].map((item) => (
                <div key={item} className="col-sm">
                  <Paper sx={{ gap: 1, p: 2, borderRadius: 2, display: 'grid', margin: '0 0 16px 0' }} elevation={10}>
                    <Skeleton animation="wave" variant="rect" height={200} width={350} />
                    <Skeleton animation="wave" variant="text" width={200} height={24} />
                    <Skeleton animation="wave" variant="text" width={100} height={16} />
                  </Paper>
                </div>
              ))}
            </>
          ) : (
            <>
              <Paper
                sx={{
                  gap: 1,
                  p: 2,
                  borderRadius: 2,
                  display: 'grid',
                  marginTop:3,
                  marginBottom:3,
                  boxShadow:'0px 0px 30px rgba(0,0,0,0.5)'

                }} elevation={10}>
                <Typography variant="h6">
                  <b>{blogd?.data?.title}</b>
                </Typography>
                <Paper sx={{width:550,boxShadow:'0px 0px 30px rgba(0,0,0,0.8)'}}>
                  <img src={`https://restapinodejs.onrender.com/api/blog/image/${id}`} alt="pic" height={"380px"} width={"550px"}  />
                </Paper>
                <Typography>
                <div dangerouslySetInnerHTML={{ __html: blogd?.data?.postText }} />
                </Typography>
                <p><span>
              {
                <Button onClick={() => handleLike()}

                  disabled={islikeClicked}
                ><ThumbUpIcon /></Button>
              }
              {blogd?.data?.likes}
            </span>
              <span>
                {
                  <Button onClick={() => handleUnLike()}
                    disabled={isUnlikeClicked}
                  ><ThumbDownIcon /></Button>
                }
                {blogd?.data?.unlikes}
              </span>
              <span><CommentIcon sx={{ color: '#0565ad', marginLeft:2}} />{comment_res?.length}</span>
            </p>
              </Paper>
            </>
          )
        }


        <Paper
        sx={{
          gap: 1,
          p: 2,
          borderRadius: 2,
          display: 'grid',
          marginTop:6,
          marginBottom:3,
          boxShadow:'0px 0px 30px rgba(0,0,0,0.6)'

        }} elevation={10}
        >
                    <div class="card-body">
            <h1>Comments({comment_res?.length})</h1>
            {
              comment_res?.slice(0, loadMore)?.map((comm) => {
                return (
                  <>
                    <h3>{comm.name}</h3>
                    <p>{comm.comment}</p>
                    <p>{comm.updatedAt}<br />{comm.email}</p>

                  </>
                )
              })

            }
            {
              loadMore < comment_res.length && (
                <button
                  className='mt-4 loadMore_btn'
                  onClick={handleLoadMore}>
                  Load more
                </button>
              )
            }

          </div>
          <div class="comment-box">
            <h2>Leave a Comment</h2>
            <form onSubmit={handleComment} id="comment-form">
              <label for="exampleInputEmail1">Name</label>
              <input type="text" className="form-control" id="exampleInputEmail1"
                value={name}
                onChange={(e) => { setName(e.target.value) }}
                placeholder="Enter Your Name"
              />
              <label for="exampleInputEmail1">Email</label>
              <input type="text" className="form-control" id="exampleInputEmail1"
                value={email}
                onChange={(e) => { setEmail(e.target.value) }}
                placeholder="Enter Your Email"
              />
              <textarea id="comment" placeholder="Type your comment here" rows="4" cols="50"
                value={comment}
                onChange={(e) => { setComment(e.target.value) }}
              ></textarea>
              <button type="submit">Add Comment</button>
            </form>
          </div>
          </Paper>
      </Layout>
      

    </>
  )
}
export default Blog