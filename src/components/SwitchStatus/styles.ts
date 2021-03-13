import { withStyles } from "@material-ui/core/styles";
import Switch from "@material-ui/core/Switch";

export const BlueSwitch = withStyles({
  switchBase: {
    color: "#3F51B5",
    "&$checked": {
      color: "#3F51B5",
    },
    "&$checked + $track": {
      backgroundColor: "#3F51B5",
    },
  },
  checked: {},
  track: {},
})(Switch);
