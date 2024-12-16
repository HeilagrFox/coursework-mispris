import { UserOutlined, VideoCameraOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { Layout, Menu } from "antd";

import { useLocation } from "react-router-dom";
const { Sider } = Layout;
export const BaseSider = ({ collapsed }) => {
  const host = window.location.origin;
  const location = useLocation();
  const selectedKey = location.pathname === "/product" ? "2" : "1";
  return (
    <Sider trigger={null} collapsible collapsed={collapsed}>
      <div className="demo-logo-vertical" />
      <Menu
        theme="dark"
        mode="inline"
        defaultValue={"1"}
        selectedKeys={[selectedKey]}
        items={[
          {
            key: "1",
            icon: <UserOutlined />,
            label: <Link to="/">Классификации</Link>,
          },
          {
            key: "2",
            icon: <VideoCameraOutlined />,
            label: <Link to={host + "/product"}>Продукты</Link>,
          },

          //   {
          //     key: "3",
          //     icon: <UploadOutlined />,
          //     label: "nav 3",
          //   },
        ]}
      />
    </Sider>
  );
};
