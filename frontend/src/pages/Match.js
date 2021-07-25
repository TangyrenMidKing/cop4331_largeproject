import React, { useState, useEffect } from "react";

export default function Match()
{
    var user_data = localStorage.getItem('user_data');
    var token = JSON.parse(user_data);
    const api_path = 'https://kindling-lp.herokuapp.com/';
    const [match_list, setList] = useState(null);
    var obj = {email_str:token.email,output_select_str:'e',access_token_str:token.jwtToken};
    var js = JSON.stringify(obj);
console.log(JSON.stringify(token));
    useEffect(() => 
    {
        fetch(api_path + 'api/get_matches',
        {method:'POST',body:js,headers:{'Content-Type': 'application/json'}})
        .then(res => {
            return res.json();
        })
        .then(res => {
            var user = {email:token.email, is_group:token.is_group ,jwtToken:res.refreshed_token_str};
            var user_data = JSON.stringify(user);
            localStorage.setItem('user_data', user_data);
            console.log(JSON.stringify(res.matches_array));
            setList(res.matches_array);
        });
    },[]);

    function go_back_card()
    {
        window.location.href = '/card';
    }

    return (
        <div class='match_list'>
            <span>Match List</span><br/>
            {match_list && match_list.map((list) =>
                <li key={list.name}>
                    <div className='match_list'>
                        <span className='match_list_name'>{list.display_name_str}</span><br/>
                        <span className='match_list_email'>{list.email_str}</span><br/>
                        <span className='match_list_phone'>{list.phone_str}</span><br/>
                    </div>
                </li>
            )}
            <button className='btn' onClick={go_back_card}>Back to Cards</button>
        </div>
    );
}