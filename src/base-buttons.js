import { Button } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
export const EditButton = ({ onClick = () => {}, isDisabled }) => {
  return (
    <Button
      className="primary"
      style={{ alignSelf: "center" }}
      onClick={onClick}
      disabled={isDisabled}
    >
      {" "}
      Изменить{" "}
    </Button>
  );
};

export const AddButton = ({ onClick = () => {} }) => {
  return (
    <Button
      className="primary"
      style={{ alignSelf: "center" }}
      onClick={onClick}
    >
      {" "}
      Добавить{" "}
    </Button>
  );
};

export const DeleteButton = ({ onClick = () => {}, isDisabled }) => {
  return (
    <Button
      className="primary"
      style={{ alignSelf: "center" }}
      onClick={onClick}
      disabled={isDisabled}
    >
      {" "}
      Удалить{" "}
    </Button>
  );
};

export const MenuButton = ({ collapsed, setCollapsed }) => {
  return (
    <Button
      type="text"
      icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      onClick={() => setCollapsed(!collapsed)}
      style={{
        fontSize: "16px",
        width: 64,
        height: 64,
      }}
    />
  );
};
