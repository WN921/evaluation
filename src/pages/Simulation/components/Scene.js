import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Image, Card, Input, Radio, Divider, message } from "antd";

import { List, Button } from "antd";

import {
  scene_selectall,
  scene_selectone,
} from "../../../api/api";
const { TextArea } = Input;

function Scene(props) {
  const [sceneName, setSceneName] = useState("");
  const [taskName, setTaskName] = useState("");
  const [envName, setEvnName] = useState("");
  const [taskDesc, setTaskDesc] = useState("");
  const [file, setFile] = useState(null);
  const [fileURL, setFileURL] = useState("");
  const [sceneList, setSceneList] = useState([]);
  const [selectedId, setSelectedId] = useState(0);

  useEffect(() => {
    scene_selectall().then((res) => {
      if (res?.status === 200) {
        console.log(res.data);
        setSceneList(res.data);
      } else {
        message.error("load scene list fail");
      }
    });
  }, []);
  const loadImage = (e) => {
    setFile(e?.target?.files[0]);
    setFileURL(URL.createObjectURL(e?.target?.files[0]));
  };
  return (
    <>
      <Row className="Row" gutter={32}>
        <Col span={6} className="Left">
          <Radio.Group
            value={selectedId}
            onChange={(e) => {
              setSelectedId(e.target.value);
              sceneList.forEach((item) => {
                if (item.id === e.target.value) {
                  setSceneName(item.scenename);
                  props.setScene(item.scenename);
                  setTaskName(item.taskname);
                  setEvnName(item.envname);
                  setTaskDesc(item.taskdesc);
                  scene_selectone(item.scenename).then((res) => {
                    if (res?.status === 200) {
                      console.log(res);
                      setFile(res.data);
                      setFileURL(URL.createObjectURL(res.data));
                    } else {
                      message.error("load image fail");
                    }
                  });
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
              dataSource={sceneList}
              renderItem={(item, index) => (
                <List.Item>
                  <List.Item.Meta title={item.scenename} />
                  <Radio value={item.id} />
                </List.Item>
              )}
            />
          </Radio.Group>
        </Col>
        <Col span={18} className="Right">
          <Row>
            <Col
              span={8}
              offset={8}
              className="Factor-Obj-h1"
              style={{
                marginBottom: "2vh",
              }}
            >
              <p>场景名称:</p>
              <Input
                value={sceneName}
                onChange={(e) => {
                  setSceneName(e.target.value);
                  props.setScene(e.target.value);
                }}
              />
            </Col>
          </Row>
          <Row gutter={32}>
            <Col span={18} className="Factor-Obj-Card">
              <Card bordered={false} style={{ width: "30vw"}}>
              <p>任务名称:</p>
                <Input
                  value={taskName}
                  onChange={(e) => {
                    setTaskName(e.target.value);
                  }}
                />
                <Divider />
                <p>环境名称:</p>
                <Input
                  value={envName}
                  onChange={(e) => {
                    setEvnName(e.target.value);
                  }}
                />
                <Divider />
                <p>任务描述:</p>
                <TextArea
                  rows={3}
                  value={taskDesc}
                  onChange={(e) => {
                    setTaskDesc(e.target.value);
                  }}
                />
              </Card>
            </Col>
            <Col span={6} className="Factor-Obj-Image">
              <Image src={fileURL} />
              <input
                type="file"
                accept="image/png, image/jpeg"
                onChange={loadImage}
              />
            </Col>
          </Row>
        </Col>
      </Row>
      <Row>
        <Col span={8} offset={8}>
          <Link to="/Simulation/Params">
            <Button block type="primary" onClick={props.goToNextStep}>
              下一页
            </Button>
          </Link>
        </Col>
      </Row>
    </>
  );
}

export default Scene;
