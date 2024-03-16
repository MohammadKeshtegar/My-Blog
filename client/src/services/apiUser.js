import { PAGE_SIZE } from "../utils/constant";

export async function loginUser({ email, password }) {
  try {
    const res = await fetch(`/api/v1/users/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message);
    }

    return data;
  } catch (err) {
    console.error(err.message);
    return err.message;
  }
}

export async function signupUser({ name, email, password, confirmPassword }) {
  try {
    const res = await fetch(`/api/v1/users/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password, confirmPassword }),
    });

    const data = await res.json();

    return data;
  } catch (err) {
    console.error(err);
    return err.response;
  }
}

export async function logoutUser() {
  const res = await fetch(`/api/v1/users/logout`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });

  const data = await res.json();

  localStorage.removeItem("persist:root");

  return data;
}

export async function getAllUsers({ page }) {
  const res = await fetch(`/api/v1/users/all-users`);
  let data = await res.json();
  const count = data.data.length;

  if (page) {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE + 1;
    data = data.data.slice(from, to);
  }

  return { data, count };
}

export async function updateMe(userData) {
  try {
    const formData = new FormData();
    formData.append("name", userData.name);
    formData.append("email", userData.email);
    formData.append("photo", userData.photo[0]);

    const res = await fetch(`/api/v1/users/updateMe`, { method: "PUT", body: formData });
    const data = await res.json();

    return data;
  } catch (err) {
    console.error(err);
    return err;
  }
}

export async function deleteUser(id) {
  try {
    const res = await fetch(`/api/v1/users/delete-user/${id}`, { method: "DELETE" });
    const data = await res.json();

    return data;
  } catch (err) {
    console.error(err);
    return err.response.data;
  }
}

export async function changePassword(passwordData) {
  try {
    const res = await fetch(`/api/v1/users/updateMyPassword`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...passwordData }),
    });
    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message);
    }

    return data;
  } catch (err) {
    console.error(err);
    return err;
  }
}

export async function forgotPassword({ email, port }) {
  const res = await fetch(`/api/v1/users/forgotPassword`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, port }),
  });

  const data = await res.json();

  if (!res.ok) throw new Error(data.message);

  return data;
}

export async function resetPassword({ token, ...passwordData }) {
  const res = await fetch(`/api/v1/users/resetPassword/${token}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...passwordData, token }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message);
  return data;
}
