import { callUploadImg } from "../services/api";
class MyUploadAdapter {
  constructor(loader) {
    // The file loader instance to use during the upload.
    this.loader = loader;
  }

  // Starts the upload process.
  upload() {
    return this.loader.file.then(
      (file) =>
        new Promise(async (resolve, reject) => {
          const res = await callUploadImg(file);
          console.log("res", res);
          if (res.vcode == 0) {
            resolve({
              default: res.data.fileUploaded,
            });
          } else {
            reject(res.message);
          }
        })
    );
  }
}

function MyCustomUploadAdapterPlugin(editor) {
  editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
    return new MyUploadAdapter(loader);
  };
}

export { MyCustomUploadAdapterPlugin };
