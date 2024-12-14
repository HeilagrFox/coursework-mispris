import { useState, useEffect } from "react";
import { Table } from "antd";

import { Flex, Layout, theme, Form, Input, Drawer, Button } from "antd";

import {
  getClassificationTree,
  getClassification,
  addClassification,
  deleteClassificationById,
} from "./queries";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Tabs } from "antd";

import { InputNumber } from "antd";
import { useNotification } from "./notification";
import { ClassificationTable } from "./classif-table";
import { ClassificationTableTree } from "./classif-tree-table";

const { Header, Content } = Layout;
const BodyContent = ({ setCollapsed, collapsed }) => {
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
  const [classificationId, setClassificationId] = useState();
  useEffect(() => {
    getClassification(setFetchData);
    getClassificationTree(setFetchDataTree);
  }, []);

  const [form] = Form.useForm();
  const items = [
    {
      key: "1",
      label: "Классификациии",
      children: (
        <ClassificationTable
          fetchData={fetchData}
          setClassificationId={setClassificationId}
        />
      ),
    },
    {
      key: "2",
      label: "Дерево классификаций",
      children: <ClassificationTableTree fetchData={fetchDataTree} />,
    },
  ];

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const headerStyle = {
    textAlign: "center",
    color: "#4096ff",
    padding: 20,
    height: 64,
    border: "none",
  };
  async function onFinish(data) {
    const resp = await addClassification(data);
    if (resp.status != 200) {
      openNotificationWithIcon(resp.message);
    } else {
      console.log(resp);
      getClassification(setFetchData);
      setOpenDrawer(false);
      // setFetchDataTree({});
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
            <Button
              style={headerStyle}
              onClick={() => {
                setOpenDrawer(true);
              }}
            >
              {" "}
              Добавить классификацию{" "}
            </Button>
            <Button
              style={headerStyle}
              onClick={async () => {
                if (classificationId) {
                  const response =
                    await deleteClassificationById(classificationId);
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
              }}
            >
              {" "}
              Удалить классификацию{" "}
            </Button>
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

      <Drawer
        title={<p style={{ textAlign: "center" }}>Заполните следующую форму</p>}
        open={isOpenDrawer}
        onClose={() => {
          setOpenDrawer(false);
        }}
      >
        <Form form={form} onFinish={onFinish} autoComplete="on">
          {fetchData && fetchData.columns
            ? fetchData.columns.slice(1).map((value) => {
                return (
                  <Form.Item
                    key={value.title}
                    name={value.title}
                    label={value.title}
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                );
              })
            : null}
          {fetchData && fetchData.columns ? (
            <Flex gap={"middle"} justify={"flex-end"} align={"flex-end"}>
              <Form.Item>
                <Button type="primary" onClick={() => setOpenDrawer(false)}>
                  Отмена
                </Button>
              </Form.Item>
              <Form.Item label={null}>
                <Button type="primary" htmlType="submit">
                  Сохранить
                </Button>
              </Form.Item>
            </Flex>
          ) : null}
        </Form>
      </Drawer>
    </>
  );
};
export default BodyContent;
