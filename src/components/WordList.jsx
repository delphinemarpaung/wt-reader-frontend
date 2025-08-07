import Button from "@mui/material/Button";

export function WordList(props) {
  return (
    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <span className="text-lg font-medium">{props.word}</span>
          <span className="text-sm text-gray-600">({props.pinyin})</span>
        </div>
        <p className="text-sm text-gray-600 mt-1">{props.meaning}</p>
      </div>
      <Button
        variant="outlined"
        size="small"
        style={{
          backgroundColor: "#FFFFFF",
          fontSize: "10px",
        }}
        onClick={props.onClick}
      >
        +Flashcard
      </Button>
    </div>
  );
}
