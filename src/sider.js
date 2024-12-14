import {
  //   MenuFoldOutlined,
  //   MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { Layout, Menu } from "antd";
const { Sider } = Layout;
export const BaseSider = ({ collapsed }) => {
  return (
    <Sider trigger={null} collapsible collapsed={collapsed}>
      <div className="demo-logo-vertical" />
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["1"]}
        items={[
          {
            key: "1",
            icon: <UserOutlined />,
            label: <Link to="/">Классификации</Link>,
          },
          {
            key: "2",
            icon: <VideoCameraOutlined />,
            label: "Пока пусто",
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
