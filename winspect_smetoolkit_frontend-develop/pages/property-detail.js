import SideBar from "../components/dashboard/side-bar";
import RightProperty from "../components/property-detail/right-property-detail";

const PropertyDetail = () => {
  return (
    <section className="dasboard dFlex">
      <SideBar status={1} />
      <div className="dashboard-right">
        <RightProperty />
      </div>
    </section>
  );
};

export default PropertyDetail;
