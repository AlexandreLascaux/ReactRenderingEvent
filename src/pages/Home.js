import React from 'react';
import Cell from '../components/Cell';
import '../styles/Home.css';

const Home = (props) => {
  const agenda = props.agenda;

  return (
    <div className='agenda'>
      {
        agenda.map((event) =>  <Cell key={event.id} event={event} />)
      }
    </div>
  );
};

export default Home;