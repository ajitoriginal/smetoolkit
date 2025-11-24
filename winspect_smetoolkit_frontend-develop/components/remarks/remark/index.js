import { useState } from "react";
import EditRemark from "../edit-remark";
import RemarkContent from "./remark-content";

const Remark = (props) => {
  const [showEditRemark, setShowEditRemark] = useState(false);
  const { remark } = props;
  if (showEditRemark) {
    return <EditRemark remark={remark} setShowEditRemark={setShowEditRemark} />;
  } else {
    return (
      <RemarkContent props={props} setShowEditRemark={setShowEditRemark} />
    );
  }
};

export default Remark;
