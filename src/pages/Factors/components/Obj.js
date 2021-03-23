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
} from "antd";
import {
  DeleteOutlined,
} from "@ant-design/icons";
import { List, Button } from "antd";
import {
  object_upload,
  object_selectall_name,
  object_delete,
  object_selectone,
} from "../../../api/api";

const { TextArea } = Input;

function Obj(props) {
  const [objName, setObjName] = useState("");
  const [objScale, setObjScale] = useState("");
  const [objDesc, setObjDesc] = useState("");
  const [objFile, setObjFile] = useState(null);
  const [objFileURL, setObjFileURL] = useState("");
  const [selectedId, setSelectedId] = useState(0);
  const [objList, setObjList] = useState([]);

  useEffect(() => {
    object_selectall_name().then((res) => {
      console.log(res.data);
      if (res.status === 200) {
        setObjList(res.data);
      } else {
        message.error("load list fail");
      }
    });
  }, []);
  const confirm = (accessname) => {
    object_delete(accessname).then((res) => {
      if (res.status === 200) {
        message.success(res.data);
      } else {
        message.error("delete fail");
      }
    });
  };
  const loadImage = (e) => {
    setObjFile(e?.target?.files[0]);
    setObjFileURL(URL.createObjectURL(e?.target?.files[0]));
  };
  const uploadObj = () => {

    //判断是否冲突
    let conflict = false;
    objList.forEach((item) => {
      if (conflict) {
        return;
      }
      if (item.accessname === objName) {
        conflict = true;
        return;
      }
    });

    //不冲突则直接上传
    if (conflict) {
      return;
    }
    object_upload(objFile, objName, objScale, objDesc).then((res) => {
      if (res.data) {
        message.success(res.data);
      } else {
        message.error("delete fail");
      }
    });
  };
  
  return (
    <>
      <Row className="Row" gutter={32} className="object-item">
        <Col span={6} className="Left">
          <Radio.Group
            value={selectedId}
            onChange={(e) => {
              setSelectedId(e.target.value);
              objList.forEach((item) => {
                if (item.id === e.target.value) {
                  setObjName(item.accessname);
                  setObjScale(item.accessscale);
                  setObjDesc(item.accessdesc);
                  object_selectone(item.accessname).then((res) => {
                    if (res.status === 200) {
                      setObjFile(res.data);
                      setObjFileURL(URL.createObjectURL(res.data));
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
              dataSource={objList}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta title={item.accessname} />
                  <Popconfirm
                    title="Are you sure to delete this method?"
                    onConfirm={() => confirm(item.accessname)}
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
            onClick={uploadObj}
          >
            新增
          </Button>
        </Col>
        <Col span={18} className="Right">
          <Row gutter={32}>
            <Col span={18} className="Factor-Obj-Card">
              <Card bordered={false} style={{ width: "30vw" }}>
                <p>评估对象名称:</p>
                <Input
                  value={objName}
                  onChange={(e) => {
                    setObjName(e.target.value);
                  }}
                />
                <Divider />
                <p>评估对象规模:</p>
                <Input
                  value={objScale}
                  onChange={(e) => {
                    setObjScale(e.target.value);
                  }}
                />
                <Divider />
                <p>评估对象描述:</p>
                <TextArea
                  rows={5}
                  value={objDesc}
                  onChange={(e) => {
                    setObjDesc(e.target.value);
                  }}
                />
              </Card>
            </Col>
            <Col span={6} className="Factor-Obj-Image">
              <Image src={objFileURL} />
              <input
                type="file"
                onChange={loadImage}
                accept="image/png, image/jpeg"
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
}

export default Obj;
