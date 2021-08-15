import React from 'react';
import axios from 'axios';

class App extends React.Component {
constructor(props){
super(props);

this.state = {
cityDate:{},
searchCity:'',
showDate:false
}
}

getLocation = async (e) => {

  e.preventDefault();


}



render(){
return (

<div>
<form onSubmit={this.getLocation}>
            <input type='text' placeholder='Enter city' name='city' />
            <button>Explore!</button>
          </form>
</div>


)
}
}


export default App;