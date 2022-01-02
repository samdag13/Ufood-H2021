const baseURL = "https://ufoodapi.herokuapp.com";
const unsecureBaseURL = "https://ufoodapi.herokuapp.com/unsecure";


export const getRestaurantsUnsecured = () => {
  return fetch(`${unsecureBaseURL}/restaurants?limit=10000`)
    .then(response => response.json())
    .then(json => {
      return json.items;
    })
    .catch(() => {
      console.error("unable to fetch restaurants");
    });
}

export const getRestaurants = token => {
  return fetch(`${baseURL}/restaurants?limit=10000`, {
    headers: { Authorization: token, "Content-Type": "application/json" }
  })
    .then(response => response.json())
    .then(json => {
      return json.items;
    })
    .catch(() => {
      console.error("unable to fetch restaurants");
    });
};

export const getUsersUnsecured = () => {
  return fetch(`${unsecureBaseURL}/users?limit=10000`)
    .then(response => response.json())
    .then(json => {
      return json.items;
    })
    .catch(() => {
      console.error("unable to fetch users");
    });
}

export const getUsers = token => {
  return fetch(`${baseURL}/users?limit=10000`, {
    headers: { Authorization: token, "Content-Type": "application/json" }
  })
    .then(response => response.json())
    .then(json => {
      return json.items;
    })
    .catch(() => {
      console.error("unable to fetch users");
    });
};

export const getUser = (userId, token) => {
  return fetch(`${baseURL}/users/${userId}`, {
    headers: {
      Authorization: token
    }
  })
    .then(response => response.json())
    .then(json => {
      return json;
    })
    .catch(() => {
      console.error("unable to fetch user");
    });
};

export const getUserUnsecure = userId => {
  return fetch(`${unsecureBaseURL}/users/${userId}`)
    .then(response => response.json())
    .then(json => {
      return json;
    })
    .catch(() => {
      console.error("unable to fetch user");
    });
};

export const getUserVisits = (userId, token) => {
  return fetch(`${baseURL}/users/${userId}/restaurants/visits?limit=100`, {
    headers: {
      Authorization: token
    }
  })
    .then(response => response.json())
    .then(json => {
      return json;
    })
    .catch(() => {
      console.error("unable to fetch user restaurant visits");
    });
};

export const getUserVisitsUnsecure = userId => {
  return fetch(
    `${unsecureBaseURL}/users/${userId}/restaurants/visits?limit=100`
  )
    .then(response => response.json())
    .then(json => {
      return json;
    })
    .catch(() => {
      console.error("unable to fetch user restaurant visits");
    });
};

export const getUserVisitsForResto = (userId, restaurantId) => {
  return fetch(
    `${unsecureBaseURL}/users/${userId}/restaurants/${restaurantId}/visits`
  )
    .then(response => response.json())
    .then(json => {
      return json;
    })
    .catch(() => {
      console.error("unable to fetch restaurant visits");
    });
};

export const getVisitInfo = (userId, visitId) => {
  return fetch(
    `${unsecureBaseURL}/users/${userId}/restaurants/visits/${visitId}`
  )
    .then(response => response.json())
    .then(json => {
      return json;
    })
    .catch(() => {
      console.error("unable to fetch visit information");
    });
};

export const getListsForUser = (userId, token) => {
  return fetch(`${unsecureBaseURL}/users/${userId}/favorites`, {
    headers: {
      Authorization: token
    }
  })
    .then(response => response.json())
    .then(json => {
      return json.items;
    })
    .catch(() => {
      console.error("unable to fetch list information for user");
    });
};

export const getListsForUserUnsecure = userId => {
  return fetch(`${unsecureBaseURL}/users/${userId}/favorites`)
    .then(response => response.json())
    .then(json => {
      return json.items;
    })
    .catch(() => {
      console.error("unable to fetch list information for user");
    });
};

export const createListFavorites = (listFavoritesName, userEmail, token) =>
  fetch(`${baseURL}/favorites`, {
    method: "POST",
    headers: {
      Authorization: token,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name: listFavoritesName,
      owner: userEmail
    })
  })
    .then(response => response.json())
    .then(json => json)
    .catch(() => {
      console.error("Unable to create a list of favorites.");
    });

export const modifyListFavoritesName = (
  listFavoritesId,
  listFavoritesName,
  ownerEmail,
  token
) =>
  fetch(`${baseURL}/favorites/${listFavoritesId}`, {
    method: "PUT",
    headers: {
      Authorization: token,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name: listFavoritesName,
      owner: ownerEmail
    })
  })
    .then(response => response.json)
    .then(listFavorites => listFavorites)
    .catch(() => {
      console.error("Unable to modify the list of favorites.");
    });

export const deleteListFavorites = (listFavoritesId, token) =>
  fetch(`${baseURL}/favorites/${listFavoritesId}`, {
    method: "DELETE",
    headers: {
      Authorization: token,
      "Content-Type": "application/json"
    }
  })
    .then(response => response.json())
    .then(listFavorites => listFavorites)
    .catch(() => {
      console.error("Unable to delete the list of favorites.");
    });

export const addRestaurantToFavorites = (favoriteId, restaurantObject) =>
  fetch(`${baseURL}/favorites/${favoriteId}/restaurants`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(restaurantObject)
  })
    .then(response => response.json())
    .then(favorite => favorite)
    .catch(() => {
      console.error("Unable to add the restaurant to the favorites.");
    });

export const deleteRestaurantFromFavorites = (favoriteId, restaurantId) =>
  fetch(`${baseURL}/favorites/${favoriteId}/restaurants/${restaurantId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(response => response.json())
    .then(favorite => favorite)
    .catch(() => {
      console.error("Unable to delete the restaurant from favorites.");
    });

export const signup = (name, email, password) =>
  fetch(`${baseURL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name: name,
      email: email,
      password: password
    })
  })
    .then(response => response.json())
    .then(json => json)
    .catch(() => {
      console.error("Unable to create an account.");
    });

export const login = (email, password) =>
  fetch(`${baseURL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email: email,
      password: password
    })
  })
    .then(response => response.json())
    .then(json => json)
    .catch(() => {
      console.error("Unable to open the account.");
    });

export const logout = () =>
  fetch(`${baseURL}/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(response => response.json())
    .then(json => json)
    .catch(() => {
      console.error("Unable to close the account.");
    });

export const getTokenInfo = token => {
  return fetch(`${baseURL}/tokenInfo`, {
    headers: {
      Authorization: token
    }
  })
    .then(response => response.json())
    .then(json => json)
    .catch(() => {
      console.error("unable to fetch user information");
    });
};
