import { useState } from "react";
import { Flex, Layout } from "antd";
import { BaseSider } from "./sider";
import { cloneElement } from "react";
export const FlexWrapper = ({ BodyContent }) => {
  const [collapsed, setCollapsed] = useState(false);
  const layoutStyle = {
    overflow: "hidden",
    width: "calc(50% - 8px)",
    maxWidth: "100%",
    height: "100vh",
  };
  return (
    <Flex gap="middle" wrap>
      <Layout style={layoutStyle}>
        <Layout>
          <BaseSider collapsed={collapsed} />
          {BodyContent
            ? cloneElement(BodyContent, { collapsed, setCollapsed })
            : null}
        </Layout>
      </Layout>
    </Flex>
  );
};
