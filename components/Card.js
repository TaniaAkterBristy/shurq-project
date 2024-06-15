export default function Card({ title = "Shurq", children }) {
  return (
    <section className="border bg-white border-[#D1DCE5] rounded-lg flex flex-col justify-between ">
      <div className="text-lg font-semibold mb-2 border-b border-[#EAF1F5] py-4 px-6">
        {title}
      </div>
      <div className="py-4 px-6">{children}</div>
    </section>
  );
}
