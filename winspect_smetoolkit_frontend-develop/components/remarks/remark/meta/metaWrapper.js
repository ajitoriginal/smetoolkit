import useGenerateStore from "../../../../stores/generalStore";
import CustomMetas from "./customMetas";
import TemplateMetas from "./templateMetas";

const MetaWrapper = (props) => {
  const { metaData } = props;
  const isCustomStore = useGenerateStore((state) => state.isCustom);
  if (isCustomStore) {
    return <CustomMetas metaData={metaData} />;
  } else {
    return <TemplateMetas metaData={metaData} />;
  }
};

export default MetaWrapper;
