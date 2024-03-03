import Image from "next/image";
import styles from "./LoaingWrapperMainStyle.module.scss";
import loadingAnimation from "@/../public/assets/animations/loading_button_image.svg";

export default function LoadingWrapperMain({ children, isLoading = false }) {
  return (
    <div className={styles.wrap}>
      {isLoading ? (
        <div className={styles.wrap_load}>
          <Image src={loadingAnimation} alt="animation load" />
        </div>
      ) : (
        children
      )}
    </div>
  );
}
