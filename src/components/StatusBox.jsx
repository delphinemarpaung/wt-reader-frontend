export function StatusBox(props) {
  var textClass = props.count > 0 ? "text-white " : "text-indigo-700 ";
  var bgClass = "bg-indigo-600 ";
  if (props.count === 0) {
    bgClass = "bg-indigo-100 ";
  } else if (props.count < 10) {
    bgClass = "bg-indigo-500 ";
  }

  return (
    <div className="text-center">
      <div
        className={
          textClass +
          bgClass +
          "w-10 h-10 rounded-full flex items-center justify-center font-medium mb-1 shadow-sm"
        }
      >
        {props.count}
      </div>
      <div className="text-xs text-slate-600">Box {props.idx}</div>
    </div>
  );
}
