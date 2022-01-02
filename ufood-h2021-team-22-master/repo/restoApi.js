export async function getRestoInfo(id) {
  const URL = `http://ufoodapi.herokuapp.com/unsecure/restaurants/${id}`;
  const response = await fetch(URL);
  return await response.json();
}

export default {
  getRestoInfo
};
