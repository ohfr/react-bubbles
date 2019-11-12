import React, { useState } from "react";
import { api } from '../utils/api';

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors, deleted, setDeleted }) => {
  console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);

  //add Color state
  const [color, setColor] = useState(initialColor)

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
    api().put(`/colors/${colorToEdit.id}`, colorToEdit)
      .then(res => {
        console.log(res);
        setEditing(false);
        setDeleted(!deleted);
      })
      .catch(err => console.log(err))
  };

  const deleteColor = color => {
    // make a delete request to delete this color
    api().delete(`/colors/${color.id}`)
      .then(res => setDeleted(!deleted))
      .catch(err => console.log(err))
  };

  //add color to api
  const handleAdd = () => {
    api().post('/colors', color)
      .then(res => console.log(res))
      .catch(err => console.log(err))
  }

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => {
                    e.stopPropagation();
                    deleteColor(color)
                  }
                }>
                  x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}
      <form onSubmit={handleAdd}>
        <input type="text" name="color" placeholder="Color" onChange={e => setColor({...color, color: e.target.value})}/>
        <input type="text" name="code" placeholder="Hex Code"  onChange={e => setColor({...color, code: {hex: e.target.value}})}/>

        <button type="submit">Add Color </button>
      </form>
    </div>
  );
};

export default ColorList;
