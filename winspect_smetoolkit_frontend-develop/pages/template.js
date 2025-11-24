import SideBar from "../components/dashboard/side-bar";
import ViewOnlyContent from "../components/view-only/view-only-content";

const ViewOnly = () => {
  return (
    <section className="dasboard dFlex">
      <SideBar status={0} />
      <div className="dashboard-right">
        <ViewOnlyContent /> 
      </div>
    </section>
  );
};

export default ViewOnly;
