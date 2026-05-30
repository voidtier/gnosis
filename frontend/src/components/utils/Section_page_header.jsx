export default function Section_header({
  section_name = "",
  section_moto = "",
}) {
  return (
    <>
      <div className="px-6 pt-6 pb-6 border-b border-zinc-800/60">
        <p className="text-xs tracking-[0.2em] uppercase text-zinc-700 mb-3">
          Gnosis · {section_name}
        </p>
        <h1 className="text-3xl text-zinc-200 font-normal mb-2">
          {section_name}
        </h1>
        <p className="text-sm text-zinc-500">{section_moto}</p>
      </div>
    </>
  );
}
