import React, { useState, useEffect } from "react";
import TinderCard from 'react-tinder-card';

function Card()
{
    const api_path = 'https://kindling-lp.herokuapp.com/';   
    const[target, setTarget] = useState('');
    

    function gotoMatchList()
    {
        window.location.href='/card/match';
    }

    function gotoUpdate()
    {
        window.location.href='/card/update';
    }

    const get_candidate = async event=>
    {
        // get token and form the json request.
        var token = JSON.parse(localStorage.getItem('user_data'));
        var obj = {email_str:token.email,is_group_bool:token.is_group,access_token_str:token.jwtToken};
        var js = JSON.stringify(obj);
        //console.log(js);
        try
        {    
            // get the response from the server.
            const response = await fetch(api_path + 'api/get_candidate',
                {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});
            const res = JSON.parse(await response.text());
            // update the token in our local storage.
            // var user = {email:token.email, is_group:token.is_group ,jwtToken:res.refreshed_token_str};
            // localStorage.setItem('user_data',  JSON.stringify(user));
            // get the target profile, and return it.
            // setTarget(res.email_str);
            try
            {
                var obj_profile = {email_str:res.email_str,access_token_str:res.refreshed_token_str};
                var js_profile = JSON.stringify(obj_profile);
                // get individua profile if you're group.
                if (token.is_group)
                {
                    // get responsed
                    const response = await fetch(api_path + 'api/get_profile_individual',
                    {method:'POST',body:js_profile,headers:{'Content-Type': 'application/json'}});
                    const res_profile = JSON.parse(await response.text());
                    // update the token.
                    var user = {email:token.email, is_group:token.is_group ,jwtToken:res_profile.refreshed_token_str};
                    localStorage.setItem('user_data',  JSON.stringify(user));
                    // return the person object.
                    return({name:res_profile.display_name_str === null ? '' : res_profile.display_name_str,email:res.email_str,phone:res_profile.phone_str,description:res_profile.description_str});
                }
                // get group profile.
                else
                {
                    // get responsed
                    const response = await fetch(api_path + 'api/get_profile_group',
                    {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});
                    const res = JSON.parse(await response.text());
                    // update the token.
                    var user = {email:token.email, is_group:token.is_group ,jwtToken:res.refreshed_token_str};
                    localStorage.setItem('user_data',  JSON.stringify(user));
                    // return the person object.
                    return {name: res.display_name_str,email:target,phone:res.phone_str,description:res.description_str};
                }
            }
            catch(e)
            {
                alert(e.toString());
                return;
            }
        }
        catch(e)
        {
            alert(e.toString());
            return;
        }
    }
    
    const onSwipe = (direction) => {
        // go right.
        if (direction === 'right')
            swipe_left();
        // go left.
        else
            swipe_right();
    }
    
    const swipe_left = async =>
    {
        get_candidate().then((candidate) => {
            setPerson(candidate);
        });
    }
    
    const swipe_right = async =>
    {
        get_candidate().then((candidate) => {
            setPerson(candidate);
        });
    }

    const[person, setPerson] = useState({});
    get_candidate().then((candidate) => {
        setPerson(candidate);
    });
    return (
        <div class='card_page_wrraper'>
            <div class='header'>
                <img className="header_icon" onClick={gotoUpdate} src='https://media.discordapp.net/attachments/860932549257330738/860942532820992060/flame.png'/>
                <img className="header_logo" src='https://media.discordapp.net/attachments/860932549257330738/860942532820992060/flame.png'/>
                <img className="header_icon" onClick={gotoMatchList} src='https://media.discordapp.net/attachments/860932549257330738/860942532820992060/flame.png'/>            
            </div>

            <div class='card_UI'>
                <TinderCard className='swipe' 
                onSwipe={onSwipe}
                preventSwipe={['left','right']}>
                    <div className="card">
                        <h1>{person.name}</h1>
                        <h2>{person.phone}</h2>
                        <h2>{person.email}</h2>
                        <span>{person.description}</span>
                    </div>
                </TinderCard>

                <div className='btn' >
                    <img className='swipe_left' onClick={swipe_left} src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGAdotQvrCacZRFbC9iLvWq5Loxm3QXcOETA&usqp=CAU'></img>
                    <img className='swipe_right' onClick={swipe_right} src='data:image/png;base64,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'></img>
                </div>
            </div>

            
        </div>
    );
}

export default Card;