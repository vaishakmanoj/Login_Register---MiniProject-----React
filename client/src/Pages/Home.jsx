import React, { useEffect } from 'react'
import axios from 'axios'
import Layout from '../Components/Layout'
import { useDispatch,useSelector } from 'react-redux'
import { setUser } from '../Redux/userSlice'

function Home() {
  const Dipatch = useDispatch()
  let {user} = useSelector((state) => state.user);
  const getData=async()=>{
    try {
      const response =await axios.post('/api/user/get-user-info-by-id',{},
      {
          headers :{
            Authorization : "Bearer "+ localStorage.getItem("token"),
          },
      })
      Dipatch(setUser(response))
      // console.log(response.data)
    } catch (error) {
        // console.log(error)
    }
  }
  useEffect(()=>{
    getData()
  },[])
  return (
    <Layout>
      <h1>Homepage</h1>
    </Layout>
  )
}

export default Home