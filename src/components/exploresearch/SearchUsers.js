import React from 'react'

import { Button } from '@mui/material';

import '../../stylesheets/Search.css';


export default function SearchUsers({ data }) {

    //const Users = [...data];
    //console.log('search', data)

   return (

          <React.Fragment>

              <div className="search-list-box" key={data.id}>
                <Button className="search-list-button" id={data.id} name={data.id}>
                    <div className="search-list-name" id={data.id} name={data.name}>
                      <p>{data.name}</p>
                    </div>
                    <div className="search-list-text" id={data.id} >
                      <p>{data.introText}</p>
                    </div>
                </Button>
              </div>
  
            </React.Fragment>
        
         )

};