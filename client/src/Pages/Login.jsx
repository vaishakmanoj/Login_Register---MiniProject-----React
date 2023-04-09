import { Button, Form, Input } from 'antd'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import axios from 'axios'
import { useSelector,useDispatch } from 'react-redux'

function Login() {
    const {loading}=useSelector(state =>state.alerts)
    console.log(loading)
    const navigate=useNavigate()
    const onFinish= async(values)=>{
        try {
            const response =await axios.post('/api/user/login',values)
            if(response.data.success)
            {
                toast.success(response.data.message)
                toast("Redirecting To Home Page")
                navigate('/')
                localStorage.setItem('token',response.data.data)
            }else{
                toast.error(response.data.message)
            }
        } catch (error) {
             toast.error("Something went wrong")
        }
    }

  return (
   <div className='authentication'>
    <div className='authentication-form card p-4'>
        <h1 className='card-title '>Login</h1>
        <Form layout='vertical' onFinish={onFinish}>
           <Form.Item label='Email' name='email'>
                <Input placeholder='Email'/>
           </Form.Item>
           <Form.Item label='Password' name='password'>
                <Input placeholder='Password' type='password'/>
           </Form.Item>
           <Button className='primary-button my-2' htmlType='submit'>Login</Button>
           <Link to='/register' className='anchor mt-2'>Click To Register</Link>
        </Form>
    </div>

   </div>
  )
}

export default Login