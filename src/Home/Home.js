import React,{Component} from 'react';
import './Home.css'
// import Newspaper from '../Images/newpaper.jpeg'


class Home extends Component {
    render(){
        return(
            <div className="Container">
                    { <button className="button" onClick={(history)=>{this.props.history.push("/signup")}}>Register</button> }
            </div>
        )
    }
}

export default Home;