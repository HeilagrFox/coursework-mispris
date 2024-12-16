import { Button } from "antd";

export const EditButton = ({ onClick, isDisabled }) => {
  return (
    <Button
      className="primary"
      style={{ alignSelf: "center" }}
      onClick={onClick}
      disabled={isDisabled}
    >
      {" "}
      Изменить классификацию{" "}
    </Button>
  );
};

export const AddButton = ({ onClick }) => {
  return (
    <Button
      className="primary"
      style={{ alignSelf: "center" }}
      onClick={onClick}
    >
      {" "}
      Добавить классификацию{" "}
    </Button>
  );
};

export const DeleteButton = ({ onClick, isDisabled }) => {
  return (
    <Button
      className="primary"
      style={{ alignSelf: "center" }}
      onClick={onClick}
      disabled={isDisabled}
    >
      {" "}
      Удалить классификацию{" "}
    </Button>
  );
};
