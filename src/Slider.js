import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
// import resStyles from "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import first from '../dist/public/img/1.jpeg';
import second from "../dist/public/img/2.jpeg";
import third from "../dist/public/img/3.jpeg";

const styles = {
    root: {
      flexGrow: 1,
    },
    grow: {
      flexGrow: 1,
    },
    menuButton: {
      marginLeft: -12,
      marginRight: 20,
    },
  };

const DemoCarousel = () =>{
    return(
        <Carousel showArrows={true} showStatus={true} infiniteLoop={true} autoPlay={true} stopOnHover={false} swipeable={true}>
            <div>
                <img src={first} />
                <p className="legend">Legend 1</p>
            </div>
            <div>
                <img src={second} />
                <p className="legend">Legend 2</p>
            </div>
            <div>
                <img src={third} />
                <p className="legend">Legend 3</p>
            </div>
        </Carousel>
    )
}

class Slider extends Component{
    componentDidMount(){
        console.log('did mount',this.props);
    }
    render(){
        return(
            <div>
                <DemoCarousel />
                <TextField />
            </div>
        );
    }
}

export default withStyles(styles)(Slider);