import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Button, Col, Row } from "antd";

const TagsHeader = () => {
  return (
    <Row gutter={[10, 0]} style={{ padding: "0 10px" }}>
      <Col>
        <Button icon={<LeftOutlined />} type="text"></Button>
        <Button icon={<RightOutlined />} type="text"></Button>
      </Col>
      <Col>标签管理(2)</Col>
    </Row>
  );
};

export default TagsHeader;
