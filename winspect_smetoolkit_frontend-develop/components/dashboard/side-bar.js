import useGenerateStore from "../../stores/generalStore";
import { url } from "../../utils/url";
import styles from "./side-bar.module.scss";
import Link from "next/link";

export default function SideBar({ status, show = false, backLink }) {
  const { setShowAddDraftPopup } = useGenerateStore();
  const sideBarItem = [
    {
      icon: "/images/home.svg",
      name: "Home",
      url: url.publishTemplates,
    },
    {
      icon: "/images/add-draft-icon.svg",
      name: "Create Draft",
      url: null,
      id: "createDraft",
    },
    {
      icon: "/images/settings.svg",
      name: "Settings",
      url: "/settings",
    },
  ];

  const handleDraftClick = () => {
    setShowAddDraftPopup(true);
  };

  return show ? (
    <div className={`${styles.sideBar} dFlex justifySB alignC  ${styles.main}`}>
      <img src="/images/logo.svg" alt="logo" />
      <ul>
        {sideBarItem.map((item, index) => (
          <li key={index}>
            {item.url !== null ? (
              <Link
                href={item.url}
                className={`${status === index ? styles.active : ""}`}
                id={`sidebar${index}`}
              >
                <span
                  className={`${
                    status === index ? styles.active : ""
                  } dFlex justifyC alignC`}
                >
                  <img src={item.icon} alt={`${item.name} icon`} />
                </span>
              </Link>
            ) : (
              <div
                className={`${status === index ? styles.active : ""}`}
                id={`sidebar${index}`}
                onClick={() => {
                  if (item.id == "createDraft") {
                    handleDraftClick();
                  }
                }}
              >
                <span
                  className={`${
                    status === index ? styles.active : ""
                  } dFlex justifyC alignC`}
                >
                  <img src={item.icon} alt={`${item.name} icon`} />
                </span>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  ) : (
    <div className={`${styles.sideBar} dFlex justifySB alignC ${styles.inner}`}>
      <Link href={url.publishTemplates}>
        <img src="/images/back-arrow.svg" alt="back-arrow" />
      </Link>
    </div>
  );
}
