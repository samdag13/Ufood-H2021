export async function recommendedRestos() {
  const URL = `http://ufoodapi.herokuapp.com/unsecure/restaurants?limit=1000`;
  const response = await fetch(URL);
  return await response.json();
};

export default {
  recommendedRestos
};
