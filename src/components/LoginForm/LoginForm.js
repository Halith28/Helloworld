import React, {useState} from 'react';
import axios from 'axios';
import './LoginForm.css';
import {API_BASE_URL} from '../../constants/apiContants';
import { withRouter } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
// import Button from '@material-ui/core/Button';
// import { makeStyles } from '@material-ui/core/styles';
// import TextField from '@material-ui/core/TextField';

function LoginForm(props) {
    const { register, handleSubmit, errors } = useForm({mode: "onBlur",});
    const [inputVal, setInputVal] = useState("abdul@gmail.com");
    const history = useHistory();

    // const useStyles = makeStyles((theme) => ({
    //     form: {
    //         width: '100%', // Fix IE 11 issue.
    //         marginTop: theme.spacing(1),
    //       },
			
    //     submit: {
    //       margin: theme.spacing(3, 0, 2),
    //     },
    //   }));
    
    const [state , setState] = useState({
      
        successMessage: null
    })
    function onSubmit(data) {
        console.log("Data submitted: ", data);
        axios.put(API_BASE_URL+'logg', data)
            .then(function (response) {
                if(response.data === inputVal){
                    setState(prevState => ({
                        ...prevState,
                        'successMessage' : 'Login successful. Redirecting to home page..'
                    }))
                    redirectToAdmin();
                    props.showError(null)
                }
                else if(response.data === data.email){
                    axios.put(API_BASE_URL+'checkuser', data)
		            .then(response => {
                        if(response.data===1){
                            console.log(data)
                            axios.put(API_BASE_URL+'loginid', data)
                            .then(response => {
                                const id=response.data
                                console.log(response.data)
                                // history.push(`/home`,{params:{id}})
                                history.push(`/Doctors-Database`,{params:{id}})
                                props.showError(null)
                            })
                        }else{
                            props.showError("Ask Admin to access login");
                            
                        }
		        })
                }
                else{
                    props.showError("Username does not exists");
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    const redirectToRegister = () => {
        props.history.push('/register'); 
        props.updateTitle('Register');
    }
    const redirectToAdmin = () => {
        props.history.push('/adminaccess'); 
        props.updateTitle('Admin');
    }
    // const RequestAccess = (data) => {
	// 	const url = `http://localhost:8090/api/deletedoctor/`;
	// 	axios.post(url, id)
	// 	  .then(response => {
	// 		alert('Request has been submitted');
	// 	  })
	// 	  .catch(e => {
	// 		console.log(e);
	// 	  });
	// };


    return(
        <div className="card col-12 col-lg-4 login-card mt-2 hv-center">
            <form onSubmit={handleSubmit(onSubmit)}>
            {/* <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          /> */}
                <div className="form-group text-left">
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input type="email" 
                        name="email"
                       className="form-control" 
                       id="email" 
                       aria-describedby="emailHelp" 
                       placeholder="Type email" 
                       ref={register({
                        required: "Enter your e-mail",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                          message: "Enter a valid e-mail address",
                        },
                      })}
                />
                {errors.email && <p className="error" style={{color:"red"}}>{errors.email.message}</p>}
                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
         <div className="form-group text-left">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input type="password" 
                        name="password"
                       className="form-control" 
                       id="password" 
                       placeholder="Type Password"
                       ref={register({ required: "Enter your password" })}
                />
                {errors.password && <p className="error" style={{color:"red"}}>{errors.password.message}</p>}
                </div>
                <div className="form-check">
                </div>
                <button 
                    type="submit" 
                    className="btn btn-primary"
                >Submit</button>
                {/* <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className="submit">
                    Submit
                </Button> */}
            </form>
            <div className="alert alert-success mt-2" style={{display: state.successMessage ? 'block' : 'none' }} role="alert">
                {state.successMessage}
            </div>
            <div className="registerMessage">
                <span>Dont have an account? </span>
                <span className="loginText" onClick={() => redirectToRegister()}>Register</span> <br/>
                
            </div>
            
        </div>
    )
}

export default withRouter(LoginForm);

