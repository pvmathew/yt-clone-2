export async function getResults(searchTerm) {
  const lowerCase = searchTerm.toLowerCase();
  const noSpace = lowerCase.replace(" ", "+");

  const response = await fetch(
    "http://localhost:2000/videos?search=" + noSpace,
    {
      method: "GET",
      mode: "cors",
      credentials: "include",
    }
  );

  const data = await response.json();
  return data;
}
