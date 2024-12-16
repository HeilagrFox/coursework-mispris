import { Table } from "antd";
import { addDataIndex } from "./add-data-index";
export const TableWrapper = ({
  fetchData,
  setId,
  setRow,
  isRowSelection = false,
  key_id,
  title = "Table",
}) => {
  return (
    <>
      {fetchData ? (
        <Table
          loading={fetchData.loading}
          columns={fetchData.loading ? [] : fetchData.columns.map(addDataIndex)}
          dataSource={fetchData & fetchData.loading ? [] : fetchData.dataSource}
          rowSelection={
            isRowSelection
              ? {
                  type: "radio",
                  onChange: (selectedRowKeys, selectedRows) => {
                    console.debug(`selectedRow : ${selectedRows}`);
                    setId(selectedRows[0][key_id]);
                    setRow(selectedRows[0]);
                  },
                }
              : undefined
          }
          bordered
          title={() => (
            <h3 style={{ textAlign: "center", margin: 0 }}>{title}</h3>
          )}
          size="middle"
        />
      ) : null}
    </>
  );
};
