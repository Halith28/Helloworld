import React, {useState,useEffect} from 'react';
import axios from 'axios';
import {API_BASE_URL} from '../../constants/apiContants';
import { useForm } from "react-hook-form";
import './Application.css';
import {useHistory } from "react-router-dom";

function Editdoctor(props) {
	
		  const [doclist, setdoclist] = useState([]);
		  const [editlist, setEditlist] = useState([]);
		  const [check, setcheck] = useState("");
          const [editid,setEditid] = useState();
          const history = useHistory();
            const redirectToAdddoctors = () => {
            history.push('/adddoctor');
            }
		
			const { register, handleSubmit, errors,clearErrors,reset } = useForm({mode: "onBlur",});
			
			// const {
			// 	register: register2,
			// 	errors: errors2,
			// 	handleSubmit: handleSubmit2,
			// 	reset:reset2
			//   } = useForm({
			// 	mode: "onBlur"
			//   });

	function onSubmit2(data) {
		console.log("Data submitted: ", editid);
        axios.put(API_BASE_URL+'editdoctor/'+editid, data)
            .then(function (response) {
                
					setcheck(response.data);
                    reset();
                    redirectToAdddoctors();
                    // props.showError(null)
                
            })
            .catch(function (error) {
                console.log(error);
            });
    }

	  const handleChange1 = (event) => {
        setEditlist({...editlist, [event.target.name]: event.target.value})
    }
	useEffect(() => {
		retrieveTutorials();
	  }, [check]);
	  
	  const retrieveTutorials = () => {
		axios.get(API_BASE_URL+'getall')
		  .then(response => {
			  console.log(response.data)
			setdoclist(response.data)
		  })
		  .catch(e => {
			console.log(e);
		  });
	  };
	  
	  const editDoctor = (id) => {
		console.log(id);
		setEditid(id);
		const url = `http://localhost:8090/api/getall/`;
		axios.get(url + id)
		// axios.put(API_BASE_URL+'editdoctor/'+id, id)
		  .then(response => {
			console.log(response.data);
			setEditlist(response.data);
			
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
                <h3 style={{color:"red",textAlign:"center"}}>Doctor Information</h3>
        
		<form onSubmit={handleSubmit(onSubmit2)}>
					<div className="row p-1">
						<div className="col-md-3 font-weight-bold" style={{textAlign:"right"}}>
						Name:
						</div>
						<div className="col-md-5" >
						<input 
						name="name" type="text" 
						value={editlist.name}
						onChange={handleChange1}
						className="form-control form-control-sm"
						ref={register({
							required: "Enter doctor's name",
							pattern: {
							  value: /^([a-zA-Z '-]+)$/i,
							  message: "Invalid Name",
							},
						  })}
						></input>
						</div>
						{errors.name && <p className="error" style={{color:"red"}}>{errors.name.message}</p>}
						<div className="col-md-3">
						
						</div>
					</div>
					<div className="row p-1">
						<div className="col-md-3 font-weight-bold" style={{textAlign:"right"}}>
						Designation:
						</div>
						<div className="col-md-5" >
						<input name="designation" type="text" 
						value={editlist.designation}
						
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
						<div className="col-md-5" >
						<input name="gender" type="text" 
						value={editlist.gender}
						
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
						<div className="col-md-5" >
						<input name="mobile" type="text" 
						value={editlist.mobile}
						
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
						<div className="col-md-5" >
						<input name="specialist" type="text"
						value={editlist.specialist}
						
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
					<div style={{margin:"5px"}}>						{/* <input type="submit" className="btn" value="submit"  ></input> */}
						<button type="submit" 
						className="btn btn-success">Submit</button>
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
				<td><button className="btn btn-warning" onClick={() => redirectToAdddoctors()}><i className="fa fa-trash ">Delete</i></button></td>
				<td> {doctors.name}</td>   
				<td> {doctors.designation}</td>   
				<td> {doctors.gender}</td>  
				<td> {doctors.mobile}</td>
				<td> {doctors.specialist}</td>
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

export default Editdoctor;