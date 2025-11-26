"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

// Динамический импорт AceEditor с правильной настройкой
const AceEditor = dynamic(
  async () => {
    const ace = await import("ace-builds");
    ace.config.set(
      "basePath",
      "https://cdn.jsdelivr.net/npm/ace-builds@1.32.0/src-noconflict/"
    );

    // Импортируем необходимые модули
    await Promise.all([
      import("ace-builds/src-noconflict/mode-javascript"),
      import("ace-builds/src-noconflict/mode-typescript"),
      import("ace-builds/src-noconflict/mode-html"),
      import("ace-builds/src-noconflict/mode-css"),
      import("ace-builds/src-noconflict/mode-python"),
      import("ace-builds/src-noconflict/theme-monokai"), // Хардкод темы
      import("ace-builds/src-noconflict/theme-chaos"),
      import("ace-builds/src-noconflict/ext-language_tools"),
    ]);

    const ReactAce = await import("react-ace");
    return ReactAce.default;
  },
  {
    ssr: false,
    loading: () => (
      <div
        style={{
          height: "100%",
          background: "#122123",
          color: "#f8f8f2",
          padding: "10px",
          fontFamily: "monospace",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        Loading editor...
      </div>
    ),
  }
);

interface AceEditorProps {
  value?: string;
  onChange?: (value: string) => void;
  mode?: string;
  height?: string;
  readOnly?: boolean;
}

export default function CodeEditor({
  value = `// Write your code here`,
  onChange,
  mode = "javascript",
  height = "100%",
  readOnly = false,
}: AceEditorProps) {
  const [editorReady, setEditorReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setEditorReady(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  if (!editorReady) {
    return (
      <div
        style={{
          height,
          background: "#353535", // Хардкод цвета фона
          color: "#f8f8f2",
          padding: "10px",
          fontFamily: "monospace",
          fontSize: "14px",
          lineHeight: "1.5",
        }}
      >
        {value}
      </div>
    );
  }

  return (
    <AceEditor
      mode={mode}
      theme="chaos" // Хардкод темы
      value={value}
      onChange={onChange}
      name="code-editor"
      height={height}
      width="100%"
      fontSize={14}
      showPrintMargin={false}
      showGutter={true}
      highlightActiveLine={true}
      readOnly={readOnly}
      setOptions={{
        enableBasicAutocompletion: true,
        enableLiveAutocompletion: true,
        enableSnippets: true,
        showLineNumbers: true,
        tabSize: 2,
        useWorker: false,
      }}
      style={{
        backgroundColor: "#353535", // Хардкод цвета фона
      }}
    />
  );
}
