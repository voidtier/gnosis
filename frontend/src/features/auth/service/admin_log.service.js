export async function Admin_log_fetch(form_data) {
  const response = await fetch("http://localhost:5000/api/auth/admin/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(form_data),
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("fetch failed");
  }
  return await response.json();
}
