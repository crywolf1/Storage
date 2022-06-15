import React, { useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import "./FileComponent.css";

import "firebaseui/dist/firebaseui.css";
import { storage, db } from "../firebase";
import { makeStyles } from "@material-ui/core";
import Modal from "@material-ui/core/Modal";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  getMetadata,
} from "firebase/storage";
import {
  collection,
  getDocs,
  doc,
  setDoc,
  Timestamp,
  addDoc,
} from "firebase/firestore";

function getModalStyle() {
  return {
    top: `50%`,
    left: `50%`,
    transform: `translate(-50%, -50%)`,
  };
}
const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const FileComponent = () => {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };
  const handleUpload = () => {
    setUploading(true);
    const FileRef = ref(storage, `files/${file.name}`);
    uploadBytes(FileRef, file).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        (async function () {
          const newFile = doc(collection(db, "myFiles"));
          await setDoc(newFile, {
            date: Timestamp.fromDate(new Date()),
            caption: file.name,
            fileUrl: url,
            size: snapshot.metadata.size,
          });
        })();
        setUploading(false);
        setOpen(false);
        setFile(null);
      });

      getMetadata(FileRef).then((meta) => {
        console.log(meta.size);
      });
    });
  };
  return (
    <div className="file">
      <div className="file__container" onClick={handleOpen}>
        <AddIcon fontSize="large" />
        <p>New</p>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div style={modalStyle} className={classes.paper}>
          <p>Select files you want to upload!</p>
          {uploading ? (
            <p>Uploading...</p>
          ) : (
            <>
              <input type="file" onChange={handleChange} />{" "}
              <button onClick={handleUpload}>Upload</button>
            </>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default FileComponent;
