// @Author Nilanjan Dasgupta
import { useState } from "react"
import Layout from "./layouts/Layout"
import axios from "axios"
import { useEffect } from "react"
import "./course.css"
import { NavLink } from "react-router-dom"
import { Card, CardContent, Skeleton, Typography } from "@mui/material"
import Footer from "./layouts/Footer"

const Course = () => {
    const [course, setCourse] = useState([])
    const [loading, setLoading] = useState(true)
    const getCourse = async () => {
        const res = await axios.get("https://restapinodejs.onrender.com/api/course")
        console.log(res?.data?.Courses);
        setCourse(res?.data?.Courses)
        setLoading(false)
    }
    useEffect(() => {
        getCourse()
    },[])
    return (
        <>
            <Layout>
                <center><h1 className="heads">Courses</h1></center>
                <div class="container">
                    <div class="row">
                        {
                            loading === true ? (
                                <>
                                    <Card sx={{ minWidth: 275, marginTop:3, height: '500', p: 2 ,boxShadow:'0px 0px 30px rgba(0,0,0,0.5)'}}>
                                        <CardContent
                                            sx={{
                                                margin: '0 0 16px 0',
                                                p: 2,
                                                display: 'flex',
                                                flexDirection: 'column',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                height: 400

                                            }}>
                                                
                                                <div class="container">
                                                <div class="row">
                                            {
                                                [1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
                                                    <div key={item}
                                                        className="col-sm">
                                                        <Skeleton animation="wave" variant="rect" height={200} width={350} /> <br />
                                                        <Skeleton animation="wave" variant="rect" height={24} width={200} /><br />
                                                        <Skeleton animation="wave" variant="rect" height={10} width={50} />
                                                    </div>
                                                ))


                                            }
                                            </div>
                                            </div>



                                        </CardContent>
                                    </Card>

                                </>

                            ) : (
                                course?.map((courses) => {
                                    return (
                                        <>
                                            <div class="col-sm">
                                                <Card sx={{ minWidth: 275, marginTop:5, height: '500', p: 2,boxShadow:'0px 0px 30px rgba(0,0,0,0.4)' }}>
                                                    <CardContent
                                                        sx={{
                                                            margin: '0 0 16px 0',
                                                            p: 2,
                                                            display: 'flex',
                                                            flexDirection: 'column',
                                                            justifyContent: 'center',
                                                            alignItems: 'center',
                                                            height: 400

                                                        }}>
                                                        <Typography>
                                                            <img src={`https://restapinodejs.onrender.com/api/course/photo/${courses._id}`} class="card-img-top" alt="..." height={'200px'} width={'150px'} />
                                                        </Typography>
                                                        <Typography sx={{ mb: 2.5 }} variant="h5" component="div">
                                                            {courses?.name}
                                                        </Typography>
                                                        <Typography sx={{
                                                            fontSize: 14, mb: 1.5, display: 'flex', textAlign: 'center'
                                                        }} color="text.secondary" gutterBottom>
                                                            *{courses?.fees}
                                                        </Typography>
                                                        <Typography sx={{
                                                            fontSize: 14, mb: 1.5, display: 'flex', textAlign: 'center'
                                                        }} color="text.secondary" gutterBottom>
                                                            {courses?.requirement}
                                                        </Typography>

                                                        <NavLink to={`/course/apply/${courses._id}`} className="btn btn-success">Apply Now</NavLink>
                                                    </CardContent>

                                                </Card>
                                            </div>


                                        </>
                                    )
                                })

                            )
                        }



                    </div>
                </div>
            </Layout>
            
        </>
    )
}
export default Course