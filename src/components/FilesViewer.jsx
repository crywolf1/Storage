import React, { useEffect, useState } from "react";
import "./FilesViewer.css";
import { db } from "../firebase";
import FileItem from "./FileItem";
import { collection, getDocs } from "firebase/firestore";
import FileCard from "./FileCard";

const FilesViewer = () => {
  const [files, setFiles] = useState([]);

  const getallMyFile = async () => {
    const querySnapshot = await getDocs(collection(db, "myFiles"));

    setFiles(
      querySnapshot.docs.map((doc) => ({
        id: doc.id,
        item: doc.data(),
      })),
    );
  };

  useEffect(() => {
    getallMyFile();
  }, []);

  return (
    <div className="fileViewer">
      <div className="fileViewer__row">
        {files.slice(0, 5).map(({ id, item }) => (
          <FileCard key={id} name={item.caption} />
        ))}
      </div>
      <div className="fileViewer__titles">
        <div className="fileViewer__titles--left">
          <p>Name</p>
        </div>
        <div className="fileViewer__titles--right">
          <p>Last modified</p>
          <p>File size</p>
        </div>
      </div>{" "}
      {files.map(({ id, item }) => (
        <FileItem
          key={id}
          id={id}
          caption={item.caption}
          timestamp={item.date}
          fileUrl={item.fileUrl}
          size={item.size}
        />
      ))}
    </div>
  );
};

export default FilesViewer;
