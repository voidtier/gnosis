export async function Admin_user_data_fetch() {
  const response = await fetch(
    "http://localhost:5000/api/auth/admin/user_data",
    {
      credentials: "include",
    },
  );
  if (!response.ok) {
    throw new Error("fetch failed");
  }
  return await response.json();
}
