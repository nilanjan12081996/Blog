// @Author Nilanjan Dasgupta
import axios from "axios"
import { useEffect, useState } from "react"
import { NavLink } from "react-router-dom"
import { Button, Form } from "react-bootstrap";
import Layout from "./layouts/Layout";
import Skeleton from '@mui/material/Skeleton';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import {  Box, List, ListItem, ListItemText, Paper, Typography } from "@mui/material";
import Footer from "./layouts/Footer";

const Blogs = () => {
  const [category, setCategory] = useState([])
  const [blogs, setBlogs] = useState([])
  const [rpost, setRpost] = useState([])
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  //for seacrching
  const filteredBlogs = blogs.filter((blog) => {
    return blog.title.toLowerCase().includes(searchQuery.toLowerCase());
  });
  const loadPost = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API}/api/letest-post`)
    console.log(res?.data);
    setRpost(res?.data?.data)
    setLoading(false);
  }
  const loadBlogs = async () => {
    const blog = await axios.get(`${process.env.REACT_APP_API}/api/allBlog`)
    setBlogs(blog?.data?.data)
    setLoading(false);

  }
  useEffect(() => {
    loadPost()
  }, [])
  useEffect(() => {
    loadBlogs()
  }, [])
  const loadcategory = async () => {
    const result = await axios.get(`${process.env.REACT_APP_API}/api/showallcategory`)
    setCategory(result?.data?.data)
    setLoading(false);
  }
  useEffect(() => {
    loadcategory()
  }, [])
  const load = 3
  const [loadMore, setLoadMore] = useState(load)
  const handleLoadMore = () => {
    setLoadMore(loadMore + load)
  }
  return (
    <>
      <Layout>
        <div class="container">
          <div class="row">
            <div class="col-sm-9">

              {/* allblogs   */}

              <div class="container">
                <div class="row">
                  {
                    <div class="col-sm">
                      {
                        loading?( 
                          <>
                    {[1, 2, 3].map((item) => (
                      <div key={item} className="col-sm">
                        <Paper sx={{ gap: 1, p: 2, borderRadius: 2, display: 'grid', margin: '0 0 16px 0' }} elevation={10}>
                          <Skeleton animation="wave" variant="rect" height={200} width={350} />
                          <Skeleton animation="wave" variant="text" width={200} height={24} />
                          <Skeleton animation="wave" variant="text" width={100} height={16} />
                        </Paper>
                      </div>
                    ))}
                  </>
                  
                        ):(
                        filteredBlogs?.slice(0, loadMore)?.map((items, keys) => {
                          const { _id } = items
                          return (
                            <>
                              <Paper sx={{
                                marginTop:4,
                                gap:1,
                                p:2,
                                borderRadius: 2,
                                display: 'grid',
                                boxShadow:'0px 0px 30px rgba(0,0,0,0.5)'
                                
                              }} elevation={10}>
                                <Typography>
                                <img src={`https://restapinodejs.onrender.com/api/blog/image/${items._id}`} alt="pic" height={"200px"} width={"350px"} />
                                </Typography>
                                <Typography variant="h6">
                               <b>{items.title}</b> 
                                </Typography>
                                <div dangerouslySetInnerHTML={{ __html: items.postText.slice(0, 300) }} />
                                  <NavLink to={`/blog/${_id}`}> <button type="button" class="btn btn-primary"> Read More</button></NavLink>
                              </Paper>
                            </>
                          )
                        })
                        )
                      }
                      {
                        loadMore < filteredBlogs.length && (
                          <Button
                            className='mt-4 loadMore_btn'
                            onClick={handleLoadMore}>
                            Load more
                          </Button>
                        )
                      }

                    </div>
                  }

                </div>
              </div>



              {/* endofallblogs */}
              {/* category starts */}
            </div>
            <div class="col-sm-3">
          <center><h1>Courses</h1></center>    

              <Form >
                
                <Form.Group >
                  <div className="input-group"> 
                    <div className="input-group-prepend">
                      <span className="input-group-text">
                        <SearchOutlinedIcon /> 
                      </span>
                    </div>
                    <Form.Control

                      type="text"
                      placeholder="Search Blogs"
                      value={searchQuery} // Step 3: Set the input value to the searchQuery state
                      onChange={(e) => setSearchQuery(e.target.value)} // Step 3: Update the searchQuery state as the user types
                    />
                  </div>

                </Form.Group>
              </Form>
              <Box sx={{boxShadow:'0px 0px 30px rgba(0,0,0,0.8)'}}>
              {
                loading?(category.map((items, keys) => (
                  <div key={keys}>
                    <Skeleton animation="wave" width={150} height={24} />
                  </div>
                ))
                ):
                (category.map((items, keys) => {

                  return (
                    <>
                   
                      <List sx={{width: '100%', maxWidth: 200, bgcolor: '',borderRadius:2,display:'grid'}}>
                        <ListItem>
                          <ListItemText primary={<NavLink to={`/category/${items?._id}`}>{items.category}</NavLink>}/>
                        </ListItem>
                      </List>
                      
                    </>
                  )
                })
                )
              }
              </Box>
              <Box sx={{ marginTop:5,boxShadow:'0px 0px 30px rgba(0,0,0,0.8)'}}>

            <center><h1>Recent Post</h1></center>  
              {
                rpost?.map((posts) => {
                  return (
                    <>
                       <List sx={{width: '100%', maxWidth: 360, bgcolor: '',borderRadius:2,display:'grid'}}>
                        <ListItem>
                          <ListItemText primary={<NavLink to={`/blog/${posts._id}`}  > <span><img src={`https://restapinodejs.onrender.com/api/blog/image/${posts._id}`} alt="pic" height={'30px'} width={'50px'} />
                          {posts.title}</span><br />{posts.updatedAt}</NavLink>}/>
                        </ListItem>
                      </List>
                    </>
                  )
                })
                
              }
              </Box>
            </div>

          </div>
        </div>
        {/* end of category */}
      </Layout>
      <Footer/>
    </>
  )
}
export default Blogs