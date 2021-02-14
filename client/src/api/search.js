export async function getResults(searchTerm) {
  const lowerCase = searchTerm.toLowerCase();
  const noSpace = lowerCase.replace(" ", "+");

  const response = await fetch("/videos?search=" + noSpace, {
    method: "GET",
    mode: "cors",
    credentials: "include",
  });

  const data = await response.json();
  return data;
}
