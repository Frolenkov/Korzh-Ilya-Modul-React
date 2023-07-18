import { CircularProgress } from "@mui/material";
import { useState } from "react";
import { URLWithoutGQL } from '../../constants';
import style from "./ThirdPage.module.css";

export const ThirdPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [fileURL, setFileUrl] = useState("");
  const [fileID, setFileID] = useState("");
  const [file, setFile] = useState("");


  const [dragEnter, setDragEnter] = useState(false);



  const dragEnterHandler = (e) => {

    e.preventDefault();
    e.stopPropagation();

    setDragEnter(true);
  };

  const dragLeaveHandler = (e) => {

    e.preventDefault();
    e.stopPropagation();

    setDragEnter(false);
  };


  const postFiles = async (file) => {

    const formData = new FormData();

    formData.append("media", file);

    const response = await fetch(`${URLWithoutGQL}/upload`, {
      method: "POST",
      headers: localStorage.authToken
        ? { Authorization: "Bearer " + localStorage.authToken }
        : {},
      body: formData,
    })

    const data = await response.json();

    console.log(data);

    setFileUrl(data.url);
    setFileID(data._id);

  }


  const fileUploadHandler = async (e) => {
    setIsLoading(true);

    const files = e.target.files
    await postFiles(files[0]);
    setIsLoading(false);
  };


  const dropHandler = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    setIsLoading(true);
    const files = e.dataTransfer.files;
    await postFiles(files[0]);
    console.log(postFiles);
    setIsLoading(false);
  };

  return (<div>{!dragEnter ? <div
    onDragEnter={(e) => dragEnterHandler(e)}
    onDragLeave={(e) => dragLeaveHandler(e)}
    onDragOver={(e) => dragEnterHandler(e)}
    className={style.labelFile}
  >
    {isLoading ? <CircularProgress /> :

      <label>
        Upload your media
        <br />
        (png, jpg, pdf)
        <input
           accept=".jpg,.jpeg,.png,.pdf"
          multiple={true}
          onChange={(e) => fileUploadHandler(e)}
          type="file"
          className={style.inputFile}
        />
      </label>}
  </div> :


    <div
    onDragEnter={(e) => dragEnterHandler(e)}
    onDragOver={(e) => dragEnterHandler(e)}
    onDragLeave={(e) => dragLeaveHandler(e)}
    onDrop={(e) => dropHandler(e)}
    className={style.labelFile}
  >
    Drop files here
  </div>
  }
    {fileURL && <div><img src={`${URLWithoutGQL}/${fileURL}`} /></div>}
  </div>);

};
