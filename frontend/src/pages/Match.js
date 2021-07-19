import React, { useState, useEffect } from "react";

function createData(name, email, phone_number) {
    return { name, email, phone_number};
  }
  
const rows = [
    createData('Frozen yoghurt', 'aaa@gmail.com','656655'),
    createData('who ever', 'aaa@gmail.com','6565656'),
    createData('Foghurt', 'aaa@gmail.com', '656665'),
    createData('Froyoghurt', 'aaa@gmail.com','65656'),
    createData('Frourt', 'aaa@gmail.com','6565656465'),
];

// const token = JSON.parse(localStorage.getItem('user_data'));
// const api_path = 'https://kindling-lp.herokuapp.com/';

async function getMoreInfo(email)
{  
    // var obj = {email_str:email,access_token_str:token.jwtToken};
    // var js = JSON.stringify(obj);
    // var response;
    // if (token.is_group)
    //     response = await fetch(api_path + 'api/get_profile_individual',
    //     {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});
    // else
    //     response = await fetch(api_path + 'api/get_profile_group',
    //     {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});
    
}

function Match()
{
    const [showMoreInfo, setShowMoreInfo] = useState(false);
    const [moreInfo, setMoreInfo] = useState('');

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
                {rows.map((row) => (
                    <tr>
                        <td>{row.name}</td>
                        <td>{row.email}</td>
                        <td>{row.phone_number}</td>
                        <td>
                            <button className='btn' onClick={getMoreInfo(row.email)} placeholder='more information'></button>    
                        </td>
                        { showMoreInfo ? 
                        <div className='showMoreInfo'>
                            <span>{moreInfo}</span>
                        </div>
                        :
                        <div></div>
                        }
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Match;