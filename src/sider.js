import {
  FileTextOutlined,
  BranchesOutlined,
  ProductOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { Layout, Menu } from "antd";

import { useLocation } from "react-router-dom";
const { Sider } = Layout;
export const BaseSider = ({ collapsed }) => {
  const host = window.location.origin;
  const location = useLocation();
  let defaultSelectedKey = "1";
  if (location.pathname === "/product") {
    defaultSelectedKey = "2";
  }
  if (location.pathname === "/spec") {
    defaultSelectedKey = "3";
  }
  const selectedKey = defaultSelectedKey;
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
            icon: <BranchesOutlined />,
            label: <Link to="/">Классификации</Link>,
          },
          {
            key: "2",
            icon: <ProductOutlined />,
            label: <Link to={host + "/product"}>Продукты</Link>,
          },
          {
            key: "3",
            icon: <FileTextOutlined />,
            label: <Link to={host + "/spec"}> Спецификация</Link>,
          },
        ]}
      />
    </Sider>
  );
};
