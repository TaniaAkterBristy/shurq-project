const colors = {
  primary:
    "bg-slate-100 rounded-md text-slate-800 border border-slate-300 w-full",
  secondary:
    "border-shurqBlue rounded-md text-shurqBlue border hover:border-shurqBlue50 hover:bg-slate-100 ",
};

export default function Input(props) {
  const { color, additionalClasses, paddings, placeholder, ...rest } = props;
  return (
    <div className="mb-2">
      <div className="text-sm">{placeholder}</div>
      <input
        className={`${
          colors[color] || colors["primary"]
        } ${additionalClasses} ${paddings || "px-6 py-3"}`}
        {...rest}
      >
        {props.children}
      </input>
    </div>
  );
}
