import React, { useEffect } from "react";
import useStorage from "../firebase/useStorage";

function ProgressBar({ file, clearFile, upload }) {
  const { progress, url } = useStorage(file);
  useEffect(() => {
    if (url) {
      upload(url);
      clearFile();
    }
  }, [url, file, upload, clearFile]);

  return <div className="progress-bar" style={{ width: `${progress}%` }}></div>;
}

export default ProgressBar;
