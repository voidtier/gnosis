const BASE = "http://localhost:5000/api/guide";

// Fetch all published guides (no steps, list view)
export async function get_guides_fetch() {
  const res = await fetch(BASE);
  if (!res.ok) throw new Error("Failed to fetch guides");
  return res.json();
}

// Fetch one guide with all steps
export async function get_guide_by_id_fetch(id) {
  const res = await fetch(`${BASE}/${id}`);
  if (!res.ok) throw new Error("Failed to fetch guide");
  return res.json();
}

// Create a guide (admin, sends cookie automatically)
export async function create_guide_fetch(body) {
  const res = await fetch(BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error("Failed to create guide");
  return res.json();
}

// Update a guide
export async function update_guide_fetch(id, body) {
  const res = await fetch(`${BASE}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error("Failed to update guide");
  return res.json();
}

// Delete a guide
export async function delete_guide_fetch(id) {
  const res = await fetch(`${BASE}/${id}`, {
    method: "DELETE",
    credentials: "include",
  });
  if (!res.ok) throw new Error("Failed to delete guide");
  return res.json();
}
