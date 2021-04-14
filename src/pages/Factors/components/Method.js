import { useState, useEffect } from "react";
import { Row, Col, Radio, Card, Input, Divider, message } from "antd";

import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { List, Button, Popconfirm } from "antd";
import {
  method_add,
  method_selectall,
  method_update,
  method_delete,
} from "../../../api/api";

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
        message.error("加载失败");
      }
    });
  }, []);

  const addMethod = () => {
    method_add(methodName, methodScene, methodDesc).then((res) => {
      if (res && res.data) {
        message.success(res.data);
      } else {
        message.error("上传失败");
      }
    });
  };
  const updateMethod = () => {
    method_update(methodName, methodScene, methodDesc).then((res) => {
      if (res && res.data) {
        message.success(res.data);
      } else {
        message.error("更新失败");
      }
    });
  };
  const confirm = (name) => {
    method_delete(name).then((res) => {
      if (res && res.data) {
        message.success(res.data);
      } else {
        message.error("删除失败");
      }
    });
  };
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
                  <EditOutlined
                    style={{ fontSize: "x-large" }}
                    onClick={updateMethod}
                  />
                  <Popconfirm
                    title="Are you sure to delete this method?"
                    onConfirm={() => confirm(item.methodname)}
                    okText="Yes"
                    cancelText="No"
                  >
                    <DeleteOutlined style={{ fontSize: "x-large" }} />
                  </Popconfirm>
                  <Radio value={item.id} />
                </List.Item>
              )}
            />
          </Radio.Group>
          <Button
            block
            type="primary"
            style={{ marginTop: "3vh" }}
            onClick={addMethod}
          >
            新增
          </Button>
        </Col>
        <Col span={18} className="Right Process-Method-Right method-item">
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
    </>
  );
}

export default Method;
