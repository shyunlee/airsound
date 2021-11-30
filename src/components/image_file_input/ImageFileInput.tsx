import React, { memo, useRef, useState } from "react";
import ImageUploader from "../../service/imageUploader";
import styles from "./image_file_input.module.css";

type ImageFileInputProps = {
  imageUploader: ImageUploader;
  onFileChange: (file: string) => string;
}

const ImageFileInput = memo(({ imageUploader, onFileChange }: ImageFileInputProps) => {
  const [loading, setLoading] = useState(false)
  const inputRef: any = useRef();

  const onButtonClick = () => {
    inputRef.current.click();
  };

  const onChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoading(true)
    const result = await imageUploader.upload(event.currentTarget.files![0])
    setLoading(false)
    if (result !== 'failed') {
      onFileChange(result)
    }
  };

  return (
    <div className={styles.container}>
      {!loading && <input
        className={styles.image_btn}
        type="button"
        name="button"
        value={'Edit Profile'}
        onClick={onButtonClick}
      />}
      <input
        ref={inputRef}
        className={styles.file_input}
        type="file"
        accept="image/*"
        name="file"
        onChange={onChange}
      />
      {loading && <div className={styles.loading}></div>}
    </div>
  );
});

export default ImageFileInput;
