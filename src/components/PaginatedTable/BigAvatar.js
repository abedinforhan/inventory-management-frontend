import React from 'react';

function BigAvatar({
  name, email, contactNumber, imageURL
}) {
  return (
    <div className="text-center">
      <div className="avatar">
        <div className="w-32 rounded-full">
          <img alt="profile" src={imageURL} />
        </div>
      </div>
      <div className="">
        <p className="capitalize font-medium">
          {name}
        </p>
      </div>

      <p>{email}</p>
      <p>{contactNumber}</p>
    </div>

  );
}

export default BigAvatar;
