export function TextStaticList(props) {
  return (
    <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
      <div className="text-lg mb-1 text-slate-800">{props.text}</div>
      <div className="text-sm text-slate-600">{props.pinyin}</div>
    </div>
  );
}
