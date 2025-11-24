import dayjs from "dayjs";
import Meta from ".";
import styles from "./meta.module.scss";
const TemplateMetas = (props) => {
  const { metaData } = props;
  const { addedDate, version } = metaData;
  const metaList = [
    {
      label: "Added",
      value: dayjs(addedDate).format("MMM D[,] YYYY"),
    },
    {
      label: "Version",
      value: version,
    },
  ];
  return (
    <div className={styles.metaWrapper}>
      {metaList.map((meta, index) => {
        if (meta.value) {
          return <Meta key={index} label={meta.label} value={meta.value} />;
        }
      })}
    </div>
  );
};

export default TemplateMetas;
