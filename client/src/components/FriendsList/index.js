import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const FriendList = ({ friendCount, username, friends }) => {
  if (!friends?.length) {
    return <p className="bg-dark text-light p-3">{username}, make some friends!</p>;
  }

  return (
    <div>
      <h5>
        {username}'s {friendCount} {friendCount === 1 ? 'friend' : 'friends'}
      </h5>
      {friends.map(friend => (
        <button className="btn w-100 display-block mb-2" key={friend._id}>
          <Link to={`/profile/${friend.username}`}>{friend.username}</Link>
        </button>
      ))}
    </div>
  );
};


// Prop validation
FriendList.propTypes = {
    friendCount: PropTypes.number.isRequired, // friendCount must be a number and is required
    username: PropTypes.string.isRequired, // username must be a string and is required
    friends: PropTypes.arrayOf( // friends must be an array of objects
        PropTypes.shape({
            _id: PropTypes.string.isRequired, // each friend object must have an _id which is a string
            username: PropTypes.string.isRequired, // each friend object must have a username which is a string
        })
    ).isRequired, // friends array is required
};

export default FriendList;