export default function Ghost_button({ button_text, button_class }) {
  return (
    <>
      <button
        className={`bg-transparent text-zinc-800/60 duration-350 ${button_class}`}
      >
        {button_text}
      </button>
    </>
  );
}
