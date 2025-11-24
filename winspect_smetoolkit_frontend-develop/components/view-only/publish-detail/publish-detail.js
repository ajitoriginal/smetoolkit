import styles from "../view-only-content.module.scss";
const PublishDetail = (props) => {
  const { label, value, services = null } = props;
  const serviceLength = services?.length;
  return (
    <div className={styles.publishDetail}>
      <div className={styles.label}>{label}:</div>
      <div className={styles.value}>
        {services == null ? (
          value
        ) : (
          <>
            <div className={styles.serviceLink}>{serviceLength} Services</div>
            <div className={styles.serviceList}>
              {services.map((service, index) => {
                return `${service.serviceName}${
                  index < serviceLength - 1 && serviceLength > 1 ? ", " : ""
                }`;
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PublishDetail;
