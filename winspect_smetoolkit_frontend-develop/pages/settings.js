import SideBar from "../components/dashboard/side-bar";
import RightSetting from "../components/settings/right-settings";
import { redirect } from "../utils/storage";

const Settings = () => {
  redirect("");

  return (
    <section className="dasboard dFlex">
      <SideBar status={1} />
      <div className="dashboard-right">
        <RightSetting />
      </div>
    </section>
  );
};

export default Settings;
