import React, { Component } from 'react'
import GoogleLogin from 'react-google-login'
export class App extends Component{

  responseGoogle=(response)=>{
    console.log(response)
    console.log(response.profileObj)
  }


  render(){
    return(
      
      <html>
        <body>
          <div>
            <h1  className = "center"> Hello Welcome to Second Brain!</h1>
            <br></br>
            <p1 className = "center"> Please login through your google account!</p1>
          </div>
          <br></br>
          <br></br>
          
          <div className = "center">
            
            
            <GoogleLogin 
            clientId="701759415966-4f207edrmc6nfi5q11ghsp0dgshdf7k4.apps.googleusercontent.com"
            buttonText="Google Login"
            {this.responseGoogle}
            onSuccess={localStorage.setItem('is_logged_in',1)}
            onSuccess ={console.log('thing')}
            onSuccess={window.location.href = "/home"}
            

            
            
            onFailure={this.responseGoogle}
            cookiePolicy={'single_host_origin'}
            />
            

          </div>

          <script>
            document.getElementById("htest").style.color = "green";
          </script>
        </body>
        </html>
    )
  }
}

export default App