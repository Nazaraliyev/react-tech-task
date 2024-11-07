import { Flex } from "@/components/common";
import SideBar from "./components/sidebar";
import Content from "./components/content";

const Layout = () => {
  return (
    <Flex isFullHeight>
      <SideBar />
      <Content />
    </Flex>
  );
};

export default Layout;


