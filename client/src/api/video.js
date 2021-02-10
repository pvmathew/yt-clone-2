export async function getVideo(id) {
  const response = await fetch("http://localhost:2000/videos/" + id, {
    method: "GET",
    mode: "cors",
    credentials: "include",
  });

  const data = await response.json();
  return data;
}
export async function likeVideo(id) {
  const response = await fetch("http://localhost:2000/videos/" + id, {
    method: "PUT",
    mode: "cors",
    credentials: "include",
  });

  const data = await response.json();
  return data;
}
