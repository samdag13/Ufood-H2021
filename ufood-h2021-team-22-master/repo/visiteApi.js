export async function postVisiteResto(userId, restoId, comment, rating, date) {
  const URL = `http://ufoodapi.herokuapp.com/unsecure/users/${userId}/restaurants/visits`;
  const d = new Date(date);
  d.setDate(d.getDate() + 1);
  const response = await fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      restaurant_id: restoId,
      comment: comment,
      rating: rating,
      date: d.toISOString()
    })
  });
  return response.json();
}

export default {
  postVisiteResto
};
