export async function sendLoginRequest(email, password) {
  const userLogin = { email, password };

  const response = await fetch("/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userLogin),
    mode: "cors",
    credentials: "include",
  });

  if (response.status >= 400) {
    return { success: false, message: "Invalid username or password" };
  }

  const data = await response.json();
  const { success, message } = data;
  return { success, message };
}

export async function sendLogoutRequest(email, password) {
  const response = await fetch("/auth/logout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    mode: "cors",
    credentials: "include",
  });

  const data = await response.json();
  const { success, message } = data;
  return { success, message };
}

export async function sendRegisterRequest(newUser) {
  const response = await fetch("/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newUser),
    mode: "cors",
  });
  const data = await response.json();
  const { success, message } = data;
  return { success, message };
}
