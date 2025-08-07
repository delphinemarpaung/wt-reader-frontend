import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";

export function OptionList(props) {
  return (
    <div>
      <ListItem alignItems="flex-start">
        <ListItemText
          primary={props.text}
          onClick={props.onClick}
        ></ListItemText>
      </ListItem>
      <Divider component="li" />
    </div>
  );
}
