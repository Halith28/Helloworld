import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {API_BASE_URL} from '../../constants/apiContants';
import '../Application/Application.css';

function SuperAdmin(props) {
	
		  const [doclist, setdoclist] = useState([]);
          const [check, setcheck] = useState("");

	useEffect(() => {
		retrieveUsers();
	  }, [check]);
	  
	  const retrieveUsers = () => {
		axios.get(API_BASE_URL+'login')
		  .then(response => {
			  console.log(response.data)
            setdoclist(response.data)
		  })
		  .catch(e => {
			console.log(e);
		  });
	  };
	  
	  
	  const accessUsers = (id) => {
		  console.log(id)
		  const url = `http://localhost:8090/api/giveaccess/`;
			axios.put(url + id)
		// axios.put(API_BASE_URL+'giveaccess/'+id)
		  .then(response => {
			
			setcheck(response.data)
			console.log(response.data)
		  })
		  .catch(e => {
			console.log(e);
		  });
	  };
	  
	  const denyUsers = (id) => {
		console.log(id)
		const url = `http://localhost:8090/api/denyaccess/`;
		  axios.put(url + id)
	  // axios.put(API_BASE_URL+'giveaccess/'+id)
		.then(response => {
		 
		  setcheck(response.data)
		  console.log(response.data)
		})
		.catch(e => {
		  console.log(e);
		});
	};

	const deleteUsers = (id) => {
		console.log(id)
		const url = `http://localhost:8090/api/deleteuser/`;
		  axios.delete(url + id)
	  // axios.put(API_BASE_URL+'giveaccess/'+id)
		.then(response => {
		 
		  setcheck(response.data)
		  console.log(response.data)
		})
		.catch(e => {
		  console.log(e);
		});
	};
      
    return(
        <div className="card col-12 col-lg-7 login-card mt-2">
            <p className="card-header" style={{ backgroundColor: '#007bff',color:'white',fontSize:'20px'}} >
			<strong>Users List</strong>
		  </p>
		  
		<table className="table-striped table-bordered" >
    		<thead >
				<tr  style={{ color:'black'}}>
				<td><strong>Access</strong></td>
				<td><strong>Deny</strong></td>
				<td><strong>Email</strong></td>
				<td><strong>Status</strong></td>
				<td><strong>Delete</strong></td>
				</tr>
        	
    		</thead>
			<tbody >
  			{
    		doclist.map((doctors, index) => (
        		<tr  key={doctors.id}>
				<td><button className="btn btn-success" onClick={() => accessUsers(doctors.id)}><i className="fa fa-edit " style={{fontSize:"16px"}}>Access</i></button></td> 
				<td><button className="btn btn-warning" onClick={() => denyUsers(doctors.id)}><i className="fa fa-trash ">Deny</i></button></td>

				<td> {doctors.email}</td>   
				<td> {doctors.access}</td>
				<td><button className="btn btn-danger" onClick={() => deleteUsers(doctors.id)}><i className="fa fa-trash ">Delete</i></button></td>
				</tr>
    			))
				}
			</tbody>
		</table>
        </div>
    )
}

export default SuperAdmin;