import React from 'react';
import Calendar from './Calendar';
import Explore from './Explore';
import Feed from './Feed';

export default function Content() {

    return (
        <div className='content-wrap'>
        <Explore />
        <Feed />
        <Calendar />
        <p>content</p>
        </div>
    );
}