import { useState } from "react";

import { Flex, Layout, theme, Button } from "antd";
import { BaseSider } from "./sider";
import BodyContent from "./classif-body";
function Classification() {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const [collapsed, setCollapsed] = useState(false);
  const layoutStyle = {
    overflow: "hidden",
    width: "calc(50% - 8px)",
    maxWidth: "100%",
    height: "100vh",
  };
  return (
    <>
      <Flex gap="middle" wrap>
        <Layout style={layoutStyle}>
          <Layout>
            <BaseSider collapsed={collapsed} />
            <BodyContent setCollapsed={setCollapsed} collapsed={collapsed} />
          </Layout>
        </Layout>
      </Flex>
    </>
  );
}

export default Classification;
