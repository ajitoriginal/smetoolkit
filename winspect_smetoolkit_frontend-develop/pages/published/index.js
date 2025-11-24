import Main from "../../components/layouts/main/Main";
import Select from "react-select";
import { useEffect, useState } from "react";
import DropdownIndicator from "../../components/common/dropdown-indicator";
import CreateDraftModal from "../../components/common/modals/create-draft-template";
import TemplateTable from "../../components/home/template-table";
import TemplateServices from "../../api/services/TemplateServices";
import { useRouter } from "next/router";
import useGenerateStore from "../../stores/generalStore";
const PublishedTemplates = () => {
  //for run service and draft api's
  const [loader, setLoader] = useState(true);
  const [modal, setModal] = useState(false);
  const router = useRouter();
  const {
    showAddDraftPopup,
    setShowAddDraftPopup,
    setCreateNewstate,
    createNewstate,
  } = useGenerateStore();
  useEffect(() => {
    publishedTemplate();
  }, []);

  const close = (value) => {
    setModal(value);
    setShowAddDraftPopup(value);
    setCreateNewstate(null);
  };
  const [publish, setPublish] = useState([]);

  //for published template
  async function publishedTemplate(e) {
    let result = await TemplateServices.getPublishedTemplate(router);
    setPublish(result?.body?.rows);

    setSortOption(
      result?.body?.rows.sort(function (a, b) {
        if (e?.value == "Sort by Published Date") {
          return (
            new Date(a.templates[0]?.publishedAt.split("/").reverse()) -
            new Date(b.templates[0]?.publishedAt.split("/").reverse())
          );
        }
        if (e?.value == "Sort by Name") {
          if (a.name < b.name) return -1;
          if (a.name > b.name) return 1;
          return 0;
        }
      }),
    );
    setLoader(false);
  }
  const options = [
    { value: "Sort by Name", label: "Sort by Name" },
    { value: "Sort by Published Date", label: "Sort by Published Date" },
  ];
  const publishHead = [
    "Services templates",
    "Current Version",
    "Created",
    "Published",
    "",
  ];

  const [sortOption, setSortOption] = useState();

  const createNew = (value) => {
    setCreateNewstate(value);
  };

  //for published template

  return (
    <>
      <Main loader={loader}>
        <div className="sortBox dFlex alignC">
          <Select
            options={options}
            placeholder="Sort by"
            onChange={(e) => {
              publishedTemplate(e);
            }}
            components={{ DropdownIndicator }}
            isSearchable={false}
            isClearable
          />
        </div>
        <TemplateTable
          head={publishHead}
          content={sortOption == undefined ? publish : sortOption}
          openAddNew={close}
          createNew={createNew}
          publishedTemplate={publishedTemplate}
          published
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

export default PublishedTemplates;
