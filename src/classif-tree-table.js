import { Table } from "antd";
import { addDataIndex } from "./add-data-index";
export const ClassificationTableTree = ({ fetchData: fetchDataTree }) => {
  return (
    <>
      {fetchDataTree ? (
        <Table
          loading={fetchDataTree.loading}
          columns={
            fetchDataTree.loading ? [] : fetchDataTree.columns.map(addDataIndex)
          }
          dataSource={
            fetchDataTree & fetchDataTree.loading
              ? []
              : fetchDataTree.dataSource
          }
          bordered
          title={() => (
            <h3 style={{ textAlign: "center", margin: 0 }}>
              Дерево классификаций
            </h3>
          )}
          size="middle"
        />
      ) : null}
    </>
  );
};
