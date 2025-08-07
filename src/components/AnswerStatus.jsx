import { CheckCircle2, XCircle } from "lucide-react";

export function AnswerStatus(props) {
  if (props.status === 1) {
    return (
      <div className="flex items-center gap-2 text-emerald-600 bg-emerald-50 p-2 rounded-lg border border-emerald-200">
        <CheckCircle2 className="h-5 w-5" />
        <span className="font-medium">{props.message}</span>
      </div>
    );
  } else if (props.status === -1) {
    return (
      <div className="flex items-center gap-2 text-rose-600 bg-rose-50 p-2 rounded-lg border border-rose-200">
        <XCircle className="h-5 w-5" />
        <span className="font-medium">{props.message}</span>
      </div>
    );
  } else {
    return <div></div>;
  }
}
