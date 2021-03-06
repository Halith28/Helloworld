import React, {useState,useEffect} from 'react';
import axios from 'axios';
 import {API_BASE_URL} from '../constants/apiContants';
// import { withRouter } from "react-router-dom";
import { useForm } from "react-hook-form";
// import './Application.css';
import { useLocation, useHistory } from "react-router-dom";
import { Row, Col } from 'react-bootstrap';

function sam(props) {
	
		  const [doclist, setdoclist] = useState([]);
		  const [editlist, setEditlist] = useState([]);
		  const [check, setcheck] = useState("");
		  const [editid,setEditid] = useState();
		  const [val,setVal] = useState(0);
		  const history = useHistory();
		
			const { register, handleSubmit, errors,clearErrors,reset } = useForm({mode: "onBlur",});
			const [state , setState] = useState({
			
				successMessage: null
			})
			// const location = useLocation();
			// const myparam = location.state.params.myparam;
	

    function onSubmit(data) {
		if(val===0){
			console.log("Data submitted: ", data);
			 axios.post(API_BASE_URL+'apply', data)
				.then(function (response) {
						setState(prevState => ({
							...prevState,
							'successMessage' : 'Details updated. '
						}))
						setcheck(response.data);
						setEditlist([]);
						reset();
						console.log(val)
				})
		}else{
			axios.put(API_BASE_URL+'editdoctor/'+editid, data)
				.then(function (response) {
						setcheck(response.data);
						setVal(0);
						setEditlist([]);
						reset();
				})
				.catch(function (error) {
					console.log(error);
				});
		}
	}
	const handleChange1 = (event) => {
        setEditlist({...editlist, [event.target.name]: event.target.value})
	}
	useEffect(() => {
		retrieveTutorials();
	  }, [check]);
	  
	const retrieveTutorials = () => {
		axios.get(API_BASE_URL+'getloginid/')
		  .then(response => {
			setdoclist(response.data)
		  })
		  .catch(e => {
			console.log(e);
		  });
	};
	  
	const deleteDoctor = (id) => {
		const url = `http://localhost:8090/api/deletedoctor/`;
		axios.delete(url + id)
		// axios.delete(API_BASE_URL+'deletedoctor'+'/', id)
		  .then(response => {
			setcheck(response.data);
		  })
		  .catch(e => {
			console.log(e);
		  });
	};

	const deleteAll = () => {
		const url = `http://localhost:8090/api/deletedoctor/`;
		axios.delete(url)
		  .then(response => {
			setcheck(response.data);
			setEditlist(response.data);
		  })
		  .catch(e => {
			console.log(e);
		  });
	};

	const editDoctor = (id) => {
		setEditid(id);
		console.log(id)
		const url = `http://localhost:8090/api/edituser/`;
		axios.get(url + id)
		// axios.put(API_BASE_URL+'editdoctor/'+id, id)
		  .then(response => {
			setEditlist(response.data);
		  })
		  .catch(e => {
			console.log(e);
		  });
	};

    return(
        <div className="container">
            <Row p-0 >
				<Col md="5" >
                <form onSubmit={handleSubmit(onSubmit)}>
					<div className="row p-1">
						<div className="col-md-3 font-weight-bold" style={{textAlign:"right"}}>
						Name:
						</div>
						<div className="col-md-4" >
						<input 
						name="name" 
						type="text" 
						value={editlist.name}
						onChange={handleChange1}
						className="form-control form-control-sm"
						ref={register({
							required: "Enter doctor's name",
							pattern: {
							  value: /^([a-zA-Z '-]+)$/i,
							  message: "Invalid Name",
							},
						  })}></input>
						</div>
						{errors.name && <p className="error" style={{color:"red"}}>{errors.name.message}</p>}
						<div className="col-md-3">
						
						</div>
					</div>
					<div className="row p-1">
						<div className="col-md-3 font-weight-bold" style={{textAlign:"right"}}>
						Designation:
						</div>
						<div className="col-md-4" >
						<input name="designation" type="text" 
						value={editlist.designation}
						onChange={handleChange1}
						className="form-control form-control-sm" 
						ref={register({
							required: "Enter doctor's designation",
							pattern: {
							  value: /^([a-zA-Z '-]+)$/i,
							  message: "Invalid Data",
							},
						  })}></input>
						</div>
						{errors.designation && <p className="error" style={{color:"red"}}>{errors.designation.message}</p>}
						<div className="col-md-3">
						</div>
					</div>
					
					<div className="row p-1">
						<div className="col-md-3 font-weight-bold" style={{textAlign:"right"}}>
						Gender:
						</div>
						<div className="col-md-4" >
						<input name="gender" type="text" 
						value={editlist.gender}
						onChange={handleChange1}
						className="form-control form-control-sm" 
						ref={register({
							required: "Enter doctor's gender",
							pattern: {
							  value: /^(?:M|male|Male|F|female|Female)$/i,
							  message: "Invalid Data",
							},
						  })}>
						</input>
						</div>
						{errors.gender && <p className="error" style={{color:"red"}}>{errors.gender.message}</p>}
						<div className="col-md-3">
						{/* <Select label="Age" ref={register} /> */}
						</div>
					</div>
					<div className="row p-1">
						<div className="col-md-3 font-weight-bold" style={{textAlign:"right"}}>
						Mobile No.:
						</div>
						<div className="col-md-4" >
						<input name="mobile" type="text" 
						value={editlist.mobile}
						onChange={handleChange1}
						className="form-control form-control-sm" 
						ref={register({
							required: "Enter doctor's mobile number",
							pattern: {
							  value: /^((\+){1}91){1}[1-9]{1}[0-9]{9}$/i,
							  message: "Invalid number",
							},
						  })}></input>
						</div>
						{errors.mobile && <p className="error" style={{color:"red"}}>{errors.mobile.message}</p>}
						<div className="col-md-3">
						
						</div>
					</div>
					<div className="row p-1">
						<div className="col-md-3 font-weight-bold" style={{textAlign:"right"}}>
						Specialist in:
						</div>
						<div className="col-md-4" >
						<input name="specialist" type="text"
						value={editlist.specialist}
						onChange={handleChange1}
						className="form-control form-control-sm" 
						ref={register({
							required: "Enter doctor's specialist",
							pattern: {
							  value: /^([a-zA-Z '-]+)$/i,
							  message: "Invalid Data",
							},
						  })}></input>
						</div>
						{errors.specialist && <p className="error" style={{color:"red"}}>{errors.specialist.message}</p>}
						<div className="col-md-3">
						
						</div>
					</div>
					{/* {
        		<input  
				name="loginid" 
				type="hidden"
				value={myparam}
				ref={register({})}>
				</input>
					} */}
					<div className="col-md-10"  style={{margin:"5px"}}>
						<button type="submit" 
						className="btn btn-success">Submit</button>
						<button type="submit"
						style={{marginLeft:"20px"}} 
						onClick={() => setVal(val + 1)}
						className="btn btn-secondary">Update</button>
						<button type="reset" 
						className="btn btn-primary"
						style={{marginLeft:"20px"}}
						onClick={() => clearErrors()}>Reset</button>
			</div>
		</form>
                </Col>
                <Col md="7">
                <p className="card-header" style={{ backgroundColor: '#505050',color:'white',fontSize:'20px'}} >
			<strong>Doctors List</strong>
		  </p>
        <table className="table table-striped table-hover" style={{border:"solid 1px #505050"}} >
						<thead>
							<tr >
				<th></th>
				<th></th>
				<th>Name</th>
				<th>Designation</th>
				<th>Gender</th>
        		<th>Mobile.No</th>
				<th>Specialist in</th>
				</tr>
    		</thead>
			<tbody>
  			{
    		doclist.map((doctors, index) => (
        		<tr  key={doctors.id}>
				<td><button className="btn btn-primary" onClick={() => editDoctor(doctors.id)}><i className="fa fa-edit " style={{fontSize:"16px"}}>Edit</i></button></td> 
				<td><button className="btn btn-warning" onClick={() => deleteDoctor(doctors.id)}><i className="fa fa-trash ">Delete</i></button></td>
				<td> {doctors.name}</td>   
				<td> {doctors.designation}</td>   
				<td> {doctors.gender}</td>  
				<td> {doctors.mobile}</td>
				<td> {doctors.specialist}</td>
				</tr>
    			))}
				</tbody>
		</table>

		<button
		className="m-3 btn btn-sm btn-danger"
		onClick={() => deleteAll()}
		>
		Remove All
		</button>
                </Col>
            </Row>
            <div >
				<div>
				<button type="button"
				style={{float:"right"}}
				className="m-3 btn btn-sm btn-info"
				onClick={() =>history.push(`/login`)}>
        			Log Out
      			</button></div>
                <h3 style={{color:"red",textAlign:"center"}}>Doctor Information</h3>
		<form onSubmit={handleSubmit(onSubmit)}>
					<div className="row p-1">
						<div className="col-md-3 font-weight-bold" style={{textAlign:"right"}}>
						Name:
						</div>
						<div className="col-md-4" >
						<input 
						name="name" 
						type="text" 
						value={editlist.name}
						onChange={handleChange1}
						className="form-control form-control-sm"
						ref={register({
							required: "Enter doctor's name",
							pattern: {
							  value: /^([a-zA-Z '-]+)$/i,
							  message: "Invalid Name",
							},
						  })}></input>
						</div>
						{errors.name && <p className="error" style={{color:"red"}}>{errors.name.message}</p>}
						<div className="col-md-3">
						
						</div>
					</div>
					<div className="row p-1">
						<div className="col-md-3 font-weight-bold" style={{textAlign:"right"}}>
						Designation:
						</div>
						<div className="col-md-4" >
						<input name="designation" type="text" 
						value={editlist.designation}
						onChange={handleChange1}
						className="form-control form-control-sm" 
						ref={register({
							required: "Enter doctor's designation",
							pattern: {
							  value: /^([a-zA-Z '-]+)$/i,
							  message: "Invalid Data",
							},
						  })}></input>
						</div>
						{errors.designation && <p className="error" style={{color:"red"}}>{errors.designation.message}</p>}
						<div className="col-md-3">
						</div>
					</div>
					
					<div className="row p-1">
						<div className="col-md-3 font-weight-bold" style={{textAlign:"right"}}>
						Gender:
						</div>
						<div className="col-md-4" >
						<input name="gender" type="text" 
						value={editlist.gender}
						onChange={handleChange1}
						className="form-control form-control-sm" 
						ref={register({
							required: "Enter doctor's gender",
							pattern: {
							  value: /^(?:M|male|Male|F|female|Female)$/i,
							  message: "Invalid Data",
							},
						  })}>
						</input>
						</div>
						{errors.gender && <p className="error" style={{color:"red"}}>{errors.gender.message}</p>}
						<div className="col-md-3">
						{/* <Select label="Age" ref={register} /> */}
						</div>
					</div>
					<div className="row p-1">
						<div className="col-md-3 font-weight-bold" style={{textAlign:"right"}}>
						Mobile No.:
						</div>
						<div className="col-md-4" >
						<input name="mobile" type="text" 
						value={editlist.mobile}
						onChange={handleChange1}
						className="form-control form-control-sm" 
						ref={register({
							required: "Enter doctor's mobile number",
							pattern: {
							  value: /^((\+){1}91){1}[1-9]{1}[0-9]{9}$/i,
							  message: "Invalid number",
							},
						  })}></input>
						</div>
						{errors.mobile && <p className="error" style={{color:"red"}}>{errors.mobile.message}</p>}
						<div className="col-md-3">
						
						</div>
					</div>
					<div className="row p-1">
						<div className="col-md-3 font-weight-bold" style={{textAlign:"right"}}>
						Specialist in:
						</div>
						<div className="col-md-4" >
						<input name="specialist" type="text"
						value={editlist.specialist}
						onChange={handleChange1}
						className="form-control form-control-sm" 
						ref={register({
							required: "Enter doctor's specialist",
							pattern: {
							  value: /^([a-zA-Z '-]+)$/i,
							  message: "Invalid Data",
							},
						  })}></input>
						</div>
						{errors.specialist && <p className="error" style={{color:"red"}}>{errors.specialist.message}</p>}
						<div className="col-md-3">
						
						</div>
					</div>
					{/* {
        		<input  
				name="loginid" 
				type="hidden"
				value={myparam}
				ref={register({})}>
				</input>
					} */}
					<div style={{margin:"5px"}}>
						<button type="submit" 
						className="btn btn-success">Submit</button>
						<button type="submit"
						style={{marginLeft:"20px"}} 
						onClick={() => setVal(val + 1)}
						className="btn btn-secondary">Update</button>
						<button type="reset" 
						className="btn btn-primary"
						style={{marginLeft:"20px"}}
						onClick={() => clearErrors()}>Reset</button>
			</div>
			
		</form>
			<p className="card-header" style={{ backgroundColor: '#007bff',color:'white',fontSize:'20px'}} >
			<strong>Doctors List</strong>
		  </p>
		<table  style={{ backgroundColor: '#ccdfff'}}>
    		<thead>
				<tr style={{backgroundColor:'#ccddfff'}}>
				<td></td>
				<td></td>
				<td>Name</td>
				<td>Designation</td>
				<td>Gender</td>
        		<td>Mobile.No</td>
				<td>Specialist in</td>
				</tr>
        	
    		</thead>
			<tbody>
  			{
    		doclist.map((doctors, index) => (
        		<tr  key={doctors.id}>
				<td><button className="btn btn-primary" onClick={() => editDoctor(doctors.id)}><i className="fa fa-edit " style={{fontSize:"16px"}}>Edit</i></button></td> 
				<td><button className="btn btn-warning" onClick={() => deleteDoctor(doctors.id)}><i className="fa fa-trash ">Delete</i></button></td>
				<td> {doctors.name}</td>   
				<td> {doctors.designation}</td>   
				<td> {doctors.gender}</td>  
				<td> {doctors.mobile}</td>
				<td> {doctors.specialist}</td>
				</tr>
    			))}
				</tbody>
		</table>

		<button
		className="m-3 btn btn-sm btn-danger"
		onClick={() => deleteAll()}
		>
		Remove All
		</button>
                        </div>
            
        </div>
    )
}

export default sam;