import React, { useState, useEffect } from "react";
import TinderCard from 'react-tinder-card';

export default function Card()
{
    const api_path = 'https://kindling-lp.herokuapp.com/';
    const [target,setTarget] = useState('');
    const [person,setPerson] = useState(null);
    const [message, setMessage] = useState('');

    // get token and form the json request.
    var token = JSON.parse(localStorage.getItem('user_data'));
    var obj = {email_str:token.email,is_group_bool:token.is_group,access_token_str:token.jwtToken};
    var js = JSON.stringify(obj);

    useEffect(()=>{
        // get the response from the server.
        fetch(api_path + 'api/get_candidate',
        {method:'POST',body:js,headers:{'Content-Type': 'application/json'}})
        .then( res => {
            return res.json();
        })
        .then( res => {
            var user = {email:token.email,is_group:token.is_group,jwtToken:res.refreshed_token_str};
            localStorage.setItem('user_data',JSON.stringify(user));
            setTarget(res.email_str);
        });
    },[]);

    useEffect(() => {
        token = JSON.parse(localStorage.getItem('user_data'));
        obj = {email_str:target,is_group_bool:token.is_group,access_token_str:token.jwtToken};
        js = JSON.stringify(obj);
        var path;

        // get individua profile if you're group.
        if (token.is_group)
            path = 'api/get_profile_individual';
        else
            path = 'api/get_profile_group';

        fetch((api_path + path) ,{method:'POST',body:js,headers:{'Content-Type': 'application/json'}})
        .then(res =>{
            return res.json();
        })
        .then(res=> {
            // update the token.
            var user = {email:token.email, is_group:token.is_group ,jwtToken:res.refreshed_token_str};
            localStorage.setItem('user_data',  JSON.stringify(user));
            // return the person object.
            setPerson({name:res.display_name_str,email:target,phone:res.phone_str,description:res.description_str});
        });
    },[target]);

    const swipe_left = () => 
    {
        
//console.log(count + ": " + target);
        token = JSON.parse(localStorage.getItem('user_data'));
        obj = {email_str:token.email,is_group_bool:token.is_group,target_email_str:target,access_token_str:token.jwtToken};
        js = JSON.stringify(obj);
        fetch(api_path + 'api/swipe_left',
        {method:'POST',body:js,headers:{'Content-Type': 'application/json'}})
        .then( res => {
            return res.json();
        })
        .then( res => {

            if (res.success_bool === false)  return;
            var user = {email:token.email,is_group:token.is_group,jwtToken:res.refreshed_token_str};
            localStorage.setItem('user_data',JSON.stringify(user));
//console.log(res);
            get_candidate();
        });
    }

    const swipe_right = () => 
    {
        token = JSON.parse(localStorage.getItem('user_data'));
        obj = {email_str:token.email,is_group_bool:token.is_group,target_email_str:target,access_token_str:token.jwtToken};
        js = JSON.stringify(obj);

        fetch(api_path + 'api/swipe_right',
        {method:'POST',body:js,headers:{'Content-Type': 'application/json'}})
        .then( res => {
            return res.json();
        })
        .then( res => {
            if (!res.success_bool)  return;

            if (res.match_bool)
                setMessage("You get a new match!");

            var user = {email:token.email,is_group:token.is_group,jwtToken:res.refreshed_token_str};
            localStorage.setItem('user_data',JSON.stringify(user));
            get_candidate();
        });
    }

    const get_candidate = () => 
    {
        token = JSON.parse(localStorage.getItem('user_data'));
        obj = {email_str:token.email,is_group_bool:token.is_group,access_token_str:token.jwtToken};
        js = JSON.stringify(obj);
    
        // get the response from the server.
        fetch(api_path + 'api/get_candidate',
        {method:'POST',body:js,headers:{'Content-Type': 'application/json'}})
        .then( res => {
            return res.json();
        })
        .then( res => {
//console.log("get_candidate: " + JSON.stringify(res));
            var user = {email:token.email,is_group:token.is_group,jwtToken:res.refreshed_token_str};
            localStorage.setItem('user_data',JSON.stringify(user));
            setTarget(res.email_str);
        });
    }

    function gotoMatchList()
    {
        window.location.href='/card/match';
    }

    function gotoUpdate()
    {
        window.location.href='/card/update';
    }

    const onSwipe = (direction) => {
        // go right.
        if (direction === 'right')
            swipe_left();
        // go left.
        else
            swipe_right();
    }

    return (
        <div class='card_UI'>
            <div class='header'>
                <img className="header_icon" onClick={gotoUpdate} src='https://cdn.discordapp.com/attachments/856542176195510302/860972636002713620/person.png'/>
                <img className="header_logo" src='https://media.discordapp.net/attachments/860932549257330738/860942532820992060/flame.png'/>
                <img className="header_icon" onClick={gotoMatchList} src='https://cdn.discordapp.com/attachments/856542176195510302/860972611219619840/menu.png'/>
            </div>
             {/** onSwipe not work, need fix it */}
            <TinderCard className='swipe_card'
            onSwipe={onSwipe}
            preventSwipe={['right', 'left']}>
            {person && <div className="card">
                <h1>{person.name}</h1>
                <h2>{person.phone}</h2>
                <h2>{person.email}</h2>
                <span>{person.description}</span><br/><br/>
            </div>}
            </TinderCard>
            <h1>{message}</h1><br/><br/>
            <div className='btn' >
                <button className='swipe_left' onClick={swipe_left} >No</button>
                <button className='swipe_right' onClick={swipe_right}>Yes</button>
            </div>
        </div>
    );
}