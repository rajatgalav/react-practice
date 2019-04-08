import React, {Component} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Button from '@material-ui/core/Button';
import Header from './Header';

function MyApp() {
    return (
      <React.Fragment>
        <CssBaseline />
        {/* The rest of your application */}
      </React.Fragment>
    );
}

class Home extends Component{
    render(){
        return(
            <div>
                <Button variant="contained" color="primary">
                Hello World
                </Button>
                <p style={{display:'inline-block'}}>kjdvksjdnv</p>
            </div>
        )
    }
}

export default Home;