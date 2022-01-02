const baseURL = "https://ufoodapi.herokuapp.com";

export const followUser = (userId, token) =>
  fetch(`${baseURL}/follow`, {
    method: "POST",
    headers: {
      Authorization: token,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      id: userId
    })
  })
    .then(response => response.json())
    .then(json => json)
    .catch(() => {
      console.error("Unable to follow user.");
    });

export const unfollowUser = (userId, token) =>
  fetch(`${baseURL}/follow/${userId}`, {
    method: "DELETE",
    headers: {
      Authorization: token,
      "Content-Type": "application/json"
    }
  })
    .then(response => response.json())
    .then(favorite => favorite)
    .catch(() => {
      console.error("Unable to delete follower.");
    });
