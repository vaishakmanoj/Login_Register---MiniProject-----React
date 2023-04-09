import React, { useState } from 'react'
import Layout from '../Components/Layout'
import '../Pages/Profile.css'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import toast from "react-hot-toast";



const Profile = () => {
    const [image, setImage] = useState(null)
    const navigate = useNavigate()
    const { user } = useSelector((state) => state.user);
    
    const [name, setName] = useState(user?.name);
    const [email, setEmail] = useState(user?.email);
    const [showModal, setShowModal] = useState(false);
    const cloudAPI = 'dcfbzgrgb'
    const uploadProfile = async () => {
        const formData = new FormData();
        formData.append('file', image);
        formData.append('upload_preset', 'ureaug60');
        console.log(formData,'zxcxzzxczxczxccz');
        let imageUrl = null
        console.log(name,email,'yguyugu');
        await axios.post(`https://api.cloudinary.com/v1_1/${cloudAPI}/image/upload`, formData).then(async (response) => {
            console.log(response.data.secure_url,'qweweqeqwqweqwq');
            const imageUrl = response.data.secure_url
            const response1 = await axios.post("/api/user/update-profile", { imageUpdate: imageUrl,name,email},
                {
                    headers: {

                        Authorization: "Bearer " + localStorage.getItem("token"),
                    },
                })
                toast.success(response1.data.message,'hiiiiiiiiiiii');
                // setShowModal(false);
                console.log('one')
            if (response1.data.success) {
                toast.success(response1.data.message);
                setShowModal(false);
            }
            else {
                console.log('error')
            }
        })
    }
    
    const updateDetials = (e)=> {
        e.preventDefault()
         let data = new FormData(e.currentTarget);
        data = {
            name: data.get("name"),
            email: data.get("email"),
        
        };
        setShowModal(false  )
        axios.post('/api/user/update-Details',{data}, {
            headers: {

                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        })
        console.log(data);
    }
    return (
        <Layout>
            <>
                <div className="container mt-4 mb-4 p-3 d-flex justify-content-center">
                    <div className="card p-4" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1617957718587-60a442884bee?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1332&q=80)" }}>
                        <div className=" image d-flex flex-column justify-content-center align-items-center">
                            <button className="btn btn-secondary">
                                <img className='profileIMage' src={image ? URL.createObjectURL(image) : user?.image} height="100" width="100" /></button>
                            <input style={{ width: '123px' }} type="file" className="form-control" onChange={(e) => {
                                setImage(e.target.files[0])
                            }} />
                            <button onClick={uploadProfile} className='mt-2' style={{ backgroundColor: 'rgb(0, 85, 85)', color: 'white' }}>Upload Profile Picture</button>
                            <span className="name mt-3 text-success">{user?.name}</span>
                            <span className="idd">{user?.email}</span>
                            <div className="d-flex flex-row justify-content-center align-items-center gap-2">
                                {/* <span className="idd1">Oxc4c16a645_b21a</span> */}
                                <span><i className="fa fa-copy"></i></span>
                            </div> <div className="d-flex flex-row justify-content-center align-items-center mt-3">
                                <span className="number"> <span className="follow"></span>
                                </span>
                            </div>
                            <div className=" d-flex mt-2">
                                <button onClick={() => setShowModal(true)} className="btn1 btn-dark">Edit Profile</button>
                            </div> <div className="text mt-3 text-center">
                                <span>Brototype intern </span>
                            </div>
                            <div className="gap-3 mt-3 icons d-flex flex-row justify-content-center align-items-center">
                                <span><i className="fa fa-twitter"></i></span>
                                <span><i className="fa fa-facebook-f"></i></span>
                                <span><i className="fa fa-instagram"></i></span>
                                <span><i className="fa fa-linkedin"></i></span>
                            </div> <div className=" px-2 rounded mt-4 date ">
                                <span className="join">Joined {user?.createdAt.slice(0, 10)}</span>
                            </div>
                            <div>
                                {showModal && (
                                    <div className="modal">
                                        <div className="modal-content">
                                            <form onSubmit={updateDetials}>
                                                <label>Name:</label>
                                                <input type="text" name='name' defaultValue={user?.name}   />
                                                <label>Email:</label>
                                                <input type="email" name='email' defaultValue={user?.email}  />
                                                <button type="submit">Update</button>
                                            </form>
                                            <button onClick={() => setShowModal(false)} className="close-button">Close</button>
                                        </div>
                                    </div>
                                )}

                            </div>
                        </div>
                    </div>
                </div>
            </>
        </Layout>
    )
}

export default Profile