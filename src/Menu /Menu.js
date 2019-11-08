import React from 'react';
import './Menu.css'
import {Link,withRouter} from 'react-router-dom'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const isActive =(history,path) =>{
    if(history.location.pathname === path) return {color:"#FFF5F8"}
       else return {color:"#ffffff"}
}
const styles = theme => ({
  otherClass: {
    background: '#403836'
  }
});
const classes=styles();
const Menu =({history}) =>(
    <div className="root">
    <AppBar className={classes.otherClass} position="static">
      <Toolbar>
        <Typography variant="h6" className="title" onClick={()=>{history.push("/")}}>
          News
        </Typography>
        <span className="Linkdiv">
         <Link className="nav-link" style={isActive(history,"/signin")} to="/signin">Sign In</Link>
    
         <Link className="nav-link" style={isActive(history,"/signup")} to="/signup">Sign Up</Link>
         </span>
      </Toolbar>
    </AppBar>
  </div>
)

export default (withRouter(Menu));