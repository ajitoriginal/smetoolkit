import SideBar from "../components/dashboard/side-bar";
import RightHome from "../components/home/right-home";
import { redirect } from "../utils/storage";

const Dashboard = () => {
  redirect("");

  return (
    <section className="dasboard dFlex">
      <SideBar status={0} show />
      <div className="dashboard-right main">
        <RightHome />
      </div>
    </section>
  );
};

export default Dashboard;
