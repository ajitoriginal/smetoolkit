import { useState, useEffect } from "react";
import styles from "./delete.module.scss";
import { APIurl } from "../../utils/storage";
import SubcategoryServices from "../../api/services/SubcategoryServices";
import CategoryServices from "../../api/services/CategoryServices";
import AboutNotesServices from "../../api/services/AboutNotesServices";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import RemarkServices from "../../api/services/RemarkServices";

export default function Delete({
  deleteClose,
  item,
  subCategoryDelete,
  setActiveSubCat,
  setActiveCat,
  subCategoryFunc,
  categoryDelete,
  categoriesFunc,
  aboutDelete,
  aboutValueDelete,
  templateID,
  noteDelete,
  remarkDelete,
  aboutAndNotesFunc,
  passingSubCat,
  indexDefinition,
  definitionDelete,
  callDefinition,
  deleteIndexFunction,
  locationDelete,
  findLocationFunc,
}) {
  const api = APIurl();
  const router = useRouter();
  const [local, setlocal] = useState();
  useEffect(() => {
    const isStored = typeof window !== "undefined" && window.localStorage;
    const local = isStored && JSON.parse(localStorage.getItem("userInfo"));
    setlocal(local);
  }, []);

  //delete category
  async function deleteCategory(tempid, cattempid) {
    const data = {
      templateId: tempid,
      templateCategoryId: cattempid,
    };
    let result = await CategoryServices.deleteCategory(data);
    if (result.status == 200) {
      toast.success(result.message);
    }
    setActiveCat(0);
    await categoriesFunc(tempid);
  }

  //delete Sub Category
  async function deleteSubCategory(tempsubid, cattempid) {
    const data = {
      templateSubCategoryId: tempsubid,
      templateCategoryId: cattempid,
    };
    let result = await SubcategoryServices.deleteSubCategory(data);
    if (result.status == 200) {
      toast.success(result.message);
    }
    setActiveSubCat(0);
    await subCategoryFunc(cattempid);
  }

  //delete about
  async function deleteAbout(tempsubid, temAboutid) {
    const data = {
      templateSubCategoryId: tempsubid,
      templateAboutId: temAboutid,
    };
    await AboutNotesServices.deleteAboutNotes(data, true);
    await aboutAndNotesFunc(passingSubCat);
  }

  //delete about value
  async function deleteAboutValue(templateAboutId, templateAboutValueId) {
    let result = await fetch(`${api}api/v1/template/about-value`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${local?.body.winspectSMEtoolkit.accessToken}`,
      },
      body: JSON.stringify({
        templateAboutId: templateAboutId,
        templateAboutValueId: templateAboutValueId,
        templateId: templateID,
      }),
    });
    result = await result.json();
    if (result.status == 200) {
      toast.success(result.message);
    }
    await aboutAndNotesFunc(passingSubCat);
  }

  //delete notes
  async function delteNotes(tempNoteid, tempAboutValueid) {
    let result = await fetch(`${api}api/v1/template/about-value/note`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "*",
        Authorization: `Bearer ${local?.body.winspectSMEtoolkit.accessToken}`,
      },
      body: JSON.stringify({
        templateAboutValueNoteId: tempNoteid,
        templateAboutValueId: tempAboutValueid,
        templateId: templateID,
      }),
    });
    result = await result.json();
    if (result.status == 200) {
      toast.success(result.message);
    }
    await aboutAndNotesFunc(passingSubCat);
  }

  //delete remarks
  async function deleteRemarsk(temRemarkid) {
    const data = {
      templateSubCategoryId: passingSubCat,
      templateRemarkId: temRemarkid,
    };
    let result = await RemarkServices.deleteRemark(data, router);

    if (result.status == 200) {
      toast.success(result.message);
    }
    await aboutAndNotesFunc(passingSubCat);
  }

  //delete definition
  async function deleteDefinition(id) {
    let result = await fetch(`${api}api/v1/template/definition`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${local?.body.winspectSMEtoolkit.accessToken}`,
      },
      body: JSON.stringify({
        templateDefinitionId: id,
      }),
    });
    callDefinition();
    if (result.status == 200) {
      deleteIndexFunction(indexDefinition);
      setTimeout(() => {
        deleteIndexFunction(null);
      }, 5000);
    }
  }

  //delete location
  async function deleteLocation(id) {
    let result = await fetch(`${api}api/v1/template/location`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${local?.body.winspectSMEtoolkit.accessToken}`,
      },
      body: JSON.stringify({
        templateLocationId: id,
      }),
    });
    findLocationFunc(templateID);
    // if (result.status == 200) {
    //   deleteIndexFunction(indexDefinition);
    //   setTimeout(() => {
    //     deleteIndexFunction(null);
    //   }, 5000);
    // }
  }

  return (
    <div
      className={`${styles.deleteModal} dFlex alignC justifyC`}
      onClick={(e) => e.stopPropagation()}
    >
      <div className={styles.modalbox}>
        <h3>
          Delete {categoryDelete && item.name} {subCategoryDelete && item.name}{" "}
          {aboutDelete && item.aboutTitle} {remarkDelete && item.title}{" "}
          {aboutValueDelete && item.value}
          {definitionDelete && item.title}
          {locationDelete && item?.location}
        </h3>
        <p>
          {categoryDelete &&
            `All the categories sub categories and all other mapped with cover condition will get deleted. Are you sure to delete ${item.name}?`}
          {subCategoryDelete &&
            `All the about, about values and notes associated with ${item.name} will get deleted. Are you sure to delete ${item.name}?`}
          {aboutDelete &&
            `All the about values and notes associated with ${item.aboutTitle} will get deleted. Are you sure to delete ${item.aboutTitle}`}
          {aboutValueDelete &&
            `All notes associated with ${item.value} will get deleted. Are you sure to delete ${item.value}`}
          {noteDelete &&
            `The Note will get deleted. Are you sure you want delete this note?`}
          {remarkDelete &&
            `The ${item.title} will get deleted. Are you sure to delete ${item.title}`}
          {definitionDelete &&
            `Everything under ${item.title} will get deleted. Are you sure to delete ${item.title}`}
        </p>
        <div className={`${styles.btnWrapper} dFlex alignC justifyC`}>
          <button
            className="btn red"
            onClick={() => {
              {
                categoryDelete &&
                  deleteCategory(item.templateId, item.templateCategoryId);
              }
              {
                subCategoryDelete &&
                  deleteSubCategory(
                    item.templateSubCategoryId,
                    item.templateCategoryId,
                  );
              }
              {
                aboutDelete &&
                  deleteAbout(item.templateSubCategoryId, item.templateAboutId);
              }
              {
                aboutValueDelete &&
                  deleteAboutValue(
                    item.templateAboutId,
                    item.templateAboutValueId,
                  );
              }
              {
                noteDelete &&
                  delteNotes(
                    item.templateAboutValueNoteId,
                    item.templateAboutValueId,
                  );
              }
              {
                remarkDelete && deleteRemarsk(item.templateRemarkId);
              }
              {
                locationDelete && deleteLocation(item.templateLocationId);
              }
              {
                definitionDelete && deleteDefinition(item.templateDefinitionId);
              }
              deleteClose(false);
            }}
          >
            Yes, Delete
          </button>

          <button
            className="btn gradient-btn"
            onClick={(e) => {
              deleteClose(false);
              e.stopPropagation();
            }}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
}
