export default function Solid_button({ button_text, button_class }) {
  return (
    <>
      <button
        className={`bg-zinc-200/60 text-zinc-600/40 hover:bg-zinc-600/40 hover:text-zinc-200/60 duration-350 ${button_class}`}
      >
        {button_text}
      </button>
    </>
  );
}
