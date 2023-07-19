import { CircularProgress } from "@mui/material";
import { useState } from "react";
import { URLWithoutGQL } from '../../constants';
import style from "./ThirdPage.module.css";
import { logDOM } from '@testing-library/react';

export const ThirdPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [filesURL, setfilesURL] = useState([]);
  const [fileID, setFileID] = useState([]);

  console.log(fileID);

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
      headers: localStorage.authToken ? { Authorization: "Bearer " + localStorage.authToken } : {},
      body: formData,
    });

    const data = await response.json();

    setfilesURL(prevState => [...prevState, data.url]);
    setFileID(prevState => [...prevState, data._id]);


  };

  const fileUploadHandler = async (e) => {

    setIsLoading(true);
    const files = e.target.files;
    for (const filesKey in files) {
      await postFiles(files[filesKey]);
    }

    setIsLoading(false);

  };
  const dropHandler = async (e) => {

    e.preventDefault();
    e.stopPropagation();

    setIsLoading(true);
    const files = e.dataTransfer.files;

    for (const filesKey in files) {
      await postFiles(files[filesKey]);
    }

    setIsLoading(false);
  };


  return (<div>
    {!dragEnter ? <div
        onDragEnter={(e) => dragEnterHandler(e)}
        onDragLeave={(e) => dragLeaveHandler(e)}
        onDragOver={(e) => dragEnterHandler(e)}
        className={style.labelFile}
      >

        {isLoading ? <CircularProgress /> : <label>
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

    {filesURL?.length && filesURL.map(fileURL =>
      <div key={fileURL}>
        <img className={style.picture} src={`${URLWithoutGQL}/${fileURL}`} alt="Uploaded file" />
      </div>
    )}

  </div>);

};
