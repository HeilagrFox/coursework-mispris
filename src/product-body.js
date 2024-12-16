import { useNotification } from "./notification";
import {
  EditButton,
  DeleteButton,
  AddButton,
  MenuButton,
} from "./base-buttons";
import { useState, useEffect } from "react";
import { getProduct } from "./queries";
import { Flex, Layout, theme, Form, Modal, Button } from "antd";
import { TableWrapper } from "./table-wrapper";
import { DrawerWrapper } from "./drawer-wrapper";
import {
  addProduct,
  deleteProductById,
  updateProductById,
  copyProductById,
} from "./queries";
export const ProductBodyContent = ({ setCollapsed, collapsed }) => {
  const { Header, Content } = Layout;
  const [fetchData, setFetchData] = useState({
    loading: true,
    dataSource: [],
    columns: [],
  });
  const [isOpenDrawer, setOpenDrawer] = useState(false);
  const [isOpenDrawerUpdate, setOpenDrawerUpdate] = useState(false);
  const [productId, setProductId] = useState();
  const [productRow, setProductRow] = useState({});
  const [form] = Form.useForm();
  const [modal, modalContextHolder] = Modal.useModal();
  useEffect(() => {
    getProduct(setFetchData);
  }, []);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const { contextHolder, openNotificationWithIcon } = useNotification();

  async function onFinishAdd(data) {
    const resp = await addProduct(data);
    if (resp.status !== 200) {
      openNotificationWithIcon(resp.message);
    } else {
      getProduct(setFetchData);
      setOpenDrawer(false);
      openNotificationWithIcon("Продукт был успешно добавлен!", "success");
    }
  }
  async function onDeleteProductId() {
    if (productId) {
      console.log("prod", productId);
      const response = await deleteProductById(productId);
      if (response.status === 200) {
        getProduct(setFetchData);
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
    console.log(data);
    const resp = await updateProductById(productId, data);
    if (resp.status !== 200) {
      openNotificationWithIcon(resp.message);
    } else {
      setOpenDrawerUpdate(false);
      openNotificationWithIcon(
        "Продукт была успешно отредактирован!",
        "success"
      );
      if (Array.isArray(fetchData?.dataSource)) {
        const updatedFetchData = fetchData.dataSource.map((value, index) => {
          if (value["id_product"] === productId) {
            return { ...value, ...data };
          }
          return value;
        });
        setFetchData((prev) => ({ ...prev, dataSource: updatedFetchData }));
      }
    }
  }
  async function onCopyProductId() {
    if (productId) {
      const confirmed = await modal.confirm({
        title: "Операция копирования",
        content: (
          <>Вы уверены, что хотите копировать продукт с id {productId}?</>
        ),
      });
      if (confirmed) {
        const updatedFetchData = fetchData.dataSource.map((value, index) => {
          if (value["id_product"] === productId) {
            const short_name = "copy_" + value["short_name"];
            const full_name = "copy_" + value["full_name"];
            console.log(short_name);
            return { short_name: short_name, full_name: full_name, ...value };
          }
          return value;
        });
        const resp = await copyProductById(productId, updatedFetchData);
        if (resp.status !== 200) {
          openNotificationWithIcon(resp.message);
        } else {
          setOpenDrawerUpdate(false);
          console.log(resp);
          openNotificationWithIcon(
            "Копия продукта была успешно создана!",
            "success"
          );
          getProduct(setFetchData);
        }
      }
    }
  }
  return (
    <>
      {contextHolder}
      {modalContextHolder}
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
            <DeleteButton
              onClick={onDeleteProductId}
              isDisabled={productId ? false : true}
            />
            <EditButton
              onClick={() => {
                setOpenDrawerUpdate(true);
              }}
              isDisabled={productId ? false : true}
            />
            <Button
              className="primary"
              style={{ alignSelf: "center" }}
              onClick={onCopyProductId}
              disabled={productId ? false : true}
            >
              {" "}
              Копировать{" "}
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
          <TableWrapper
            isRowSelection={true}
            setId={setProductId}
            setRow={setProductRow}
            fetchData={fetchData}
            title="Продукты"
            key_id={"id_product"}
          />
        </Content>
      </Layout>
      <DrawerWrapper
        isOpenDrawer={isOpenDrawer}
        setOpenDrawer={setOpenDrawer}
        fetchData={fetchData}
        onFinish={onFinishAdd}
        requiredFields={["short_name", "full_name"]}
        inputNumberFields={["short_name", "full_name"]}
      />
      <DrawerWrapper
        isOpenDrawer={isOpenDrawerUpdate}
        setOpenDrawer={setOpenDrawerUpdate}
        fetchData={fetchData}
        onFinish={onFinishUpdate}
        classificationRow={productRow}
        form={form}
      />
    </>
  );
};
