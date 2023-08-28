import React from 'react';
import GoogleLogin from 'react-google-login';

var clientId ="432429443335-6fhdkuv9h6fc157ctdum0t9k61mt082n.apps.googleusercontent.com"
const GoogleAuth = () => {
  const responseGoogle = (response) => {
    // Handle the response from Google here
    console.log(" Respose Google ")
    console.log(response);
  };

  return (
    <div>
      <GoogleLogin
        clientId={clientId}
        buttonText="Login with Google"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
      />
    </div>
  );
};

export default GoogleAuth;
