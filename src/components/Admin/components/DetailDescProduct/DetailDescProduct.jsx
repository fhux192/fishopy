import { useState, useEffect, useRef } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";

import {
  ClassicEditor,
  AutoImage,
  Autosave,
  Bold,
  Essentials,
  ImageBlock,
  ImageInline,
  ImageInsert,
  ImageInsertViaUrl,
  ImageResize,
  ImageStyle,
  ImageToolbar,
  ImageUpload,
  Italic,
  Link,
  LinkImage,
  Paragraph,
  SpecialCharacters,
  SpecialCharactersArrows,
  SpecialCharactersText,
  Strikethrough,
  Table,
  TableCaption,
  TableCellProperties,
  TableColumnResize,
  TableProperties,
  TableToolbar,
  Underline,
  Undo,
} from "ckeditor5";

import translations from "ckeditor5/translations/vi.js";

import "ckeditor5/ckeditor5.css";
import { MyCustomUploadAdapterPlugin } from "../../../../plugins/ckeditor-upload-adapter";

const DetailDescProduct = ({ onDetailDescChange }) => {
  const editorContainerRef = useRef(null);
  const editorRef = useRef(null);
  const [isLayoutReady, setIsLayoutReady] = useState(false);

  useEffect(() => {
    setIsLayoutReady(true);

    return () => setIsLayoutReady(false);
  }, []);

  const editorConfig = {
    toolbar: {
      items: [
        "undo",
        "redo",
        "|",
        "bold",
        "italic",
        "underline",
        "strikethrough",
        "|",
        "specialCharacters",
        "link",
        "insertImage",
        "insertTable",
      ],
      shouldNotGroupWhenFull: false,
    },
    plugins: [
      AutoImage,
      Autosave,
      Bold,
      Essentials,
      ImageBlock,
      ImageInline,
      ImageInsert,
      ImageInsertViaUrl,
      ImageResize,
      ImageStyle,
      ImageToolbar,
      ImageUpload,
      Italic,
      Link,
      LinkImage,
      Paragraph,
      SpecialCharacters,
      SpecialCharactersArrows,
      SpecialCharactersText,
      Strikethrough,
      Table,
      TableCaption,
      TableCellProperties,
      TableColumnResize,
      TableProperties,
      TableToolbar,
      Underline,
      Undo,
    ],
    image: {
      toolbar: [
        "imageTextAlternative",
        "|",
        "imageStyle:inline",
        "imageStyle:wrapText",
        "imageStyle:breakText",
        "|",
        "resizeImage",
      ],
    },
    initialData: "",
    language: "vi",
    link: {
      addTargetToExternalLinks: true,
      defaultProtocol: "https://",
      decorators: {
        toggleDownloadable: {
          mode: "manual",
          label: "Downloadable",
          attributes: {
            download: "file",
          },
        },
      },
    },
    placeholder: "Type or paste your content here!",
    table: {
      contentToolbar: [
        "tableColumn",
        "tableRow",
        "mergeTableCells",
        "tableProperties",
        "tableCellProperties",
      ],
    },
    translations: [translations],
    extraPlugins: [MyCustomUploadAdapterPlugin],
  };
  const handleEditorChange = (event, editor) => {
    const data = editor.getData();
    onDetailDescChange(data);
  };
  return (
    <div className="main-container">
      <div
        className="editor-container editor-container_classic-editor"
        ref={editorContainerRef}
      >
        <div className="editor-container__editor">
          <div ref={editorRef}>
            {isLayoutReady && (
              <CKEditor
                editor={ClassicEditor}
                config={editorConfig}
                onChange={handleEditorChange}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default DetailDescProduct;
