export const handleUpload = async ({ name, desc, files }) => {
  // e.preventDefault();
  const file = files[0];
  if (file === null) {
    return alert("No file was selected.");
  }

  getSignature({ name, desc, file });
};

const getSignature = async (video) => {
  const response = await fetch(
    "/file/signature" +
      "?file-name=" +
      video.file.name +
      "&file-type=" +
      video.file.type,
    { mode: "cors", credentials: "include" }
  );
  if (response.status === 200) {
    const data = await response.json();
    uploadFile(video, data.signature, data.url);
  } else {
    alert("Error obtaining S3 signature.");
  }
};

function uploadFile(video, signedRequest, url) {
  const xhr = new XMLHttpRequest();
  xhr.open("PUT", signedRequest);
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        saveInfo(video.name, video.desc, url);
      } else {
        alert("Could not upload file.");
      }
    }
  };
  xhr.send(video.file);
}

async function saveInfo(name, desc, url) {
  let body = JSON.stringify({ name, desc, url });
  const response = await fetch("/file/upload", {
    method: "POST",
    body: body,
    headers: { "Content-Type": "application/json" },
    mode: "cors",
    credentials: "include",
  });

  if (response.status === 200) {
    alert("Video upload was successful!");
  }
}
