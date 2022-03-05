import React from "react";

export default function FriendList({ friends }) {
  
  const listOfFriends = friends.map((friend, index) => (
    <div>
      <div className="shadow-xl shadow-background w-96 h-36 rounded-lg bg-white my-5 mx-5">
        <div className="bg-primary text-gray-100 h-10 rounded-t-lg flex align-middle justify-center">
          <h3 className="mt-1 justify-self-center align-self-center font-semibold mb-4">
            {friend.name}
          </h3>
        </div>
        <div className="my-5">
          <p className="text-base text-primary font-bold">{friend.email}</p>
          <p className="my-2 text-sm">{friend.address}</p>
        </div>
      </div>
    </div>
  ));
  return (
    <div className=" flex flex-row flex-wrap justify-center grow">
      {listOfFriends}
    </div>
  );
}
