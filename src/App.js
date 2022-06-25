import React, { useState, useEffect } from "react";
import './App.css';
import Cool from './assets/Images/cool.png';
// Import React FilePond
import { FilePond, File, registerPlugin } from "react-filepond";

// Import FilePond styles
import "filepond/dist/filepond.min.css";

// Import the Image EXIF Orientation and Image Preview plugins
// Note: These need to be installed separately
// `npm i filepond-plugin-image-preview filepond-plugin-image-exif-orientation --save`
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import FilePondPluginFileEncode from "filepond-plugin-file-encode";
import FilePondPluginImageTransform from "filepond-plugin-image-transform";
import FilePondPluginFileValidateSize from "filepond-plugin-file-validate-size";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginImageResize from "filepond-plugin-image-resize";
import FilePondPluginImageCrop from "filepond-plugin-image-crop";

registerPlugin(
  FilePondPluginImageExifOrientation,
  FilePondPluginImagePreview,
  FilePondPluginFileEncode,
  FilePondPluginFileValidateSize,
  FilePondPluginFileValidateType,
  FilePondPluginImageResize,
  FilePondPluginImageCrop,
  FilePondPluginImageTransform
);

function App() {

  const [files, setFiles] = useState([]);
  let pond = null;
  console.log("pond", pond);

  const onSubmit = () => {
    const formData = new FormData();
    // files
    //   .map((item) => item.file)
    //   .forEach((file) => formData.append("my-file", file));
    // console.log(formData);
    console.log("pond", pond);

    if (pond) {
      // pond.setOptions({
      //   server: {
      //     url: "https://httpbin.org/post",
      //     timeout: 7000
      //     // process: {
      //     //   url: "./process",
      //     //   method: "POST",
      //     //   headers: {
      //     //     "x-customheader": "Hello World"
      //     //   },
      //     //   withCredentials: false,
      //     //   onload: (response) => response.key,
      //     //   onerror: (response) => response.data,
      //     //   ondata: (formData) => {
      //     //     formData.append("Hello", "World");
      //     //     return formData;
      //     //   }
      //     // },
      //     // revert: "./revert",
      //     // restore: "./restore/",
      //     // load: "./load/",
      //     // fetch: "./fetch/"
      //   }
      // });

      const files = pond.getFiles();
      files.forEach((file) => {
        console.log("each file", file, file.getFileEncodeBase64String());
      });

      pond
        .processFiles(files)
        .then((res) => console.log(res))
        .catch((error) => console.log("err", error));
    }
  };


  return (
    <div className="App">
      <header style={{ display: 'flex', flexDirection: "column", justifyContent: "center" }}>
        <div style={{ display: "flex", width: '100%', justifyContent: "center" }}>
          <img src={Cool} alt="space boy" style={{ display: 'flex', width: '250px', height: '250px' }} />
        </div>
        <div style={{ width: '100%', justifyContent: "center" }}>
          <h3 style={{ fontFamily: 'Poppins', fontSize: '50px', marginTop: 0, marginBottom: 0 }}>
            Flash Uploads With Custom Crop Using <span style={{ fontWeight: '100', fontSize: "20px", textDecoration: "underline" }}>FilePond</span>
          </h3>
        </div>
        <div style={{ width: '100%', justifyContent: "center" }}>
          <p>This is a Small component which i built using FilePond Where You can upload '∞' number of Images with a Fixed Res(1920x328) </p>
        </div>

      </header>
      <div style={{ width: '1700px', marginTop: '50px', marginLeft: '50px' }}>
        <FilePond
          files={files}
          ref={(ref) => {
            pond = ref;
          }}
          required
          acceptedFileTypes={["application/pdf", "image/*"]}
          fileValidateTypeDetectType={(source, type) =>
            // Note: we need this here to activate the file type validations and filtering
            new Promise((resolve, reject) => {
              // Do custom type detection here and return with promise
              resolve(type);
            })
          }
          allowFileEncode
          allowImageTransform
          imagePreviewHeight={328}
          imageCropAspectRatio={"240:41"}
          imageResizeTargetWidth={100}
          imageResizeTargetHeight={100}
          imageResizeMode={"cover"}
          imageTransformOutputQuality={50}
          imageTransformOutputQualityMode="optional"
          imageTransformBeforeCreateBlob={(canvas) =>
            new Promise((resolve) => {
              // Do something with the canvas, like drawing some text on it
              const ctx = canvas.getContext("2d");
              ctx.font = "48px serif";
              ctx.fillText("Hello world", 10, 50);

              console.log("imageTransformBeforeCreateBlob", ctx, canvas);

              // return canvas to the plugin for further processing
              resolve(canvas);
            })
          }
          imageTransformAfterCreateBlob={(blob) =>
            new Promise((resolve) => {
              // do something with the blob, for instance send it to a custom compression alogrithm
              console.log("imageTransformAfterCreateBlob", blob);

              // return the blob to the plugin for further processing
              resolve(blob);
            })
          }
          onupdatefiles={setFiles}
          instantUpload={false}
          allowMultiple={true}
          maxFiles={1000}
          name="files"
          labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
        />
      </div>

    </div>
  );
}

export default App;
