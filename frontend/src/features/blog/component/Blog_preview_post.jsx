export default function Blog_preview({ blog_post = {}, classes }) {
  return (
    <>
      <article className={`${classes}`}>
        <div className="flex-1 min-w-0">
          <div className="flex gap-2 mb-2">
            {blog_post.tag.map((t) => (
              <span
                key={t}
                className="text-xs text-zinc-700 border border-zinc-800 px-2 py-0.5 rounded-md"
              >
                {t}
              </span>
            ))}
          </div>
          <h2 className="text-zinc-300 text-base font-normal mb-2 group-hover:text-zinc-100 transition-colors duration-200 leading-snug">
            {blog_post.title}
          </h2>
          <p className="text-zinc-500 text-sm leading-relaxed line-clamp-2">
            {blog_post.description}
          </p>
        </div>
        <div className="text-right shrink-0">
          <p className="text-xs text-zinc-700 mb-1">{blog_post.date}</p>
          <p className="text-xs text-zinc-700">{blog_post.read} read</p>
        </div>
      </article>
    </>
  );
}
