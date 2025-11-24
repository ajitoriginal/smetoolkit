import { useRouter } from "next/router";
import WarningModal from "../../common/modals/warning-modal";
import styles from "../view-only-content.module.scss";
import TemplateServices from "../../../api/services/TemplateServices";
import { useState } from "react";
import { url } from "../../../utils/url";
import { toast } from "react-toastify";
const DraftHeader = (props) => {
  const { publishDetail, templateName, setLoader, templateID } = props;
  //publish draft template
  const [modal, setModal] = useState(false);

  const router = useRouter();
  async function publishTheTemplate() {
    setLoader(true);
    let data = {
      templateId: templateID,
    };
    let result = await TemplateServices.publishTemplate(data);
    setModal(false);
    if (result.status == 200) {
      setLoader(false);
      toast.success("Template published, redirecting to dashboard..");
      setTimeout(function () {
        router.push(`${url.publishTemplates}`);
      }, 2000);
    } else if (result.status == 400) {
      setLoader(false);
      toast.error(result.message);
    }
  }
  return (
    <>
      <div className={`${styles.viewHeader} dFlex justifySB alignC`}>
        <div className={styles.headerLeft}>
          <h2 className={styles.templateName}>
            Creating a {templateName} v{publishDetail?.version} template
          </h2>
        </div>
        <div className={`${styles.headerRight}`}>
          <span
            className={styles.publish}
            onClick={() => setModal(true)}
            id="publishButton"
          >
            Publish
          </span>
        </div>
      </div>
      {modal && (
        <WarningModal
          heading="Publish the template"
          warning="Are you sure you want to publish this template?"
          btntext="Publish"
          redirect={publishTheTemplate}
          closeFunction={() => setModal(false)}
        />
      )}
    </>
  );
};

export default DraftHeader;
