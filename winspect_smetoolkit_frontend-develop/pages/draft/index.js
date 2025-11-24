import Main from "../../components/layouts/main/Main";
import { useEffect, useState } from "react";
import CreateDraftModal from "../../components/common/modals/create-draft-template";
import TemplateTable from "../../components/home/template-table";
import TemplateServices from "../../api/services/TemplateServices";
import { useRouter } from "next/router";
import useGenerateStore from "../../stores/generalStore";

const DraftTemplates = () => {
  const [draft, setDraft] = useState();
  const [modal, setModal] = useState(false);
  const [loader, setLoader] = useState(true);
  const {
    showAddDraftPopup,
    setShowAddDraftPopup,
    createNewstate,
    setCreateNewstate,
  } = useGenerateStore();
  const router = useRouter();
  useEffect(() => {
    Draft();
  }, []);

  //for draft template
  async function Draft() {
    let result = await TemplateServices.getDraftTemplate(router);
    setDraft(result);
    setLoader(false);
  }

  const draftHead = ["Services templates", "Current Version", "Created", ""];

  const close = (value) => {
    setModal(value);
    setShowAddDraftPopup(value);
    setCreateNewstate(null);
  };

  const createNew = (value) => {
    setCreateNewstate(value);
  };

  return (
    <>
      <Main loader={loader}>
        <TemplateTable
          head={draftHead}
          content={draft?.body?.rows}
          openAddNew={close}
          createNew={createNew}
          drafts
          Draft={Draft}
        />
      </Main>

      {showAddDraftPopup && (
        <CreateDraftModal
          createNewstate={createNewstate}
          close={() => close(false)}
          hideTemplateSelection
        />
      )}
    </>
  );
};

export default DraftTemplates;
