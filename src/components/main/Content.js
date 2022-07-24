import React from 'react';
import Explore from './Explore';
import Feed from './Feed';

export default function Content({ calendarData, todoData }) {

    return (
        <section className='content-wrap' sx={{ position: 'relative', display: 'flex', height: '100vh'}}>
        <Explore calendarData={calendarData}/>
        <Feed />
        </section>
    );
}