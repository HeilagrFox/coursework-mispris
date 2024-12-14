import { Table } from "antd";
import { addDataIndex } from "./add-data-index";
export const ClassificationTable = ({ fetchData, setClassificationId }) => {
  return (
    <>
      {fetchData ? (
        <Table
          loading={fetchData.loading}
          columns={fetchData.loading ? [] : fetchData.columns.map(addDataIndex)}
          dataSource={fetchData & fetchData.loading ? [] : fetchData.dataSource}
          rowSelection={{
            type: "radio",
            onChange: (selectedRowKeys, selectedRows) => {
              console.debug(
                `selectedRow IdClassification : ${selectedRows[0].id_classification}`
              );
              setClassificationId(selectedRows[0].id_classification);
            },
          }}
          bordered
          title={() => (
            <h3 style={{ textAlign: "center", margin: 0 }}>Классификациии</h3>
          )}
          size="middle"
        />
      ) : null}
    </>
  );
};
