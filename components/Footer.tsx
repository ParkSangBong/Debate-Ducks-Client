import { useRouter } from "next/router";
import Image from "next/image";
import { FaGithub } from "react-icons/fa";

import styles from "./Footer.module.scss";
import Link from "next/link";

export default function Footer() {
  const router = useRouter();

  return (
    <div className={`${styles.outer}`}>
      <div className={`inner ${styles.box}`}>
        <div className={styles.item}>
          <div
            className={`${styles.inner_box} ${styles.btn}`}
            onClick={() => router.push("/")}
          >
            <div>
              <Image
                src="/images/logo/debate-ducks-logo-white.png"
                alt="logo_image"
                width="18"
                height="18"
              />
            </div>
            <div className={styles.desc}>Debate Ducks</div>
          </div>
          <Link href="https://github.com/SuSang-YuHee">
            <div className={`${styles.inner_box} ${styles.btn}`}>
              <FaGithub />
              <div className={styles.desc}>SuSang-YuHee</div>
            </div>
          </Link>
        </div>
        <div className={styles.item}>
          <div></div>
          <div className={styles.desc_copy}>© 2022 SuSang-YuHee</div>
        </div>
      </div>
    </div>
  );
}
