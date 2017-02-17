import React from 'react';

export const Counter = ({ counter, increment, doubleAsync}) => (
  <div style={{ margin: '0 auto' }} >
    <h2>Counter: {counter}</h2>
    <button className='btn btn-default' onClick={increment}>
      Increment
    </button>
    {' '}
    <button className='btn btn-default' onClick={doubleAsync}>
      Double after 1 second
    </button>
  </div>
);

Counter.propTypes = {
  counter          : React.PropTypes.number.isRequired,
  doubleAsync      : React.PropTypes.func.isRequired,
  increment        : React.PropTypes.func.isRequired
};

export default Counter;
