import { useState, useEffect } from "react";
import {
  Menu,
  Row,
  Col,
  Radio,
  Card,
  Input,
  message,
  Popconfirm,
  Dropdown,
  List,
  Button,
} from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import {
  source_upload,
  source_selectall_name,
  source_delete,
  object_selectall_name
} from "../../../api/api";

const { TextArea } = Input;

function Data(props) {
  const [file, setFile] = useState(null);
  const [sourceName, setSourceName] = useState("");
  const [objName, setObjName] = useState("");
  const [levelName, setLevelName] = useState("");
  const [sceneName, setSceneName] = useState("");
  const [sourceDesc, setSourceDesc] = useState("");
  const [sources, setSources] = useState({});
  const [objList, setObjList] = useState([]);

  useEffect(() => {
    source_selectall_name().then((res) => {
      if (res.status === 200) {
        /*此处将数据转化为
        {
          评估对象名：[数据源1，数据源2],
          ....
        }
        
        */
        let sources = {};
        res.data.forEach((item) => {
          if (sources[item.accessobject]) {
            sources[item.accessobject].push(item);
          } else {
            sources[item.accessobject] = [item];
          }
        });
        setSources(sources);
        
      } else {
        message.error("加载失败");
      }
    });
    object_selectall_name().then(res => {
      if(res.status === 200){
        console.log(res.data);
        setObjList(res.data);
      }
    })
  }, []);
  const loadFile = (e) => {
    setFile(e.target.files[0]);
  };
  const upLoadFile = () => {
    source_upload(
      file,
      objName,
      levelName,
      sceneName,
      sourceName,
      sourceDesc
    ).then((res) => {
      if (res.status === 200) {
        message.success(res?.data);
        setSourceName(sourceName);
      } else {
        message.error("上传失败");
      }
    });
  };
  const confirm = (name) => {
    if (!name) {
      message.error("请先选择一个数据源");
      return;
    }
    source_delete(name).then((res) => {
      if (res.status === 200) {
        message.success(res.data);
      } else {
        message.error("删除成功");
      }
    });
  };

  const menu = sources[objName] ? (
    <Menu
      onClick={({ item, key, keyPath, domEvent }) => {
        setSourceName(key);
        sources[objName].forEach((item) => {
          if (item.accessname === key) {
            setLevelName(item.accesslevel);
            setSceneName(item.accessscene);
            setSourceDesc(item.accessdesc);
          }
        });
      }}
    >
      {sources[objName].map((item) => (
        <Menu.Item key={item.accessname}>{item.accessname}</Menu.Item>
      ))}
    </Menu>
  ) : (
    <Menu></Menu>
  );
  return (
    <Row className="Row" gutter={16}>
      <Col span={6} className="Left">
        <Radio.Group
          value={objName}
          onChange={(e) => {
            setObjName(e.target.value);
            setSourceName("");
            setLevelName("");
            setSceneName("");
            setSourceDesc("");
          }}
        >
          <List
            style={{
              overflowY: "scroll",
              height: "50vh",
              marginTop: "2vh",
            }}
            itemLayout="horizontal"
            dataSource={objList}
            renderItem={(item, index) => (
              <List.Item>
                <List.Item.Meta title={item.accessname} />
                <Popconfirm
                  title="Are you sure to delete this level?"
                  onConfirm={() => confirm(sourceName)}
                  okText="Yes"
                  cancelText="No"
                >
                  <DeleteOutlined style={{ fontSize: "x-large" }} />
                </Popconfirm>
                <Radio value={item.accessname} />
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
          onClick={upLoadFile}
        >
          新增
        </Button>
      </Col>

      <Col span={18} className="Right">
        <Row>
          <Col span={12} className="Center">
            <p>{`数据源名称:`}</p>
            <Input
              style={{
                width: "10vw",
              }}
              value={sourceName}
              onChange={(e) => {
                setSourceName(e.target.value);
              }}
            />
          </Col>
          <Col span={12} className="Center">
            <Dropdown overlay={menu} placement="bottomLeft" arrow>
              <Button>数据源名称列表</Button>
            </Dropdown>
          </Col>
        </Row>
        <Row
          style={{
            margin: "5vh 0",
          }}
        >
          <Col span={12} className="Center">
            <p>{`等级:`}</p>
            <Input
              style={{
                width: "10vw",
              }}
              value={levelName}
              onChange={(e) => {
                setLevelName(e.target.value);
              }}
            />
          </Col>
          <Col span={12} className="Center">
            <p>{`场景:`}</p>
            <Input
              style={{
                width: "10vw",
              }}
              value={sceneName}
              onChange={(e) => {
                setSceneName(e.target.value);
              }}
            />
          </Col>
        </Row>
        <Row gutter={32}>
          <Col
            span={24}
            style={{
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
            }}
          >
            <Card bordered={false} style={{ width: "30vw", margin: "5vh 0" }}>
              <p>{`数据源描述信息：`}</p>
              <TextArea
                rows={10}
                value={sourceDesc}
                onChange={(e) => {
                  setSourceDesc(e.target.value);
                }}
              />
            </Card>
            <input type="file" onChange={loadFile} />
          </Col>
        </Row>
      </Col>
    </Row>
  );
}

export default Data;
