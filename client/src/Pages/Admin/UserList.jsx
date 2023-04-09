import React, { useEffect, useState } from 'react'
import {useDispatch} from 'react-redux'
import {hideLoading,showLoading} from '../../Redux/alertsSlice'
import axios from 'axios'
import Layout from '../../Components/Layout'
import {Table} from 'react-bootstrap'
import './Userlist.css'
import toast from 'react-hot-toast'

function UserList() {

  const [users,setUser]=useState([])
  const [search,setSearch]=useState("")
  // console.log(users.filter(users=>users.name.toLowerCase().includes('')))
  const dispatch=useDispatch()
  const getUsersData= async()=>{
    try {
      dispatch(showLoading())
      const response= await axios.get('/api/admin/get-all-users',{
        headers:{
          Authorization:`Bearer ${localStorage.getItem('token')}`
        }
      })
      dispatch(hideLoading())
      if(response.data.success){
        setUser(response.data.data)
      }
    } catch (error) {
      dispatch(hideLoading())
    }
  }
  const changeUserStatus = async(record,status)=>{
      try {
        console.log(record,'111111111');
        const passId=record._id
        console.log(passId)
        dispatch(showLoading())
        const response=await axios.post('/api/admin/change-user-status',{userIdd:passId},
        {
          headers:{
              Authorization:"Bearer " + localStorage.getItem('token'),
          }
        }) 
        dispatch(hideLoading())
        if(response.data.success){
          const updateUsers=users.map((users)=>{
            if(users._id===record._id){
              return{
                ...users,
                isActive:!users.isActive,
              }
            }
            return users
          })
          setUser(updateUsers)
          toast.success(response.data.message)
        }
      } catch (error) {
          console.log('ffffffffff');
          dispatch(hideLoading())
          console.log(error);
      }
  }
  useEffect(()=>{
    getUsersData()
  },[])
  
  

const searchData = (data) => {
  return search === ""
    ? data
    : data.name.includes(search)
}

  return (
    <div>
        <Layout>
        {/* <div className="col-span-full bg-white shadow-lg rounded-sm border border-slate-200"> */}
           
           <header className="px-5 py-4 border-b border-slate-100">
               <h2 className="font-semibold text-slate-800">Users List</h2>
           </header>
           <form className="border-b border-slate-200">
               <div className="relative">
                  <input
                       onChange={(e) => {
                           let searchValue = e.target.value.toLocaleLowerCase();
                           setSearch(searchValue)
                       }}
                       className="d-flex" type="search" placeholder="Search " 
       
                        />
               </div>
           </form>
        


    <Table striped bordered hover>
      <thead>
        <tr>
          
          <th>Name</th>
          <th>Email</th>
          <th>Created At</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {users.filter(searchData).map((user)=>(
          <tr key={user._id}>
          <td>{user.name}</td>
          <td>{user.email}</td>
          <td>{user.createdAt}</td>
          <td>
            <div className='d-flex'>
              {user.isActive ? (
                <h1 className='userblock' onClick={()=>changeUserStatus(user)}>Block</h1>
              ):(
                <h1 className='userblock' onClick={()=>changeUserStatus(user)}>UnBlock</h1>
              )}
            </div>
          </td>
          </tr>
        ))}
        
      </tbody>
    </Table>
  

        {/* <div className="col-span-full bg-white shadow-lg rounded-sm border border-slate-200">
           
            <header className="px-5 py-4 border-b border-slate-100">
                <h2 className="font-semibold text-slate-800">Users List</h2>
            </header>
            <form className="border-b border-slate-200">
                <div className="relative">
                   <input
                        onChange={(e) => {
                            let searchValue = e.target.value.toLocaleLowerCase();
                            setSearch(searchValue)
                        }}
                        className="d-flex" type="search" placeholder="Search " 
        
                         />
                </div>
            </form>
            <div className="p-5 table">
               
                <div className="overflow-x-auto h-screen">
                    <table className="table-auto w-full">
                       
                        <thead className="text-xs font-semibold uppercase text-slate-400 bg-slate-50">
                            <tr>
                                <th className="p-2 whitespace-nowrap">
                                    <div className="font-semibold text-left">Name</div>
                                </th>
                                <th className="p-2 whitespace-nowrap">
                                    <div className="font-semibold text-left">Email</div>
                                </th>
                                <th className="p-2 whitespace-nowrap">
                                    <div className="font-semibold text-center">Created At</div>
                                </th>
                                <th className="p-2 whitespace-nowrap">
                                    <div className="font-semibold text-center">Actions</div>
                                </th>
                               
                            </tr>
                        </thead>
                       
                        <tbody className="text-sm divide-y divide-slate-100">
                            {
                                users.filter(searchData).map(users => {
                                    return (
                                        <tr key={users._id}>
                                            
                                            <td className="p-2 whitespace-nowrap">
                                                <div className="text-left">{users.name}</div>
                                            </td>
                                            <td className="p-2 whitespace-nowrap">
                                                <div className="text-center">{users.email}</div>
                                            </td>
                                            <td className="p-2 whitespace-nowrap">
                                                <div className="text-center">{users.createdAt}</div>
                                            </td>
                                            <td className="p-2 whitespace-nowrap">
                                                <div className="text-center"></div>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>

                </div>

            </div>
        </div> */}
        {/* <h1 className='page-header'>UserList</h1>
          <div className='search-bar'>
              <input type="text" placeholder='Search' className='seacrh' onChange={(e)=>setSearch(e.target.value)} />
              <button onClick={searchQuery}>Search</button>
              <ul className="list">
                {users.filter(users=>users.name.toLowerCase().includes(search)).map((users)=>(
                    <li key={users.id} className='listItems'>
                    {users.name}
                </li>
                ))}
                
              </ul>
          </div>
          <Table columns={columns} dataSource={users}/> */}
        </Layout>
    </div>
  )
}

export default UserList