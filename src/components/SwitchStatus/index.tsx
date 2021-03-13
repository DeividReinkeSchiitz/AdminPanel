import React from "react";
import { FormControlLabel, FormGroup } from "@material-ui/core";

import { BlueSwitch } from "./styles";

interface PropsI {
  checked: boolean;
  handleChecked: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Switch = (props: PropsI) => {
  return (
    <FormGroup>
      <FormControlLabel
        control={
          <BlueSwitch checked={props.checked} onChange={props.handleChecked} />
        }
        label={props.checked ? "Pago" : "Não Pago"}
      />
    </FormGroup>
  );
};

export default Switch;
