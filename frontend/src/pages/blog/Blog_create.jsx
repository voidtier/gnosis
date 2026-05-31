import { useState } from "react";
import { create_blog_controller } from "../../features/blog/controller/blog.controller";
export default function Blog_create() {
  const [loading, set_loading] = useState(false);
  const [is_error, set_is_error] = useState(false);
  const [form, set_form] = useState({
    title: "",
    description: "",
    tag: "",
    status: "draft",
  });
  async function handle_submit(e) {
    e.preventDefault();
    set_loading(true);
    set_is_error(false);
    const response = await create_blog_controller(form);
    if (!response.success) {
      set_is_error(true);
      set_loading(false);
      return;
    }
    console.log(response.message);
    set_loading(false);
  }
  function handle_input(e) {
    set_form((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }
  return (
    <main className="bg-canvas min-h-screen w-full">
      {/* Header */}
      <div className="px-lg pt-lg pb-md border-b border-hairline">
        <p className="text-xs tracking-xs uppercase text-mute mb-3">
          Gnosis · Blog
        </p>
        <h1 className="text-title-lg text-ink font-regular mb-2">
          Create Blog
        </h1>
        <p className="text-body-md text-body">Write a new blog post</p>
      </div>
      {/* Form */}
      <div className="flex flex-col justify-center items-center border-b border-hairline">
        <form
          onSubmit={handle_submit}
          className="flex flex-col gap-y-md py-xl px-lg w-full max-w-[40%]"
        >
          {is_error && (
            <div className="badge-vintage-danger justify-center text-center">
              Something went wrong. Please try again.
            </div>
          )}
          <div>
            <label className="label-vintage">Title</label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handle_input}
              placeholder="Blog Title"
              className="input-vintage"
            />
          </div>
          <div>
            <label className="label-vintage">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handle_input}
              placeholder="Blog Description"
              className="textarea-vintage"
              rows={4}
            />
          </div>
          <div>
            <label className="label-vintage">Tag</label>
            <input
              type="text"
              name="tag"
              value={form.tag}
              onChange={handle_input}
              placeholder="Blog Tags..."
              className="input-vintage"
            />
          </div>
          <div>
            <label className="label-vintage">Status</label>
            <select
              name="status"
              value={form.status}
              onChange={handle_input}
              className="select-vintage"
            >
              <option value="published">Published</option>
              <option value="draft">Draft</option>
            </select>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary btn-md mt-md"
          >
            {loading ? "Saving..." : "Create Blog"}
          </button>
        </form>
      </div>
    </main>
  );
}
