// @Author Nilanjan Dasgupta
import { useEffect, useState } from "react"
import Layout from "../Component/layouts/Layout"
import axios from "axios"
import { Carousel } from 'react-responsive-carousel'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import './home.css'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { Card, CardContent, Paper, Typography } from "@mui/material";
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import Footer from "../Component/layouts/Footer";


const Home = () => {

    const [banner, setBanner] = useState([])
    const [service, setService] = useState([])
    const [testi, setTesti] = useState([])
    const [loading, setLoading] = useState(true)

    const getBanner = async () => {
        try {
            const res = await axios.get("https://restapinodejs.onrender.com/api/banner")
            setBanner(res?.data?.bannerdata)
            console.log(res?.data?.bannerdata);
            setLoading(false)
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getBanner()
    }, [])
    const getService = async () => {
        const ser = await axios.get("https://restapinodejs.onrender.com/api/service")
        console.log(ser?.data?.data);
        setService(ser?.data?.data)
        setLoading(false)
    }
    useEffect(() => {
        getService()
    }, [])

    const getTesti = async () => {
        const test = await axios.get("https://restapinodejs.onrender.com/api/testimonial")
        console.log(test?.data?.testimonials);
        setTesti(test?.data?.testimonials)
        setLoading(false)
    }
    useEffect(() => {
        getTesti()
    }, [])
    return (
        <>
            <Layout>
                {
                        loading===true?(

                                <Skeleton animation="wave" variant="rect" height={500} width={'100%'} />
                                    
                        ):(   
                            <Carousel>

                            {
                                banner?.map((ban) => {
                                    return (
                                        <>
                                            <div>
                                                <img src={`https://restapinodejs.onrender.com/api/banner/photo/${ban._id}`} height={'700px'} width={'100%'} alt="pic" />
        
                                                <p className="legend">
                                                    <h1>{ban?.title}</h1>
                                                    <p>{ban?.description}</p>
                                                </p>
        
                                            </div>
                                        </>
                                    )
                                })
                            }
                        </Carousel>)
                }
             



                {/* Service */}
                {
                    loading === true ? (    
                         <>
                     <div class="container">
                                <div class="row">
                        {[1, 2, 3,4,5,6].map((item) => (
                          <div key={item} 
                          className="col-sm">
                            
                              <Skeleton animation="wave" variant="rect" height={400} width={400} />
                                                          
                          </div>
                          
                          
                        ))}
                        </div>
                          </div>
                     </>) : (
                        <div className="Service">

                            <div class="container">
                                <div class="row">
                                    {
                                        service?.map((items) => {
                                            return (
                                                <>
                                                    <div class="col-sm">
                                                        <Card sx={{ minWidth: 275, margin: '0 0 16px 0', height: '500', p: 2 }}>
                                                            <CardContent
                                                                sx={{
                                                                    margin: '0 0 16px 0',
                                                                    p: 2,
                                                                    display: 'flex',
                                                                    flexDirection: 'column',
                                                                    justifyContent: 'center', 
                                                                    alignItems: 'center',

                                                                }}>
                                                                <Typography sx={{ mb: 4.1, color: 'blue' }}>
                                                                    <LanguageOutlinedIcon />
                                                                </Typography>
                                                                <Typography sx={{ mb: 2.5 }} variant="h5" component="div">
                                                                    {items?.name}
                                                                </Typography>
                                                                <Typography sx={{ fontSize: 14, mb: 1.5, display: 'flex',textAlign:'center'
                                                                   }} color="text.secondary" gutterBottom>
                                                                    {items?.details?.slice(0, 50)}
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

                    )
                }


                {/* Testimonial */}

                <div className="testimonial">

                    <center>
                        <h1>TESTIMONIAL</h1>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi</p>
                        <div class="container">
                            <div class="row">

                                {
                                    testi.map((items) => {
                                        return (
                                            <>
                                                <div class="col-sm-6">
                                                    
                                                    <Paper  sx={{
                                gap:1,
                                p:2,
                                borderRadius: 2,
                                display: 'flex',
                                flexDirection:'Row',
                                margin: '0 0 16px 0',
                                height:290
                                
                              }} elevation={10}>
                                                        <Typography>
                                                        <img src={`https://restapinodejs.onrender.com/api/testimonials/photo/${items._id}`} alt="" height={'70px'} width={'70px'} />
                                                        </Typography>
                                                        <Typography sx={{
                                                            gap:3,
                                                            margin:'0  16px 0',
                                                            textAlign:'left',
                                                            mb:2.5
                                                        }} variant="h5">
                                                        {items.name}<br/>
                                                        <Typography color="text.secondary">
                                                        {items.position}
                                                        </Typography>
                                                        <Typography color="text.secondary">
                                                        {items.talk}
                                                        </Typography>
                                                        </Typography>
                                                        
                                                    </Paper>
                                                    
                                                </div>

                                            </>
                                        )
                                    })
                                }

                            </div>
                        </div>
                    </center>


                </div>
            </Layout>
            
        </>
    )
}
export default Home