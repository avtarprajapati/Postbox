import { useState, useEffect } from "react";
import { fireStorage } from "./config";

const useStorage = (file) => {
  const [progress, setProgress] = useState(0);
  const [url, setUrl] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const storageRef = fireStorage.ref().child(file.name);
    storageRef.put(file).on(
      "state_changed",
      (snap) => {
        const percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
        setProgress(percentage);
      },
      (err) => {
        console.log("Error: ", err);
        setError(err);
      },
      (compelete) => {
        const imgUrl = storageRef.getDownloadURL();
        setUrl(imgUrl);
      }
    );
  }, [file]);

  return { progress, url, error };
};

export default useStorage;
