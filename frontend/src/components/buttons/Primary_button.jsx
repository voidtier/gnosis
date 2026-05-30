export default function Primary_button({ button_text, button_class, onClick }) {
  return (
    <>
      <button
        onClick={onClick}
        className={`bg-transparent text-zinc-200/60 text-sm hover:bg-zinc-600/40 hover:text-zinc-200/60 duration-350 ${button_class}`}
      >
        {button_text}
      </button>
    </>
  );
}
