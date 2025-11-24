import { Editor } from "primereact/editor";
import { useEffect, useRef, useState } from "react";

const TextEditor = ({ content, setContent, bottomRightHidden }) => {
  const MAX_LENGTH = 1000;
  const [charCount, setCharCount] = useState(0);
  const editorRef = useRef(null);

  useEffect(() => {
    if (!editorRef.current) return;

    const quill = editorRef.current.getQuill();
    if (!quill) return;

    // Prevent multiple listener attachments
    if (quill._hasTextChangeListener) return;
    quill._hasTextChangeListener = true;

    quill.on("text-change", (delta, oldDelta, source) => {
      // Get plain text and trim it
      const plainText = quill.getText().trim();

      // Truncate if over max length
      if (plainText.length > MAX_LENGTH) {
        // Remove excess characters
        quill.deleteText(MAX_LENGTH, plainText.length);
      }

      // Update character count
      setCharCount(Math.min(plainText.length, MAX_LENGTH));
    });
  }, []);

  return (
    <div style={{ position: "relative" }}>
      <Editor
        ref={editorRef}
        value={content}
        onTextChange={(e) => {
          // Create a temporary div to extract plain text
          const tempDiv = document.createElement("div");
          tempDiv.innerHTML = e.htmlValue;
          let newText = tempDiv.innerText.trim();

          // Enforce max length
          if (newText.length > MAX_LENGTH) {
            newText = newText.substring(0, MAX_LENGTH);

            // Get the Quill instance to trim the content
            const quill = editorRef.current?.getQuill();
            if (quill) {
              quill.setText(newText);
            }
          }

          // Update character count
          setCharCount(newText.length);

          // Update content if within limit
          if (newText.length <= MAX_LENGTH) {
            setContent(e.htmlValue);
          }
        }}
        headerTemplate={
          <div className="editor-header">
            <span className="ql-formats">
              <button className="ql-bold" aria-label="Bold"></button>
              <button className="ql-italic" aria-label="Italic"></button>
              <button className="ql-underline" aria-label="Underline"></button>
              <button
                className="ql-list"
                value="ordered"
                aria-label="Ordered List"
              ></button>
              <button
                className="ql-list"
                value="bullet"
                aria-label="Unordered List"
              ></button>
              <button
                className="ql-clean"
                aria-label="Remove Styles"
                title="Remove Format"
              ></button>
            </span>
            {charCount > 950 && bottomRightHidden && (
              <span className="char-count" style={{ color: "red" }}>
                {charCount} / {MAX_LENGTH}
              </span>
            )}
          </div>
        }
      />
      {charCount > 950 && !bottomRightHidden && (
        <span
          className="char-count"
          style={{
            color: "red",
            position: "absolute",
            right: 12,
            bottom: 4,
            backgroundColor: "#FFFFFF",
          }}
        >
          {charCount} / {MAX_LENGTH}
        </span>
      )}
    </div>
  );
};

export default TextEditor;
