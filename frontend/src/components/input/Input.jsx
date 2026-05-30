export default function Input({
  classes = "",
  type,
  name = "",
  onChange,
  value,
  onClick,
  placeholder,
}) {
  return (
    <>
      <input
        type={type}
        name={name}
        onChange={onChange}
        onClick={onClick}
        value={value}
        placeholder={placeholder}
        className={`w-full bg-transparent border-b border-zinc-800 py-2.5 text-sm text-zinc-200 placeholder:text-zinc-800 outline-none focus:border-zinc-700 transition-colors duration-200 ${classes}`}
      />
    </>
  );
}
