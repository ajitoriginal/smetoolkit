import { useRouter } from "next/router";
import TemplateServices from "../../../api/services/TemplateServices";
import PrimaryButton from "../../../atoms/primary-button";
import useLoaderStore from "../../../stores/loaderStore";
import Breadcrumb from "./breadcrumb";
import styles from "./header.module.scss";
import { url } from "../../../utils/url";
import WarningModal from "../../common/modals/warning-modal";
import { useState } from "react";
import { toast } from "react-toastify";
import useGenerateStore from "../../../stores/generalStore";
const RemarkHeader = () => {
  const { setLoader } = useLoaderStore();
  const [modal, setModal] = useState(false);
  const router = useRouter();
  const { template } = router.query;
  const { isDraft } = useGenerateStore();
  async function publishTheTemplate() {
    setLoader(true);
    let data = {
      templateId: template,
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
    <div className={styles.header}>
      <Breadcrumb />
      {isDraft ? (
        <PrimaryButton text="Publish" onClick={() => setModal(true)} />
      ) : (
        <PrimaryButton text="In Use" disabled />
      )}
      {modal && (
        <WarningModal
          heading="Publish the template"
          warning="Are you sure you want to publish this template?"
          btntext="Publish"
          redirect={publishTheTemplate}
          closeFunction={() => setModal(false)}
        />
      )}
    </div>
  );
};
export default RemarkHeader;
