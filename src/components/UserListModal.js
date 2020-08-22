import React from "react";

const isFollowing = (followingList, otherUserId) => {
  return followingList.map((user) => user._id).includes(otherUserId);
};

function UserListModal({ type, followersList, followingList, addRemoveId }) {
  const active = type === "followers" ? followersList : followingList;

  return (
    <div className="modal fade" id={`${type}Modal`} tabIndex="-1" role="dialog">
      <div className="modal-dialog modal-dialog-scrollable" role="document">
        <div className="modal-content">
          <div className="modal-body">
            <h5 className="mb-4 text-center type">{type}</h5>
            <button
              type="button"
              className="btn btn-secondary float-right"
              data-dismiss="modal"
            >
              &times;
            </button>
            <hr />
            {/* List of user */}
            <div>
              {active.map((user) => (
                <div className="row" key={user._id}>
                  <div className="col-md-4">
                    <img src={user.imgurl} alt="profile-pic" />
                  </div>
                  <div className="col-md-4">{user.name}</div>
                  <div className="col-md-4">
                    <button
                      className={`btn btn-${
                        isFollowing(followingList, user._id)
                          ? "primary"
                          : "secondary"
                      }`}
                      onClick={() => addRemoveId(user._id)}
                    >
                      {isFollowing(followingList, user._id)
                        ? "Following"
                        : "Follow"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserListModal;
