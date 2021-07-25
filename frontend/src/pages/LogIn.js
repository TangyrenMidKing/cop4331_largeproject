import React, {useState} from "react";
import {BrowserRouter as Link} from "react-router-dom";

function LogIn()
{
    var loginName;
    var loginPassword;
    const api_path = 'https://kindling-lp.herokuapp.com/';
    const [message,setMessage] = useState('');


    const doLogin = async event =>
    {
        event.preventDefault();

        var obj = {email_str:loginName.value,password_str:loginPassword.value};
        var js = JSON.stringify(obj);
        

        try
        {    
            const response = await fetch(api_path + 'api/login',
                {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});

            var res = JSON.parse(await response.text());
            
            var user = {email:loginName.value, is_group:res.is_group_bool ,jwtToken:res.access_token_str};
            var user_data = JSON.stringify(user);

            // ready state is 0, send user to email verification page.
            if( res.ready_status_int == 0)
            {
                window.location.href = '/email_verification';
            }
            // ready state is 1, send user to complete his personal file.
            else if( res.ready_status_int == 1)
            {
                localStorage.setItem('user_data', user_data);
                
                setMessage('');
                window.location.href = '/signup/initial_profile';
            }
            // successfully logged in
            else if ( res.ready_status_int == 2)
            {
                localStorage.setItem('user_data', user_data);
                
                setMessage('');
                window.location.href = '/card';
            }
            // Fail to login
            else
            {
                setMessage('User/Password combination incorrect');
            }
        }
        catch(e)
        {
            alert(e.toString());
            return;
        } 
    };

    return (
        <div id='container'>
            <div class='bar'>
                <h1>Log In</h1><br/>
                <input type="email" name="username" placeholder='email\username' ref={(c) => loginName = c}></input><br/>
                <input type="password" name="password" placeholder='password' ref={(c) => loginPassword = c}></input><br/>
                <button className='btn' id='login_page_bnt' onClick={doLogin}>Log In</button><br/>
                <Link to={'/reset_password'} >forget passwrod?</Link><br/>
                <h2 id="loginResult">{message}</h2>
            </div>
        </div>
    );
}

export default LogIn;