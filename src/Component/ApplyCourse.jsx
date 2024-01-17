// @Author Nilanjan Dasgupta
import axios from "axios"
import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { ToastContainer, toast } from "react-toastify"
import Layout from "./layouts/Layout"
import Footer from "./layouts/Footer"

const ApplyCourse = () => {
    const {_id} = useParams()
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [city, setCity] = useState("")
    const [address, setAddress] = useState("")
    const [qualification, setQualification] = useState("")
    const [programing_knowledge, setPrograming_knowledge] = useState("")
    const [experiance, setExperiance] = useState("")
    const nevigate = useNavigate()
 
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post(`https://restapinodejs.onrender.com/api/course/apply/${_id}`, {
                name,
                email,
                phone,
                city,
                address,
                qualification,
                programing_knowledge,
                experiance
            })
            if (res) {
                toast.success(res.data && res.data.message)
                console.log(res);
                nevigate("/blogs")
            }
            else{
                toast.error(res.data.message)
            }
          
        } catch (error) {
            toast.error("Something went wrong")
        }
    }

    return (
        <>
            <Layout>
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
                    <form onSubmit={handleSubmit}>
                        <h1>Apply For</h1>
                        <div className="form-group">
                            <label for="exampleInputEmail1">Name</label>
                            <input type="text" className="form-control" id="exampleInputEmail1"
                                value={name}
                                onChange={(e) => { setName(e.target.value) }}
                                placeholder="Enter Your Name"
                            />
                        </div>
                        <div className="form-group">
                            <label for="exampleInputEmail1">Email</label>
                            <input type="email" className="form-control" id="exampleInputEmail1"
                                value={email}
                                onChange={(e) => { setEmail(e.target.value) }}
                                placeholder="Enter Your Email"
                            />
                        </div>
                        <div className="form-group">
                            <label for="exampleInputEmail1">Phone</label>
                            <input type="text" className="form-control" id="exampleInputEmail1"
                                value={phone}
                                onChange={(e) => { setPhone(e.target.value) }}
                                placeholder="Enter Your Phone"
                            />
                        </div>
                        <div className="form-group">
                            <label for="exampleInputEmail1">City</label>
                            <input type="text" className="form-control" id="exampleInputEmail1"
                                value={city}
                                onChange={(e) => { setCity(e.target.value) }}
                                placeholder="Enter Your City"
                            />
                        </div>
                        <div className="form-group">
                            <label for="exampleInputEmail1">Address</label>
                            <input type="text" className="form-control" id="exampleInputEmail1"
                                value={address}
                                onChange={(e) => { setAddress(e.target.value) }}
                                placeholder="Enter Your Address"
                            />
                        </div>
                        <div className="form-group">
                            <label for="exampleInputEmail1">Qualification</label>
                            <input type="text" className="form-control" id="exampleInputEmail1"
                                value={qualification}
                                onChange={(e) => { setQualification(e.target.value) }}
                                placeholder="Enter Your Qualification"
                            />
                        </div>
                        <div className="form-group">
                            <label for="exampleInputEmail1">Programming Knowledge</label>
                            <input type="text" className="form-control" id="exampleInputEmail1"
                                value={programing_knowledge}
                                onChange={(e) => { setPrograming_knowledge(e.target.value) }}
                                placeholder="Enter Your Programming Knowledge"
                            />
                        </div>
                        <div className="form-group">
                            <label for="exampleInputEmail1">Experience</label>
                            <input type="text" className="form-control" id="exampleInputEmail1"
                                value={experiance}
                                onChange={(e) => { setExperiance(e.target.value) }}
                                placeholder="Enter Your Experience"
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">Apply</button>
                    </form>
                </div>
            </Layout>
            
        </>
    )
}
export default ApplyCourse