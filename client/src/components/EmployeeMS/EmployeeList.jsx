import React, { useEffect, useState } from 'react'
import '../Styles/EmployeeList.css'
import { Link } from 'react-router-dom'
import axios from 'axios'

const EmployeeList = () => {
      const [empData, setEmpData] = useState([])

      useEffect(() => {
            axios.get('http://localhost:3009')
                  .then(res => setEmpData(res.data))
                  .catch(err => console.log(err))
      }, [])

      const handleDelete =(id)=>{
            axios.delete('http://localhost:3009/deleteData/' + id)
            .then(res=>{console.log(res.data)
                  window.location.reload()
            })
            .catch(err=>console.log(err))
      }
      return (
            <div>

                  <div className="col p-0 m-0">
                        <div className='p-2 d-flex justify-content-center shadow employee_list_text'>
                              <h3 className='text-white'>Employee-List</h3>
                        </div>
                  </div>

                  <div className='m-4 add_btn'>
                        <Link to='/dashboard/addEmployee' className='btn btn-primary'>
                              Add Employee<i className="bi bi-person-plus-fill align-middle add_icon"></i>
                        </Link>
                  </div>
                  <div className='m-4'>
                        <table className="table table-success table-striped table-bordered table-hover">
                              <thead className='table table-dark'>
                                    <tr>
                                          <th scope="col">ID</th>
                                          <th scope="col">Profile</th>
                                          <th scope="col">Name</th>
                                          <th scope="col">Email</th>
                                          <th scope="col">Mobile No</th>
                                          <th scope="col">Designation</th>
                                          <th scope="col">Gender</th>
                                          <th scope="col">Course</th>
                                          <th scope="col">Joining Date</th>
                                          <th scope="col">Action</th>
                                    </tr>
                              </thead>
                              <tbody>
                                    {empData.map((item, i) => {
                                          return (
                                                <tr key={i}>
                                                      <th scope="row">{i + 1}</th>
                                                      <td>{item.image}</td>
                                                      <td>{item.name}</td>
                                                      <td>{item.email}</td>
                                                      <td>{item.mobile}</td>
                                                      <td>{item.desg}</td>
                                                      <td>{item.gen}</td>
                                                      <td>{item.course}</td>
                                                      <td>{item.date}</td>
                                                      <td>
                                                            <Link to={`/dashboard/updateEmployee/${item._id}`} className='btn btn-dark btn-sm mx-2'>Edit</Link>
                                                            <button className='btn btn-danger btn-sm' onClick={(e)=>handleDelete(item._id)}>Delete</button>
                                                      </td>
                                                </tr>
                                          )
                                    })}
                              </tbody>
                        </table>
                  </div>
            </div>
      )
}

export default EmployeeList