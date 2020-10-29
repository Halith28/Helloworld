import React from 'react';
import UserService from './UserService';
import { Formik, Form, Field, ErrorMessage } from 'formik';

class UserComponent extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            users:[],
            id: '',
            description: ''
        }
        this.onSubmit = this.onSubmit.bind(this)
        this.validate = this.validate.bind(this)
    }

    componentDidMount(){
        UserService.getUsers().then((response) => {
            this.setState({ users: response.data})
        });
    }
    deleteCourseClicked(id) {
        UserService.deleteCourse(id)
            .then(
                response => {
                    this.setState({ message: `Delete of course ${id} Successful` })
                    this.componentDidMount();
                }
            )

    }
    validate(values) {
        let errors = {}
        if (!values.description) {
            errors.description = 'Enter a Description'
        } else if (values.description.length < 5) {
            errors.description = 'Enter atleast 5 Characters in Description'
        }

        return errors

    }

    onSubmit(values) {
       // let username = INSTRUCTOR

        let course = {
            age: values.id,
            name: values.description

        }
  UserService.createCourse( course)
                .then( response => {
                    this.setState({ message1: `Added of stud Successful` })
                    this.componentDidMount();
                })
     
               // this.props.history.push('/regs'))
        console.log(values);
    }
    updateCourseClicked(id) {
        console.log('update ' + id)
        this.props.history.push(`/courses/${id}`)
    }

    render (){
        let { description, id } = this.state
        return (
            <div>
                <h1 className = "text-center"> Users List</h1>
                {this.state.message && <div className="alert alert-success">{this.state.message}</div>}
               
                <table className = "table table-striped table-hover">
                    <thead>
                        <tr>

                            <td> User Id</td>
                            <td>Age</td>
                            <td> User Last Name</td>
                            
                        </tr>

                    </thead>
                    <tbody>
                        {
                            this.state.users.map(
                                user => 
                               
                                <tr key = {user.id}>
                                     <td> {user.id}</td>   
                                     <td> {user.age}</td>   
                                     <td> {user.name}</td>  
                                     <td><button className="btn btn-success" onClick={() => this.updateCourseClicked(user.id)}>Update</button></td> 
                                     <td><button className="btn btn-warning" onClick={() => this.deleteCourseClicked(user.id)}>Delete</button></td>
                                </tr>
                             
                            )
                        }

                    </tbody>
                </table>
                <h3>Course</h3>
                <div className="container">
                    <Formik
                        initialValues={{ id, description }}
                        onSubmit={this.onSubmit}
                        validateOnChange={false}
                        validateOnBlur={false}
                        validate={this.validate}
                        enableReinitialize={true}
                    >
                        {
                            (props) => (
                                <Form>
                                     {this.state.message1 && <div className="alert alert-success">{this.state.message1}</div>}
                                    <ErrorMessage name="description" component="div"
                                        className="alert alert-warning" />
                                    <fieldset className="form-group">
                                        <label>Id</label>
                                        <Field className="form-control" type="text" name="id"    />
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>Description</label>
                                        <Field className="form-control" type="text" name="description" />
                                    </fieldset>
                                    <button className="btn btn-success" type="submit">Save</button>
                                </Form>
                            )
                        }
                    </Formik>

                </div>
            </div>

        )
    }
}

export default UserComponent
