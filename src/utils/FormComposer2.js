import { TextField } from "@mui/material";
import { v4 as uuidv4 } from "uuid";

class FormComposer2 {
  constructor(name, title, subTitle, theme, mode = "light") {
    this.name = name;
    this.fields = [];
    this.title = title;
    this.subTitle = subTitle;
    this.theme = theme;
    this.buttons = [];
    this.mode = mode;
  }

  addRequiredTextField(name, placeholder, changeHandler, ...otherProps) {
    const newTextField = (
      <TextField
        name={name}
        placeholder={placeholder}
        onChange={changeHandler}
        {...otherProps}
        required
        fullWidth
      />
    );
    this.fields.push(newTextField);
    return this;
  }
}

export default FormComposer2;
