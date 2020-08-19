import React, { useState, useEffect } from "react";
import useStorage from "../firebase/useStorage";

function ProgressBar({ file, clearFile }) {
  const { progress, url } = useStorage(file);
  useEffect(() => {
    if (url) clearFile();
  }, [url, file]);

  console.log(progress, url);
  return <div className="progress-bar" style={{ width: `${progress}%` }}></div>;
}

export default ProgressBar;
