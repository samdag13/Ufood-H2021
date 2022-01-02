export async function postFavResto(userId, nomFav, restoId) {
  const URLforfavs = `http://ufoodapi.herokuapp.com/unsecure/users/${userId}/favorites`;
  const response = await fetch(URLforfavs);
  const theFavs = await response.json();
  console.log(theFavs);
  let listId;
  let foundOne = false;
  for (let i = 0; i < theFavs.total; i++) {
    let obj = theFavs.items[i];
    if (obj.owner.id === userId && obj.name === nomFav) {
      foundOne = true;
      listId = obj.id;
    }
  }
  let finalResponse;
  if (foundOne) {
    const URL = `http://ufoodapi.herokuapp.com/unsecure/favorites/${listId}/restaurants`;
    finalResponse = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: restoId
      })
    });
  } else {
    console.log("Unable to find list.");
    return null;
  }
  return finalResponse;
}

export default {
  postFavResto
};
