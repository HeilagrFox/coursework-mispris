import { useState, useEffect } from "react";

import { Flex, Layout, theme, Form } from "antd";

import {
  getClassificationTree,
  getClassification,
  addClassification,
  deleteClassificationById,
  updateClassificationById,
} from "./queries";
// import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Tabs } from "antd";

import { useNotification } from "./notification";

import { DrawerWrapper } from "./drawer-wrapper";
import { TableWrapper } from "./table-wrapper";
import {
  EditButton,
  DeleteButton,
  AddButton,
  MenuButton,
} from "./base-buttons";
const { Header, Content } = Layout;
export const BodyContent = ({ setCollapsed, collapsed }) => {
  const { contextHolder, openNotificationWithIcon } = useNotification();
  const [fetchDataTree, setFetchDataTree] = useState({
    loading: true,
    dataSource: [],
    columns: [],
  });
  const [fetchData, setFetchData] = useState({
    loading: true,
    dataSource: [],
    columns: [],
  });
  const [isOpenDrawer, setOpenDrawer] = useState(false);
  const [isOpenDrawerForChange, setOpenDrawerUpdate] = useState(false);
  const [classificationId, setClassificationId] = useState();
  const [classificationRow, setClassificationRow] = useState({});
  const [form] = Form.useForm();
  useEffect(() => {
    getClassification(setFetchData);
    getClassificationTree(setFetchDataTree);
  }, []);

  const items = [
    {
      key: "1",
      label: "Классификациии",
      children: (
        <TableWrapper
          fetchData={fetchData}
          setId={setClassificationId}
          setRow={setClassificationRow}
          isRowSelection={true}
          key_id={"id_classification"}
          title="Классификации"
        />
      ),
    },
    {
      key: "2",
      label: "Дерево классификаций",
      children: (
        <TableWrapper fetchData={fetchDataTree} title="Дерево классификаций" />
      ),
    },
  ];

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  async function onFinishAdd(data) {
    const resp = await addClassification(data);
    if (resp.status !== 200) {
      openNotificationWithIcon(resp.message);
    } else {
      console.log(resp);
      getClassification(setFetchData);
      setOpenDrawer(false);
      openNotificationWithIcon(
        "Классификация была успешно добавлена!",
        "success"
      );
    }
  }
  async function onDeleteClassificationId() {
    if (classificationId) {
      const response = await deleteClassificationById(classificationId);
      if (response.status === 200) {
        getClassification(setFetchData);
        openNotificationWithIcon(
          "Классификация была успешно удалена!",
          "success"
        );
      } else {
        openNotificationWithIcon(response.message);
      }
    }
  }

  async function onFinishUpdate(data) {
    const resp = await updateClassificationById(classificationId, data);
    if (resp.status !== 200) {
      openNotificationWithIcon(resp.message);
    } else {
      setOpenDrawerUpdate(false);
      openNotificationWithIcon(
        "Классификация была успешно отредактирована!",
        "success"
      );
      if (Array.isArray(fetchData?.dataSource)) {
        const updatedFetchData = fetchData.dataSource.map((value, index) => {
          if (value["id_classification"] === classificationId) {
            return { ...value, ...data };
          }
          return value;
        });
        setFetchData((prev) => ({ ...prev, dataSource: updatedFetchData }));
      }
    }
  }
  return (
    <>
      {contextHolder}
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Flex gap="middle" wrap>
            <MenuButton collapsed={collapsed} setCollapsed={setCollapsed} />
            {/* <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
                width: 64,
                height: 64,
              }}
            /> */}
            <AddButton
              onClick={() => {
                setOpenDrawer(true);
              }}
            />
            <DeleteButton
              onClick={onDeleteClassificationId}
              isDisabled={classificationId ? false : true}
            />
            <EditButton
              onClick={() => {
                setOpenDrawerUpdate(true);
              }}
              isDisabled={classificationId ? false : true}
            />
          </Flex>
        </Header>

        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,

            overflowX: "auto",
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Tabs
            defaultActiveKey="1"
            items={items}
            indicator={{
              size: (origin) => origin - 20,
            }}
          />
        </Content>
      </Layout>
      <DrawerWrapper
        isOpenDrawer={isOpenDrawer}
        setOpenDrawer={setOpenDrawer}
        fetchData={fetchData}
        onFinish={onFinishAdd}
        requiredFields={["short_name", "full_name"]}
        inputNotNumberFields={["short_name", "full_name"]}
      />
      <DrawerWrapper
        isOpenDrawer={isOpenDrawerForChange}
        setOpenDrawer={setOpenDrawerUpdate}
        fetchData={fetchData}
        onFinish={onFinishUpdate}
        classificationRow={classificationRow}
        form={form}
      />
    </>
  );
};
