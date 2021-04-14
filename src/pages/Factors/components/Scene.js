import { useState, useEffect } from "react";
import {
  Row,
  Col,
  Image,
  Card,
  Input,
  Radio,
  Divider,
  message,
  Popconfirm,
  Menu,
  Dropdown,
  Select,
} from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { Switch, Route, Link } from "react-router-dom";
import { List, Button } from "antd";
import {
  scene_upload,
  scene_selectall,
  scene_selectone,
  scene_delete,
  task_selectall,
  env_selectall_name,
} from "../../../api/api";
import TaskAndEnv from "./TaskAndEnv";
const { TextArea } = Input;
const { Option } = Select;
function Scene(props) {
  const [sceneName, setSceneName] = useState("");
  const [taskName, setTaskName] = useState("");
  const [envName, setEvnName] = useState("");
  const [taskDesc, setTaskDesc] = useState("");
  const [file, setFile] = useState(null);
  const [fileURL, setFileURL] = useState("");
  const [sceneList, setSceneList] = useState([]);
  const [selectedId, setSelectedId] = useState(0);

  const [taskList, setTaskList] = useState([]);
  const [envList, setEnvList] = useState([]);

  useEffect(() => {
    scene_selectall().then((res) => {
      if (res?.status === 200) {
        console.log(res.data);
        setSceneList(res.data);
      } else {
        message.error("加载失败");
      }
    });

    task_selectall().then((res) => {
      if (res.status === 200) {
        setTaskList(res.data);
      } else {
        message.error("加载失败");
      }
    });

    env_selectall_name().then((res) => {
      if (res.status === 200) {
        console.log(res.data);
        setEnvList(res.data);
      } else {
        message.error("加载失败");
      }
    });
  }, []);

  const loadImage = (e) => {
    setFile(e?.target?.files[0]);
    setFileURL(URL.createObjectURL(e?.target?.files[0]));
  };

  const uploadScene = () => {
    scene_upload(file, sceneName, taskName, envName, taskDesc).then((res) => {
      if (res.status === 200) {
        message.success(res.data);
      } else {
        message.error('上传失败');
      }
    });
  };

  const confirm = (scenename) => {
    scene_delete(scenename).then((res) => {
      if (res.status === 200) {
        message.success(res.data);
      } else {
        message.error("删除失败");
      }
    });
  };

  const taskMenu = (
    <Menu>
      {taskList.map((item) => (
        <Menu.Item onClick={() => setTaskName(item.taskname)}>
          {item.taskname}
        </Menu.Item>
      ))}
    </Menu>
  );

  const envMenu = (
    <Menu>
      {envList.map((item) => (
        <Menu.Item onClick={() => setEvnName(item.envname)}>
          {item.envname}
        </Menu.Item>
      ))}
    </Menu>
  );
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
                  <Popconfirm
                    title="Are you sure to delete this method?"
                    onConfirm={() => confirm(item.scenename)}
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
            style={{
              marginTop: "3vh",
            }}
            onClick={uploadScene}
          >
            新增
          </Button>
        </Col>
        <Col span={18} className="Right">
          <div>
            <Menu
              mode="horizontal"
              defaultSelectedKeys={["Scene"]}
              style={{
                display: "flex",
                justifyContent: "center",
                alignContent: "center",
                marginBottom: "2vh",
              }}
            >
              <Menu.Item key="Scene">
                <Link to="/Factors/Scene">场景信息</Link>
              </Menu.Item>
              <Menu.Item key="TaskAndEnv">
                <Link to="/Factors/Scene/TaskAndEnv">任务和环境管理</Link>
              </Menu.Item>
            </Menu>
          </div>
          <Switch>
            <Route path="/Factors/Scene/TaskAndEnv">
              <TaskAndEnv />
            </Route>
            <Route path="/Factors/Scene">
              <Row>
                <Col
                  span={8}
                  offset={8}
                  className="Factor-Obj-h1 scene"
                  style={{
                    marginBottom: "2vh",
                  }}
                >
                  <p>场景名称:</p>
                  <Input
                    value={sceneName}
                    onChange={(e) => {
                      setSceneName(e.target.value);
                    }}
                  />
                </Col>
              </Row>
              <Row gutter={32} className="scene-item">
                <Col span={18} className="Factor-Obj-Card">
                  <Card
                    bordered={false}
                    className="Center"
                    style={{ width: "30vw", margin: "0" }}
                  >
                    {/* <Input.Group compact>
                      <Select defaultValue="任务名称">
                        <Option value="Zhejiang">Zhejiang</Option>
                        <Option value="Jiangsu">Jiangsu</Option>
                      </Select>
                    </Input.Group> */}

                    <Dropdown overlay={taskMenu} placement="bottomLeft">
                      <Button visible={false}>任务名称</Button>
                    </Dropdown>
                    <Input value={taskName} disabled />
                    <Divider />
                    <Dropdown overlay={envMenu} placement="bottomLeft">
                      <Button>环境名称</Button>
                    </Dropdown>
                    <Input value={envName} disabled />
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
            </Route>
          </Switch>
        </Col>
      </Row>
    </>
  );
}

export default Scene;
