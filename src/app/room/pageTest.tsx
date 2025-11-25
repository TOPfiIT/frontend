import styles from "./room.module.scss";
import CodeEditor from "./AceEditor";
// TOKEN
export default async function Page() {
  return (
    <div className={styles.room}>
      <h1>Room id: TOKEN</h1>
      <div className={styles.editorContainer}>
        <CodeEditor height="600px" mode="javascript" theme="monokai" />
      </div>
    </div>
  );
}
