import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {API_BASE_URL} from '../../constants/apiContants';
import { useForm } from "react-hook-form";
import './Application.css';

function Addcategory() {
	
		  const [doclist, setdoclist] = useState([]);
		  const [check, setcheck] = useState("");
		
			const { register, handleSubmit, errors,clearErrors,reset } = useForm({mode: "onBlur",});
            
    function onSubmit(data) {
		console.log("Data submitted: ", data);
        axios.post(API_BASE_URL+'savcategory', data)
            .then(function (response) {
                
					setcheck(response.data);
					reset();
                
                
            })
            .catch(function (error) {
                console.log(error);
            });
    }

	useEffect(() => {
		retrieveTutorials();
	  }, [check]);
	  
	  const retrieveTutorials = () => {
		axios.get(API_BASE_URL+'takeall')
		  .then(response => {
			  console.log(response.data)
			setdoclist(response.data)
		  })
		  .catch(e => {
			console.log(e);
		  });
	  };
	  
	  
	  const deleteCategory = (id) => {
		console.log(id);
		const url = `http://localhost:8090/api/deletecategory/`;
		axios.delete(url + id)
		// axios.delete(API_BASE_URL+'deletedoctor'+'/', id)
		  .then(response => {
			console.log(response.data);
			setcheck(response.data);
		  })
		  .catch(e => {
			console.log(e);
		  });
	  };
	  const editCategory = (id) => {
		axios.put(API_BASE_URL+'editcategory', id)
		  .then(response => {
			console.log(response.data);
		  })
		  .catch(e => {
			console.log(e);
		  });
	  };
    return(
        <div className="application">
            <div style={{width:"90%",margin:"0 auto"}}>
				{/* <img width="50px" src={require('./steth.jpg')} /> */}
				<img style={{marginTop:"10px",border:"1px solid"}} width="60px" src={require('./medical.jpg')} alt={("")}/>
                <h3 style={{color:"red",textAlign:"center"}}>Category Information</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
					<div className="row p-1">
						<div className="col-md-3 font-weight-bold" style={{textAlign:"right"}}>
						Name:
						</div>
						<div className="col-md-5" >
						<input name="name" 
						type="text" 
						value={doclist.name}
                        className="form-control form-control-sm"
                        ref={register({
							required: "Enter category name",
							pattern: {
							  value: /^([a-zA-Z '-]+)$/i,
							  message: "Invalid Data",
							},
						  })}>
						</input>
						</div>
						{errors.name && <p className="error" style={{color:"red"}}>{errors.name.message}</p>}
						<div className="col-md-3">
						
						</div>
					</div>
					<div className="row p-1">
						<div className="col-md-3 font-weight-bold" style={{textAlign:"right"}}>
						Equipment:
						</div>
						<div className="col-md-5" >
						<input name="equipment" type="text" 
						value={doclist.equipment}
						
                        className="form-control form-control-sm"
                        ref={register({
							required: "Enter equipment name",
							pattern: {
							  value: /^([a-zA-Z '-]+)$/i,
							  message: "Invalid Data",
							},
						  })}> 
						</input>
						</div>
						{errors.equipment && <p className="error" style={{color:"red"}}>{errors.equipment.message}</p>}
						<div className="col-md-3">
						</div>
					</div>
					
					<div className="row p-1">
						<div className="col-md-3 font-weight-bold" style={{textAlign:"right"}}>
						Purpose:
						</div>
						<div className="col-md-5" >
						<input name="purpose" type="text" 
						value={doclist.purpose}
						
						className="form-control form-control-sm" 
                        ref={register()}>
						</input>
						</div>
						{/* {errors.gender && <p className="error" style={{color:"red"}}>{errors.gender.message}</p>} */}
						<div className="col-md-3">
						{/* <Select label="Age" ref={register} /> */}
						</div>
					</div>
					<div className="row p-1">
						<div className="col-md-3 font-weight-bold" style={{textAlign:"right"}}>
						Lab Technician:
						</div>
						<div className="col-md-5" >
						<input name="technician_name" type="text" 
						value={doclist.technician_name}
						
                        className="form-control form-control-sm" 
                        ref={register()}>
						</input>
						</div>
						{/* {errors.mobile && <p className="error" style={{color:"red"}}>{errors.mobile.message}</p>} */}
						<div className="col-md-3">
						
						</div>
					</div>
					
					<div style={{margin:"5px"}}>
						<button type="submit" 
						className="btn btn-success">Submit</button>
						<button type="reset" 
						className="btn btn-primary"
						style={{marginLeft:"20px"}}
						onClick={() => clearErrors()}>Reset</button>
	</div>

                        </form>
			<p className="card-header" style={{ backgroundColor: '#007bff',color:'white',fontSize:'20px'}} >
			<strong>Categories List</strong>
		  </p>
		<table  style={{ backgroundColor: '#ccdfff'}}>
    		<thead>
				<tr style={{backgroundColor:'#ccddfff'}}>
				<td></td>
				<td></td>
				<td>Name</td>
				<td>Equipment Name</td>
				<td>Purpose</td>
        		<td>Lab Technician</td>
				</tr>
        	
    		</thead>
            <tbody>
  			{
    		doclist.map((doctors, index) => (
        		<tr  key={doctors.id}>
				<td><button className="btn btn-primary" onClick={() => editCategory(doclist.id)}><i className="fa fa-edit " style={{fontSize:"20px"}}></i>Edit</button></td> 
				<td><button className="btn btn-warning" onClick={() => deleteCategory(doctors.id)}><i className="fa fa-trash ">Delete</i></button></td>
				<td> {doctors.name}</td>   
				<td> {doctors.equipment}</td>   
				<td> {doctors.purpose}</td>  
				<td> {doctors.technician_name}</td>
				{/* <td><button  onClick={() => deleteDoctor(doctors.id)}></button></td>  */}
				</tr>
    			))}
                </tbody>
		</table>

		{/* <button
		className="m-3 btn btn-sm btn-danger"
		onClick={() => deleteAll(doctors.id)}
		>
		Remove All
		</button> */}
                        </div>
            
        </div>
    )
}

export default Addcategory;