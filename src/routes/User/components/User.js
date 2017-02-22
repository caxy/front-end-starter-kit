import React from 'react';

export const User = ({ user, children }) => (
  <div>
    <h2>User: {user.username}</h2>

    {children}
  </div>
);

User.propTypes = {
  user          : React.PropTypes.object.isRequired,
  children: React.PropTypes.element
};

export default User;
