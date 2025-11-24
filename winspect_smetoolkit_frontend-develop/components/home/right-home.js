import { useState, useEffect } from "react";
import HomeHeader from "./home-header";
import styles from "./right-home.module.scss";
import Table from "./table";
import Select, { components } from "react-select";
import Modal from "../common/modal";
// import ReactPaginate from "react-paginate";
import { APIurl } from "../../utils/storage";
import { useRouter } from "next/router";
import DropdownIndicator from "../common/dropdown-indicator";
// import dayjs from "dayjs";

export default function RightHome() {
  const api = APIurl();
  const [loader, setLoader] = useState(true);
  const [homeTable, setHomeTable] = useState(0);
  const [modal, setModal] = useState(false);
  const [service, setServices] = useState();
  const [draft, setDraft] = useState();
  const [aleadyExistTemp, setAleadyExistTemp] = useState();

  //calling local storage
  const [local, setlocal] = useState();
  useEffect(() => {
    const isStored = typeof window !== "undefined" && window.localStorage;
    const local = isStored && JSON.parse(localStorage.getItem("userInfo"));
    const tabValue = isStored && JSON.parse(localStorage.getItem("activeT"));
    setlocal(local);
    setHomeTable(tabValue || 0);
  }, []);

  const handleTabClick = (tab) => {
    setHomeTable(tab);
  };

  const [createNewstate, setCeateNewstate] = useState("");

  const createNew = (value) => {
    setCeateNewstate(value);
  };

  const close = (value) => {
    setModal(value);
    setCeateNewstate("");
  };

  const existTempValues = (value) => {
    setAleadyExistTemp(value);
  };

  const router = useRouter();
  function logout() {
    localStorage.clear();
    router.push("/");
  }

  //for published template
  async function Service(e) {
    let result = await fetch(
      `${api}api/v1/template/master?pageIndex=0&pageSize=100`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${local?.body.winspectSMEtoolkit.accessToken}`,
        },
      },
    );
    result = await result.json();
    setServices(result);

    setSortOption(
      service?.body?.rows.sort(function (a, b) {
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
    if (result?.error?.code == "NOT_AUTHORIZED") {
      logout();
    }
  }

  //for draft template
  async function Draft(pageIndexD) {
    let result = await fetch(
      `${api}api/v1/template/draft?pageIndex=${pageIndexD}&pageSize=100`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${local?.body.winspectSMEtoolkit.accessToken}`,
        },
      },
    );
    result = await result.json();
    setDraft(result);
    setLoader(false);
    if (result?.error?.code == "NOT_AUTHORIZED") {
      logout();
    }
  }

  //for published template
  const [publish, setPublish] = useState();
  async function publishedTemplate() {
    let result = await fetch(
      `${api}api/v1/template/master?pageIndex=0&pageSize=100`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${local?.body.winspectSMEtoolkit.accessToken}`,
        },
      },
    );
    result = await result.json();
    setPublish(result?.body?.rows);
    if (result?.error?.code == "NOT_AUTHORIZED") {
      logout();
    }
  }

  //for getting draft version template
  const [draftVersion, setVraftVersion] = useState();
  async function DraftTemplate() {
    let result = await fetch(
      `${api}api/v1/template/draft?pageIndex=0&pageSize=100`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${local?.body.winspectSMEtoolkit.accessToken}`,
        },
      },
    );
    result = await result.json();
    setVraftVersion(result?.body?.rows);
    if (result?.error?.code == "NOT_AUTHORIZED") {
      logout();
    }
  }

  //for run service and draft api's
  useEffect(() => {
    if (local != null) {
      Service();
      Draft(pageIndexD);
      publishedTemplate();
      DraftTemplate();
    }
  }, [local]);

  const publishHead = [
    "Services templates",
    "Current Version",
    "Created",
    "Published",
    "",
  ];
  const draftHead = ["Services templates", "Current Version", "Created", ""];

  // const pageCount = Math.ceil(service?.body?.count / 15);
  // const [pageIndex, setPageIndex] = useState(0);
  // const changePage = (selectedPage) => {
  //   setPageIndex(selectedPage.selected);
  //   Service(selectedPage.selected);
  // };

  const pageCountD = Math.ceil(draft?.body?.count / 15);
  const [pageIndexD, setPageIndexD] = useState(0);
  const changePageD = (selectedPage) => {
    setPageIndexD(selectedPage.selected);
    Draft(selectedPage.selected);
  };

  const [sortOption, setSortOption] = useState();
  const options = [
    { value: "Sort by Name", label: "Sort by Name" },
    { value: "Sort by Published Date", label: "Sort by Published Date" },
  ];

  return (
    <section className={styles.home}>
      <HomeHeader setDisplay={handleTabClick} createNew={createNew} />

      <div className={styles.homeContent}>
        {homeTable === 0 ? (
          <div>
            <div className="sortBox dFlex alignC">
              <Select
                options={options}
                placeholder="Sort by"
                onChange={(e) => {
                  Service(e);
                }}
                components={{ DropdownIndicator }}
                isSearchable={false}
                isClearable
              />
            </div>
            <div className={styles.homeContentHeight}>
              <Table
                head={publishHead}
                content={
                  sortOption == undefined ? service?.body?.rows : sortOption
                }
                openAddNew={close}
                createNew={createNew}
                existTempValues={existTempValues}
                publishedTemplate={Service}
                published
              />
            </div>
          </div>
        ) : (
          <div>
            <div className={styles.homeContentHeightD}>
              <Table
                head={draftHead}
                content={draft?.body?.rows}
                openAddNew={close}
                createNew={createNew}
                drafts
                Draft={Draft}
                Service={Service}
              />
            </div>
          </div>
        )}
      </div>

      {loader && (
        <div className="loader dFlex alignC justifyC">
          <span></span>
        </div>
      )}
      {modal && (
        <Modal
          heading={`Create a Draft Template ${
            createNewstate ? `For ${createNewstate.name}` : ""
          }`}
          para="Fill out the information below to get started"
          closeFunction={close}
          service={service}
          publish={publish}
          draftVersion={draftVersion}
          createNewstate={createNewstate}
        />
      )}
    </section>
  );
}
