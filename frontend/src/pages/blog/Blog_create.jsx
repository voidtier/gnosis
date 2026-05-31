import { useState } from "react";
import Input from "../../components/input/Input";
import Label from "../../components/label/Title_based_label";
import Section_header from "../../components/utils/Section_page_header";
import { create_blog_controller } from "../../features/blog/controller/blog.controller";
import Primary_button from "../../components/buttons/Primary_button";

export default function Blog_create() {
  const [loading, set_loading] = useState(true);
  const [is_error, set_is_error] = useState(false);
  const [form, set_form] = useState({
    title: "",
    description: "",
    tag: "",
    status: "draft",
  });

  function handle_submit(e) {
    e.preventDefault();
    set_loading(true);
    set_is_error(false);
    async function submit_form() {
      const response = await create_blog_controller(form);
      if (!response.success) {
        return (set_loading(true), set_is_error(true));
      }
      console.log(response.message);
      set_loading(false);
      set_is_error(false);
    }
    submit_form();
  }

  function handle_input(e) {
    set_form((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  }

  return (
    <>
      <main className="min-h-screen w-full">
        <div>
          <Section_header section_name="Blog-Create" />
          <div className="flex flex-col justify-center items-center border-b border-b-zinc-800 ">
            <form
              onSubmit={handle_submit}
              className="flex flex-col gap-y-3 py-10 px-5 max-w-[40%]"
            >
              {is_error && (
                <div className="text-xs text-red-400/80 border border-red-900/40 bg-red-900/10 rounded-xl px-4 py-3 text-center">
                  Something went wrong. Please try again.
                </div>
              )}
              <div>
                <Label children={"title"} />
                <Input
                  type="Text"
                  name="title"
                  value={form.title}
                  onChange={handle_input}
                  placeholder={"Blog Title"}
                />
              </div>
              <div>
                <Label children={"description"} />
                <Input
                  name="description"
                  type="Text"
                  onChange={handle_input}
                  placeholder={"Blog Description"}
                  value={form.description}
                />
              </div>
              <div>
                <Label children={"tag"} />
                <Input
                  name="tag"
                  type="Text"
                  onChange={handle_input}
                  placeholder={"Blog Tags..."}
                  value={form.tag}
                />
              </div>
              <div className="flex flex-col ">
                <Label children={"Status"} />
                <select
                  name="status"
                  value={form.status}
                  onChange={handle_input}
                  className="bg-ink-deep border border-zinc-800 rounded-sm py-1 px-2 mt-2"
                >
                  <option value="published">Published</option>
                  <option value="draft">Draft</option>
                </select>
              </div>
              <Primary_button
                button_text={"Create Blog"}
                button_class={"my-2.5"}
              />
            </form>
          </div>
        </div>
      </main>
    </>
  );
}
