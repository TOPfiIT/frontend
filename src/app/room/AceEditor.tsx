"use client";

import { useEffect, useState } from "react";
import AceEditor from "react-ace";

// Импортируем необходимые модули ACE
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-typescript";
import "ace-builds/src-noconflict/mode-html";
import "ace-builds/src-noconflict/mode-css";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/theme-tomorrow_night";
import "ace-builds/src-noconflict/ext-language_tools";

interface AceEditorProps {
  value?: string;
  onChange?: (value: string) => void;
  mode?: string;
  theme?: string;
  height?: string;
  readOnly?: boolean;
}

export default function CodeEditor({
  value = `function foo(items) {
  var x = "All this is syntax highlighted";
  return x;
}`,
  onChange,
  mode = "javascript",
  theme = "monokai",
  height = "500px",
  readOnly = false,
}: AceEditorProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        style={{
          height,
          background: "#272822",
          color: "#f8f8f2",
          padding: "10px",
          fontFamily: "monospace",
        }}
      >
        {value}
      </div>
    );
  }

  return (
    <AceEditor
      mode={mode}
      theme={theme}
      value={value}
      onChange={onChange}
      name="code-editor"
      height={height}
      width="100%"
      fontSize={14}
      showPrintMargin={true}
      showGutter={true}
      highlightActiveLine={true}
      readOnly={readOnly}
      setOptions={{
        enableBasicAutocompletion: true,
        enableLiveAutocompletion: true,
        enableSnippets: true,
        showLineNumbers: true,
        tabSize: 2,
      }}
    />
  );
}
