import React, { useState, useEffect } from "react";
import TinderCard from 'react-tinder-card';

function Card()
{
    console.log(JSON.parse(localStorage.getItem('user_data')).jwtToken);

    function gotoMatchList()
    {
        window.location.href='/card/match';
    }

    function gotoUpdate()
    {
        window.location.href='/card/update';
    }

    const[peolpe, setPeople] = useState([
        {
            name: 'Jack',
            url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3btZ8IrrmduD5cm0mfBGKmnYOTqLzJQIaoQ&usqp=CAU'
        },
        {
            name: 'Sunny',
            url: 'https://smartcdn.prod.postmedia.digital/vancouversun/wp-content/uploads/2019/04/ali-skovbye-headshot-2.jpg'
        },
        {
            name: 'Jack',
            url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3btZ8IrrmduD5cm0mfBGKmnYOTqLzJQIaoQ&usqp=CAU'
        },
    ]);

    return (
        <div class='card_page_wrraper'>
            <div class='header'>
                <img class="header_icon" onClick={gotoUpdate} src='https://media.discordapp.net/attachments/860932549257330738/860942532820992060/flame.png'/>
                <img className="header_logo" src='https://media.discordapp.net/attachments/860932549257330738/860942532820992060/flame.png'/>
                <img class="header_icon" onClick={gotoMatchList} src='https://media.discordapp.net/attachments/860932549257330738/860942532820992060/flame.png'/>            
            </div>

            <div class='card_UI'>
                {peolpe.map(person => (
                    <TinderCard className='swipe' 
                    key={person.name}
                    preventSwipe={['up','down']}>
                        <div className="card">
                            <h3>{person.name}</h3>
                        </div>
                    </TinderCard>
                ))}
            </div>
        </div>
    );
}

export default Card;