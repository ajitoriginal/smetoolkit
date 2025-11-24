import { useRouter } from "next/router";
import TemplateDetailComponent from "../../../../components/view-only/template-detail";
import Template from "../../../../components/layouts/template/Template";
import { url } from "../../../../utils/url";
import useGenerateStore from "../../../../stores/generalStore";
import { useEffect } from "react";
export default function TemplateDetail() {
  const router = useRouter();
  const { mastertemplate, template } = router.query;
  const { setIsDraft } = useGenerateStore();
  useEffect(() => {
    setIsDraft(false);
  }, []);
  return (
    <Template backLink={url.publishTemplates}>
      <TemplateDetailComponent
        template={template}
        mastertemplate={mastertemplate}
      />
    </Template>
  );
}
