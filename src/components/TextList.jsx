import { Copy, Ear } from "lucide-react";
import Button from "@mui/material/Button";

export function TextList(props) {
  return (
    <div className="overflow items-center justify-between p-3 bg-gray-50 rounded-lg mb-4">
      <div className="p-2 m-2" onClick={props.onClick}>
        <span className="text-3xl">{props.text}</span>
        <div className="text-base text-gray-600 mt-2">{props.pinyin}</div>
      </div>
      <div className="m-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigator.clipboard.writeText(props.text)}
          className="hover:bg-gray-200"
        >
          <Copy className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
