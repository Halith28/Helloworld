import React, {useState,useEffect} from 'react';
import axios from 'axios';
import {API_BASE_URL} from '../../constants/apiContants';
// import { withRouter } from "react-router-dom";
import { useForm } from "react-hook-form";
import './Application.css';
import { useLocation, useHistory } from "react-router-dom";
import {Row, Col } from 'reactstrap';
// import TextField from '@material-ui/core/TextField';
import { Input } from 'reactstrap';
import DeleteIcon from '@material-ui/icons/Delete';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';

function Adddoctor(props) {
	
		  const [doclist, setdoclist] = useState([]);
		  const [editlist, setEditlist] = useState([]);
		  const [check, setcheck] = useState([]);
		  const [editid,setEditid] = useState();
		  const [val,setVal] = useState(0);
		  const history = useHistory();
		
			const { register, handleSubmit, errors,clearErrors,reset } = useForm({mode: "onBlur",});
			const [state , setState] = useState({
			
				successMessage: null
			})
			const location = useLocation();
			const myparam = location.state.params.id;
	

    function onSubmit(data) {
		if(val===0){
			console.log("Data submitted: ", data);
			axios.post(API_BASE_URL+'apply', data)
				.then(function (response) {
						setState(prevState => ({
							...prevState,
							'successMessage' : 'Details updated. '
						}))
						setcheck(data);
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
	const resetVal = () => {
		setEditlist([])
		reset();
	}
	useEffect(() => {
		retrieveTutorials();
	  }, [check]);
	  
	const retrieveTutorials = () => {
		axios.get(API_BASE_URL+'getloginid/'+myparam)
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
		// <div className="application">
		<div  className="cont">
				<Row>
				<Col className="app1" sm="6">
            {/* <div style={{width:"90%",margin:"0 auto"}}> */}
				<div>

				<button 
				type="button"
				style={{float:"left"}}
				className="m-3 p-1 btn btn-sm btn-info"
				onClick={() =>history.push(`/login`)}>
					<i className="fa fa-sign-out " style={{fontSize:"20px"}}></i>
					<PowerSettingsNewIcon/>
					<span className="align-top">Log Out</span>
      			</button>
				<img 
				style={{marginTop:"10px",border:"1px solid"}} 
				width="60px" 
				src={require('./medical.jpg')} alt={("")}/>
				<button 
				type="reset"
				style={{float:"right"}}
				className="m-3 p-1 btn btn-sm btn-link"
				onClick={() => resetVal()}>
					<b style={{fontSize:"16px"}}>
					<AddIcon/>
					Add New</b>
      			</button>
				</div>
				{/* <button type="reset"
				style={{float:"right",display: "block"}}
				className="m-3 btn btn-sm btn-info"
				onClick={() =>history.push(`/adddoctor`)}>
        		+Add New
      			</button> */}
				  
                <h3 style={{color:"red",textAlign:"center"}}>Doctor Registration</h3>
		<form onSubmit={handleSubmit(onSubmit)}>
					<div className="row p-1">
						<div className="col-md-3 font-weight-bold" style={{textAlign:"right"}}>
						Name:
						</div>
						<div className="col-md-5" >
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
					</div><br/>
					<div className="row p-1">
						<div className="col-md-3 font-weight-bold" style={{textAlign:"right"}}>
						Designation:
						</div>
						<div className="col-md-5" >
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
					</div><br/>
					
					<div className="row p-1">
						<div className="col-md-3 font-weight-bold" style={{textAlign:"right"}}>
						Gender:
						</div>
						<div className="col-md-5" >
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
					</div><br/>
					<div className="row p-1">
						<div className="col-md-3 font-weight-bold" style={{textAlign:"right"}}>
						Mobile No.:
						</div>
						<div className="col-md-5" >
						<input name="mobile" type="text" 
						value={editlist.mobile}
						onChange={handleChange1}
						className="form-control form-control-sm" 
						ref={register({
							required: "Enter doctor's mobile no.",
							pattern: {
							  value: /^((\+){1}91){1}[1-9]{1}[0-9]{9}$/i,
							  message: "Invalid number",
							},
						  })}></input>
						</div>
						{errors.mobile && <p className="error" style={{color:"red"}}>{errors.mobile.message}</p>}
						<div className="col-md-3">
						
						</div>
					</div><br/>
					<div className="row p-1">
						<div className="col-md-3 font-weight-bold" style={{textAlign:"right"}}>
						Specialist in:
						</div>
						<div className="col-md-5" >
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
					</div><br/>
					{
        		<input  
				name="loginid" 
				type="hidden"
				value={myparam}
				ref={register({})}>
				</input>
					}
					<div style={{margin:"5px"}}>
						<button type="submit" 
						className="btn btn-success">Save</button>
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
		<Col className="app2" sm="6" >
			<p className="card-header" style={{ backgroundColor: '#505050',color:'white',fontSize:'20px',marginTop:'10px',width:'100%'}} >
			<strong>Doctors List</strong>
		  </p>
		<table  className="table-striped table-bordered">
    		<thead>
				<tr >
				<td><b>Edit</b></td>
				<td><b>Delete</b></td>
				<td><strong>Name</strong></td>
				<td><strong>Designation</strong></td>
				<td><strong>Gender</strong></td>
        		<td><strong>Mobile.No</strong></td>
				<td><strong>Specialist in</strong></td>
				</tr>
        	
    		</thead>
			<tbody>
  			{
    		doclist.map((doctors, index) => (
        		<tr  key={doctors.id}>
				<td><button className="btn btn-info" onClick={() => editDoctor(doctors.id)} ><EditIcon/></button></td> 
				<td><button className="btn btn-warning" onClick={() => window.confirm("Are you sure wish to delete this item?") && deleteDoctor(doctors.id)}><DeleteIcon /></button></td>
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
		onClick={() => window.confirm("Are you sure wish to delete all Users?") && deleteAll()}
		>
		Remove All
		</button>
		
		</Col>
		</Row>
		{/* </div> */}
		</div>
    )
}

export default Adddoctor;