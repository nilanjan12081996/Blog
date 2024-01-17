// @Author Nilanjan Dasgupta
import axios from "axios"
import { useEffect } from "react"
import { useState } from "react"
import Layout from "./layouts/Layout"
import "./about.css"
import { Card, CardContent, Typography } from "@mui/material"
import Footer from "./layouts/Footer"

const About = () => {
    const [about, setAbout] = useState([])
    const getAbout = async () => {
        const res = await axios.get("https://restapinodejs.onrender.com/api/team")
        console.log(res?.data?.TeamMember);
        setAbout(res?.data?.TeamMember)
    }
    useEffect(() => {
        getAbout()
    }, [])
    return (
        <>
            <Layout>
                <div class="container top">
                    <div class="row">
                        <div class="col-sm">
                            <h1 className="hd">ACHIVER:ELEVATING <br />THROUGH EDUCATION</h1>
                            <h4 className="hd1">Nuturing Exellence and Empowring Minds <br />Through Education Growth</h4>
                        </div>
                        <div class="col-sm">
                            discover the essence of achiver- a place where aspirations are nurturedbr
                            Skills are honed,and dreams finds their path and reality.discover the <br />essence of achiver- a place where aspirations are nurturedbr
                            Skills are honed,and dreams finds their path and reality.
                        </div>

                    </div>
                </div>

                <div className="team">
                    <h1>OUR TEAM</h1>
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Magni qui tenetur iure debitis enim quidem, voluptatem nam quaerat quae, facere <br />temporibus eveniet velit libero dicta numquam dolorem praesentium nesciunt repudiandae.</p>
                    <div class="container">
                        <div class="row">
                            {
                                about.map((teams) => {
                                    return (
                                        <>
                                            <div class="col-sm-4">
                                                {/* <div class="card box" style={{width: '18rem'}}>
                                                    <img src={`https://restapinodejs.onrender.com/api/team/photo/${teams._id}`} class="card-img-top" alt="..."/>
                                                        <div class="card-body">
                                                            <h5 class="card-title ">{teams.name}</h5>
                                                            <p class="card-text posi ">{teams.possession}</p>
                                                            
                                                        </div>
                                                </div> */}
                                                <Card sx={{ minWidth: 275, margin: '0 0 16px 0', height: '500', p: 2 }}>
                                                            <CardContent
                                                                sx={{
                                                                    margin: '0 0 16px 0',
                                                                    p: 2,
                                                                    display: 'flex',
                                                                    flexDirection: 'column',
                                                                    justifyContent: 'center', 
                                                                    alignItems: 'center',
                                                                    height:400

                                                                }}>
                                                                <Typography>
                                                                <img src={`https://restapinodejs.onrender.com/api/team/photo/${teams._id}`} class="card-img-top" alt="..." height={300} width={100}/>
                                                                </Typography>
                                                                <Typography sx={{ mb: 2.5 }} variant="h5" component="div">
                                                                    {teams?.name}
                                                                </Typography>
                                                                <Typography sx={{ fontSize: 14, mb: 1.5, display: 'flex',textAlign:'center'
                                                                   }} color="text.secondary" gutterBottom>
                                                                    {teams.possession}
                                                                </Typography>


                                                            </CardContent>

                                                        </Card>

                                            </div> 
                                            
                                        </>
                                    )
                                })

                            }



                        </div>
                    </div>
                </div>
            </Layout>
            
        </>
    )
}
export default About