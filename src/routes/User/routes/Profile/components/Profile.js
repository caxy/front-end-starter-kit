import React from 'react';

export const Profile = ({ user }) => (
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

Profile.propTypes = {
  user: React.PropTypes.object.isRequired
};

export default Profile;
