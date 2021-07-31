import React, { useState } from "react";
import storage from '../tokenStorage.js';

export default function InitializeProfile()
{
    const api_path = 'https://kindling-lp.herokuapp.com/';
    const[message, setMessage] = useState('');
    
    const[showDescription, showDescription] = useState(false);
    const[game_development, set_game_development] = useState(false);
    const[app_development, set_app_development] = useState(false);
    const[web_development, set_web_development] = useState(false);
    const[robotics, set_robotics] = useState(false);
    const[graphic_design, set_graphic_design] = useState(false);
    const[writer, set_writer] = useState(false);
    const[marketing, set_marketing] = useState(false);
    const[networking, set_networking] = useState(false);
    const[construction, set_construction] = useState(false);
    const[lab_partners, set_lab_partners] = useState(false);
    const[research, set_research] = useState(false);
    const[other, set_other] = useState(false);

    var description;
    var token = JSON.parse(localStorage.getItem('user_data'));
    
    var profile = token.is_group ? 
    {
        email_str: token.email,
        group_categories_obj: [],
        description_str: '',
        candidate_individual_categories_obj: {
          game_development_bool: game_development,
          app_development_bool: app_development,
          web_development_bool: web_development,
          robotics_bool: robotics,
          graphic_design_bool: graphic_design,
          writer_bool: writer,
          marketing_bool: marketing,
          networking_bool: networking,
          construction_bool: construction,
          lab_partners_bool: lab_partners,
          research_bool: research,
          other_bool: other
        },
        access_token_str: token.jwtToken,
    } 
    :
    {
        email_str: token.email,
        individual_categories_obj: [],
        description_str: '',
        candidate_group_categories_obj: {
          game_development_bool: game_development,
          app_development_bool: app_development,
          web_development_bool: web_development,
          robotics_bool: robotics,
          graphic_design_bool: graphic_design,
          writer_bool: writer,
          marketing_bool: marketing,
          networking_bool: networking,
          construction_bool: construction,
          lab_partners_bool: lab_partners,
          research_bool: research,
          other_bool: other
        },
        access_token_str: token.jwtToken,
      };
    
    const save_tages = async event =>
    {
        var num_select = 0;
        if (token.is_group)
            for (var obj in profile.candidate_individual_categories_obj)
            {
                if (profile.candidate_individual_categories_obj[obj])
                    num_select++;
            }
        else
            for (var obj in profile.candidate_group_categories_obj)
            {
                if (profile.candidate_group_categories_obj[obj])
                    num_select++;
            }

        if (num_select < 1)
            setMessage('Please select at least one fileds.');
        else
            setShowDescribetion(true);
    }

    const save_profile = async event =>
    { 
        setMessage('');

        if (description == '')
        setMessage('Please add some description.');
        else
        {
            profile.description_str = description.value;
            var js = JSON.stringify(profile);
            try
            {   
                var response;
                if (token.is_group)
                    response = await fetch(api_path + 'api/initialize_profile_group',
                        {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});
                else
                    response = await fetch(api_path + 'api/initialize_profile_individual',
                        {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});
                
                var res = JSON.parse(await response.text());

                // Fail to setup profile
                if (!res.success_bool)
                {
                    setMessage('Unexpect error happened, please try again.');
                }
                // successfully setup profile
                else
                {
                    setMessage('');
                    var user = {email:token.email, is_group:token.is_group ,jwtToken:res.refreshed_token_str};
                    localStorage.setItem('user_data', JSON.stringify(user));
                    
                    window.location.href = '/card';
                }
            }
            catch(e)
            {
                alert(e.toString());
                return;
            } 
        }
    }

    return (
        <Container>
            {showDescription ?
                <Row>
                    <Col>
                        <Row>
                            <Col>
                                <h1>Add some descriptions</h1>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <input type="text" className="description" placeholder='description' ref={(c) => description = c}></input>
                            </Col>
                        </Row>
                        <Row>
                            <button className='btn' onClick={save_profile}>Save</button>
                            <span>{message}</span>
                        </Row>
                    </Col>
                </Row>
                :
                <Row>
                    <Col>
                        <Row>
                            <Col>
                                <h1>What are your interests</h1>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <input type='button' className='select_btn' onClick={() => set_game_development(!game_development)} value='game development'/>
                            
                                <input type='button' className='select_btn' onClick={() => set_app_development(!app_development)}  value='app development'/>
                            </Col>
                            <Col>
                                <input type='button' className='select_btn' onClick={() => set_web_development(!web_development)}  value='web development'/>
                            
                                <input type='button' className='select_btn' onClick={() => set_robotics(!robotics)}  value='robotics'/>
                            </Col>
                            <Col>
                                <input type='button' className='select_btn' onClick={() => set_graphic_design(!graphic_design)}  value='graphic design'/>
            
                                <input type='button' className='select_btn' onClick={() => set_writer(!writer)}  value='writer'/>
                            </Col>
                            <Col>
                                <input type='button' className='select_btn' onClick={() => set_marketing(!marketing)}  value='marketing'/>
                    
                                <input type='button' className='select_btn' onClick={() => set_networking(!networking)}  value='networking'/>
                            </Col>
                            <Col>
                                <input type='button' className='select_btn' onClick={() => set_construction(!construction)}  value='construction'/>

                                <input type='button' className='select_btn' onClick={() => set_lab_partners(!lab_partners)}  value='lab partners'/>
                            </Col>
                            <Col>
                                <input type='button' className='select_btn' onClick={() => set_research(!research)}  value='research'/>
                                
                                <input type='button' className='select_btn' onClick={() => set_other(!other)}  value='other'/>
                            </Col>
                            <Col>
                                <span>{message}</span>

                                <button class='btn' onClick={save_tages}>Next</button>
                            </Col>
                        </Row>
                    </Col>
                </Row>

            }
        </Container>
    );
}