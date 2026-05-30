export default function Label({ classes = "", children }) {
  return (
    <>
      <label
        className={`text-[10px] tracking-[0.18em] uppercase text-zinc-600 mb-2 ${classes}`}
      >
        {children}
      </label>
    </>
  );
}
