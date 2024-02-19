import styles from "./StatusStoryStyle.module.scss";

export default function StatusStory(type) {
  return <section className={`${styles.wrapStatus} ${styles[type]}`}></section>;
}
