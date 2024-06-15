const colors = {
  primary:
    "bg-shurqBlue rounded-md cursor-pointer text-white no-underline hover:bg-shurqBlue50 disabled:opacity-50 disabled:from-intoscale-blue-light disabled:to-intoscale-blue-light disabled:shadow-none disabled:border-blue-600 disabled:cursor-not-allowed",
  secondary:
    "border-shurqBlue rounded-md text-shurqBlue border hover:border-shurqBlue50 hover:bg-slate-100 ",
  "loading-primary":
    "cursor-not-allowed shadow-none bg-blue-300 border-blue-400 rounded-sm text-white no-underline",
  "loading-secondary":
    "cursor-not-allowed shadow-none bg-none border-[#d7dae0] text-[#9da4af] bg-gray-100 rounded-sm text-white no-underline",
  green:
    "bg-gradient-to-b from-[#20dc9e] to-[#20a272] shadow-innerBtnWhite2 border border-[#35a581] rounded-sm cursor-pointer text-white no-underline hover:from-[#20a272] hover:to-[#20dc9e] active:relative active:top-[2px] focus:ring-2 focus:ring-green-500 focus:border-white focus:outline-none disabled:opacity-50 disabled:from-intoscale-blue-light disabled:to-intoscale-blue-light disabled:shadow-none disabled:border-green-600 disabled:cursor-not-allowed",
  red: "bg-gradient-to-b from-[#ff6470] to-[#e0214d] shadow-innerBtnWhite2 border border-[#bf495c] rounded-sm cursor-pointer text-white no-underline hover:from-[#e0214d] hover:to-[#ff6470] active:relative active:top-[2px] focus:ring-2 focus:ring-red-500 focus:border-white focus:outline-none disabled:opacity-50 disabled:from-intoscale-blue-light disabled:to-intoscale-blue-light disabled:shadow-none disabled:border-red-600 disabled:cursor-not-allowed",
  transparent:
    "cursor-pointer focus:outline-none text-gray-400 hover:text-blue-400 hover:bg-[#f8fafd]",
};

export default function Button(props) {
  const { color, additionalClasses, paddings, ...rest } = props;
  return (
    <button
      className={`${colors[color] || colors["primary"]} ${additionalClasses} ${
        paddings || "px-6 py-3"
      } flex justify-center `}
      {...rest}
    >
      {props.children}
    </button>
  );
}
