import Select from "react-select";
import styles from "../view-only-content.module.scss";
import DropdownIndicator from "../../common/dropdown-indicator";
import dayjs from "dayjs";
import TemplateServices from "../../../api/services/TemplateServices";
import { useRouter } from "next/router";
import { url } from "../../../utils/url";
import { useEffect, useState } from "react";

const PublishHeader = (props) => {
  const {
    publishFilter,
    publish,
    Categories,
    setLoader,
    setActiveCat,
    setActiveSubCat,
    publishedTemplate,
    setActive,
    masterTemplateID,
    isActive,
  } = props;

  const [options, setOptions] = useState([]);

  useEffect(() => {
    updateOptions();
  }, [publish]);

  const updateOptions = () => {
    const optionList = [];
    const sortedPublish = publish?.sort(
      (a, b) => parseFloat(b.version) - parseFloat(a.version),
    );
    sortedPublish?.map((item) => {
      let endDate = dayjs(item?.publishedAt).format("M/DD/YYYY");
      if (item.isActive) {
        endDate = "present";
      }
      optionList.push({
        value: item?.templateId,
        label: `${item?.master_template?.name}.V${item?.version} (${dayjs(
          item?.createdAt,
        ).format("M/DD/YYYY")} to ${endDate})`,
      });
    });
    setOptions(optionList);
  };

  //rebuplish the template
  async function republishTheTemplate(id) {
    setLoader(true);
    let data = {
      templateId: id,
    };
    await TemplateServices.republishTemplate(data);
    setLoader(false);
    publishedTemplate(id);
    updateOptions();
  }
  const router = useRouter();
  const handleChange = (e) => {
    router.push(`/${url.publishTemplates}/${masterTemplateID}/${e.value}`);
  };
  const handleClear = () => {
    const activeTemplateIds = publish
      .filter((item) => item.isActive)
      .map((item) => item.templateId);
    router.push(
      `/${url.publishTemplates}/${masterTemplateID}/${activeTemplateIds}`,
    );
  };
  return (
    <div className={`${styles.viewHeader} dFlex justifySB alignC`}>
      <div className={`${styles.headerLeft} headerLeft`}>
        <Select
          options={options}
          placeholder=""
          onChange={handleChange}
          components={{ DropdownIndicator }}
          classNamePrefix="filter"
          value={{
            label: `${
              publishFilter ? publishFilter[0]?.master_template?.name : ""
            } . V${publishFilter ? publishFilter[0]?.version : ""}`,
          }}
        />
        {!isActive && (
          <div onClick={() => handleClear()} className={styles.clear}>
            Go back to live template
          </div>
        )}
      </div>

      {publishFilter?.map((item, index) => (
        <div className={`${styles.headerRight}`} key={index}>
          <div className="dFlex alignC">
            <p className={styles.publishedDetail}>
              {dayjs(item?.publishedAt).format(
                "[Published on] M/DD/YYYY [at] h:mm A",
              )}{" "}
              by {item?.publishedBy?.first} {item?.publishedBy?.last}
            </p>
            {item?.isActive ? (
              <span className={styles.active}>In use</span>
            ) : (
              <span
                className={styles.publish}
                onClick={() => republishTheTemplate(item?.templateId)}
                id="useThisTemplate"
              >
                Use this template
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PublishHeader;
