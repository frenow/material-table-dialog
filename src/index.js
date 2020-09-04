import React, { Fragment, useState, useEffect } from "react";
import { render } from "react-dom";

import { Button, TextField, Paper } from "@material-ui/core";
import { Edit as EditIcon, Add as AddIcon } from "@material-ui/icons";
import MaterialTable from "material-table";

import MyDialog from "./MyDialog.js";
import tableIcons from "./TableIcons.js";

const rando = max => Math.floor(Math.random() * max);

const words = ["Paper", "Rock", "Scissors"];

const rawData = [];
for (let i = 0; i < 100; i++) {
  rawData.push({ id: rando(300), word: words[i % words.length] });
}

const columns = [
  { title: "Id", field: "id" },
  { title: "Word", field: "word" }
];

const App = () => {
  const [data, setData] = useState(rawData);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogWord, setDialogWord] = useState("");
  const [dialogId, setDialogId] = useState("");

  const handleDialogClose = event => {
    setIsDialogOpen(false);
  };

  const handleId = event => {
    setDialogId(event.target.value);
  };

  const handleWord = event => {
    setDialogWord(event.target.value);
  };

  const handleAddNewRow = event => {
    if (!dialogId || !dialogWord) return;

    setData(
      // Here you can add the new row to whatever index you want
      [{ id: dialogId, word: dialogWord }, ...data]
    );
  };

  useEffect(
    () => {
      // Closes dialog after saving
      if (isDialogOpen) {
        setIsDialogOpen(false);
      }
    },
    [data],
    [isDialogOpen]
  );

  useEffect(() => {
    // Clears the inputs if `isDialogOpen` equals `false`
    if (!isDialogOpen) {
      setDialogId("");
      setDialogWord("");
    }
  }, [isDialogOpen]);

  const actions = [
    {
      icon: () => <AddIcon />,
      tooltip: "Add User",
      isFreeAction: true,
      onClick: (event, rowData) => {
        setIsDialogOpen(true);
      }
    },
    {
      icon: () => <EditIcon />,
      tooltip: "Edit User",
      onClick: (event, rowData) => {
        setIsDialogOpen(true);
      }
    }
  ];

  return (
    <Fragment>
      <MaterialTable
        data={data}
        columns={columns}
        actions={actions}
        title="Custom Add Row"
        icons={tableIcons}
      />

      <MyDialog
        title="Add User"
        isOpen={isDialogOpen}
        onClose={handleDialogClose}
      >
        <Paper style={{ padding: "2em" }}>
          <div>
            <TextField
              defaultValue={dialogId}
              value={dialogId}
              onInput={handleId}
              label="Id"
            />
          </div>
          <div>
            <TextField value={dialogWord} onInput={handleWord} label="Word" />
          </div>
          <div style={{ marginTop: "3em" }}>
            <Button onClick={handleAddNewRow}>Save</Button>
            <Button onClick={handleDialogClose}>Cancel</Button>
          </div>
        </Paper>
      </MyDialog>
    </Fragment>
  );
};

render(<App />, document.querySelector("#root"));
