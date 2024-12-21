import { useNotification } from "./notification";
import { AddButton, MenuButton } from "./base-buttons";
import { useState, useEffect } from "react";
import { getSpec, getIdProducts, getSpecIdProducts, addSpec } from "./queries";
import { Flex, Layout, theme, Tabs, Select, Space } from "antd";
import { TableWrapper } from "./table-wrapper";
import { DrawerWrapper } from "./drawer-wrapper";
export const SpecBodyContent = ({ setCollapsed, collapsed }) => {
  const { Header, Content } = Layout;
  const [fetchData, setFetchData] = useState({
    loading: true,
    dataSource: [],
    columns: [],
  });
  const [fetchDataIdProduct, setFetchDataIdProduct] = useState({
    loading: false,
    dataSource: [],
    columns: [],
  });
  const [ListIdProduct, setListIdProduct] = useState({
    loading: true,
    options: [],
  });
  const [isOpenDrawer, setOpenDrawer] = useState(false);

  useEffect(() => {
    getSpec(setFetchData);
    getIdProducts(setListIdProduct);
  }, []);

  const items = [
    {
      key: "1",
      label: "Спецификации",
      children: <TableWrapper fetchData={fetchData} title="Спецификация" />,
    },
    {
      key: "2",
      label: "Дерево специйикаций по id продукта",
      children: (
        <>
          <Space direction="vertical" size="middle" style={{ display: "flex" }}>
            <Select
              style={{ maxWidth: "30%", minWidth: "25%" }}
              options={ListIdProduct.options}
              loading={ListIdProduct.loading}
              onChange={onSelectChange}
            />
            <TableWrapper
              fetchData={fetchDataIdProduct}
              title="Дерево спецификации "
            />
          </Space>
        </>
      ),
    },
  ];
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const { contextHolder, openNotificationWithIcon } = useNotification();
  function onSelectChange(value) {
    setFetchDataIdProduct({ loading: true, ...fetchDataIdProduct });
    getSpecIdProducts(setFetchDataIdProduct, value);
  }
  async function onFinishAdd(data) {
    const resp = await addSpec(data);
    if (resp.status !== 200) {
      openNotificationWithIcon(resp.message);
    } else {
      getSpec(setFetchData);

      setOpenDrawer(false);
      openNotificationWithIcon(
        "Спецификация была успешно добавлена!",
        "success"
      );
    }
  }

  return (
    <>
      {contextHolder}
      {/* {modalContextHolder} */}
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Flex gap="middle" wrap>
            <MenuButton collapsed={collapsed} setCollapsed={setCollapsed} />
            <AddButton
              onClick={() => {
                setOpenDrawer(true);
              }}
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
        requiredFields={["id_product", "id_part", "id_position", "quantity"]}
        inputNotNumberFields={["full_part_name"]}
        exclude_last_element={true}
      />
    </>
  );
};
