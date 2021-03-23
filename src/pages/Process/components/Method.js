import { useState, useEffect } from "react";
import { Row, Col, Radio, Card, Input, Divider, message } from "antd";
import { Link } from "react-router-dom";
import { List, Button } from "antd";
import { method_add, method_selectall } from "../../../api/api";

const { TextArea } = Input;

function Method(props) {
  const [methods, setMethods] = useState([]);
  const [selectedId, setSelectedId] = useState(0);
  const [methodDesc, setMethodDesc] = useState("");
  const [methodName, setMethodName] = useState("");
  const [methodScene, setMethodScene] = useState("");
  useEffect(() => {
    method_selectall().then((res) => {
      if (res && res.data) {
        setMethods(res.data);
      } else {
        message.error("get methods info fail");
      }
    });
  }, []);
  return (
    <>
      <Row className="Row" gutter={16}>
        <Col span={6} className="Left">
          <Radio.Group
            value={selectedId}
            onChange={(e) => {
              setSelectedId(e.target.value);
              methods.forEach((item) => {
                if (item.id === e.target.value) {
                  setMethodName(item.methodname);
                  setMethodScene(item.methodscene);
                  setMethodDesc(item.methoddesc);
                  props.setMethod(item.methodname);
                }
              });
            }}
          >
            <List
              style={{
                overflowY: "scroll",
                height: "50vh",
                marginTop: "2vh",
              }}
              itemLayout="horizontal"
              dataSource={methods}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta title={item.methodname} />
                  <Radio value={item.id} />
                </List.Item>
              )}
            />
          </Radio.Group>
        </Col>
        <Col span={18} className="Right Process-Method-Right">
          <Card style={{ width: "30vw" }}>
            <p>方法名:</p>
            <Input
              value={methodName}
              onChange={(e) => {
                setMethodName(e.target.value);
              }}
            />
            <Divider />
            <p>适用场景:</p>
            <Input
              value={methodScene}
              onChange={(e) => {
                setMethodScene(e.target.value);
              }}
            />
            <Divider />
            <p>方法描述:</p>
            <TextArea
              rows={10}
              value={methodDesc}
              onChange={(e) => {
                setMethodDesc(e.target.value);
              }}
            />
          </Card>
        </Col>
      </Row>
      <Row>
        <Col span={8} offset={8}>
          <Link to="/Process/Result">
            <Button block type="primary" onClick={props.goToNextStep}>
              下一页
            </Button>
          </Link>
        </Col>
      </Row>
    </>
  );
}

export default Method;
