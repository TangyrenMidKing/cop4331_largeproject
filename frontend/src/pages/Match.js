import React, { useState, useEffect } from "react";

var user_data = localStorage.getItem('user_data');
var token = JSON.parse(user_data);
const api_path = 'https://kindling-lp.herokuapp.com/';

const get_rows = async event => 
{
    try
    {
        var obj = {email_str:token.email,output_select_str:'e',access_token_str:token.jwtToken};
        var js = JSON.stringify(obj);
        
        const response = await fetch(api_path + 'api/get_matches',
        {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});
        var res = JSON.parse(await response.text());
        
        var user = {email:token.email, is_group:token.is_group ,jwtToken:res.refreshed_token_str};
        var user_data = JSON.stringify(user);
        localStorage.setItem('user_data', user_data);
        
        const rows =  res.matches_array;
        console.log(rows.map(row => row.name));
        if (rows !== [])
            return (rows.map((row) => (
                <tr>
                    <td>{row.name}</td>
                    <td>{row.email}</td>
                    <td>{row.phone_number}</td>
                    <td>
                        <button className='btn' onClick={getMoreInfo(row.email)} placeholder='more information'></button>    
                    </td>
                </tr>
            )));
        else
            return;
    }
    catch(e)
    {
        alert(e.toString());
        return;
    } 
}

async function getMoreInfo(email)
{  
    window.location.href = '/card';
}

function Match()
{
    function go_back_card()
    {
        window.location.href = '/card';
    }

   

    return (
        <div class='match_list'>
            <span>Match List</span><br/>
            <table className='match_table'>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone Number</th>
                        <th>More</th>
                    </tr>
                </thead>
                <tbody>
                {get_rows}
                </tbody>
            </table>

            <button className='btn' onClick={go_back_card}>Back to Cards</button>
        </div>
    );
}

export default Match;