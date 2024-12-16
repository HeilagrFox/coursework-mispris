import { Flex, Form, Input, Drawer, Button, InputNumber } from "antd";
import { useEffect } from "react";
export const DrawerWrapper = ({
  isOpenDrawer,
  setOpenDrawer,
  fetchData,
  onFinish,
  classificationRow,
  form,
}) => {
  useEffect(() => {
    if (form) {
      form.setFieldsValue(classificationRow);
    }
  }, [form, classificationRow]);

  return (
    <>
      <Drawer
        title={<p style={{ textAlign: "center" }}>Заполните следующую форму</p>}
        open={isOpenDrawer}
        onClose={() => {
          setOpenDrawer(false);
        }}
      >
        <Form form={form} onFinish={onFinish} autoComplete="on">
          {fetchData && fetchData.columns
            ? fetchData.columns.slice(1).map((value, index) => {
                return (
                  <Form.Item
                    key={value.title}
                    name={value.title}
                    label={value.title}
                    // shouldUpdate={
                    //   (prevValues, curValues) =>
                    //     console.log(curValues, classificationRow)
                    //   //   prevValues !== curValues
                    // }
                    // initialValue={
                    //   classificationRow
                    //     ? Object.values(initialValues)[index + 1]
                    //     : ""
                    // }
                    rules={[
                      {
                        required:
                          value.title === "short_name" ||
                          value.title === "full_name"
                            ? true
                            : false,
                      },
                    ]}
                  >
                    {value.title === "short_name" ||
                    value.title === "full_name" ? (
                      <Input />
                    ) : (
                      <InputNumber
                        style={{ width: "100%" }}
                        min={1}
                        maxLength={9}
                      />
                    )}
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
