export default function ButtonSmall({ icon, text }) {
  return (
    <button className="px-4 py-[2px] bg-[#eff9ff] text-shurqBlue rounded-md flex gap-2 justify-center items-center">
      <span className="material-symbols-rounded text-base">{icon}</span>
      <span className="text-xs">{text}</span>
    </button>
  );
}
