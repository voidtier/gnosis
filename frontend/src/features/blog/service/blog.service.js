export async function create_blog(form_data) {
  const response = await fetch(`http://localhost:5000/api/blog`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(form_data),
    credentials: "include",
  });

  if (!response) {
    throw new Error({ message: "couldn't fetch post request", success: false });
  }
  return response.json();
}

export async function get_blog() {
  const response = await fetch(`http://localhost:5000/api/blog`);

  if (!response) {
    throw new Error({ message: "couldn't fetch blog", success: false });
  }
  return response.json();
}

export async function update_blog(form_data, blog_id) {
  const response = await fetch(`http://localhost:5000/api/blog/:${blog_id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(form_data),
  });

  if (!response) {
    throw new Error({
      message: "couldn't fetch update request",
      success: false,
    });
  }
  return response.json();
}

export async function delete_blog(blog_id) {
  const response = await fetch(`http://localhost:5000/api/blog/:${blog_id}`, {
    method: "DELETE",
  });

  if (!response) {
    throw new Error({
      message: "couldn't fetch delete request",
      success: false,
    });
  }
  return response.json();
}
