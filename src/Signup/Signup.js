import React,{Component} from 'react';
import './Signup.css'
import axios from 'axios';
import {Link} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

class Signup extends Component{
   constructor(){
       super()
        this.state={
            firstName:"",
            lastName:"",
            email:"",
            password:"",
            success:false,
            error:""
        }
   }
   handleChange = name => event => {
    this.setState({error:""})
    this.setState({[name]:event.target.value});
  }
  onSubmit=event=>{
      event.preventDefault()
      const {firstName,lastName,email,password}=this.state;
      axios.post('http://localhost:3002/user/signup',{firstName,lastName,email,password})
      .then(response=>{
          if(response.status === 200){
            console.log(response)
            this.setState({success:true,message:response.data.message})
          } else {
              this.setState({success:false,message:response.data.message})
          }
      })
    }
   render(){
     return(
       <div className="signupcontainer">
           <div className="signuplayout">
             <p className="title">Sign up</p>
             <span className="jss44S"></span>
             <p><Link class="nav-link" to="/signin">Already have an account?</Link></p>
                 <div>
                 <TextField
                        className={"textField"}
                        label="Firstname"
                        margin="normal"
                        variant="outlined"
                        onChange={this.handleChange("firstName")}
                        value={this.state.firstName}
                        />
                        <span>  </span>
                          <TextField
                        className={"textField"}
                        label="Lastname"
                        margin="normal"
                        variant="outlined"
                        onChange={this.handleChange("lastName")}
                        value={this.state.lastName}
                        />
                 </div>
                 <div className="emailcontainer">
                 <TextField
                        className={"textField"}
                        label="Email"
                        margin="normal"
                        variant="outlined"
                        onChange={this.handleChange("email")}
                        value={this.state.email}
                        />
                 </div>
                  <div className="passwordcontainer">
                  <TextField
                        className={"textField"}
                        label="Password"
                        margin="normal"
                        variant="outlined"
                        onChange={this.handleChange("password")}
                        value={this.state.password}
                        />
                  </div>
                  <div>
                  <Button variant="outlined" color="secondary" onClick={this.onSubmit}>
                            SIGN UP
                        </Button>
                  </div>
                  
          </div>
       </div>
     )
   }
  }

export default Signup;