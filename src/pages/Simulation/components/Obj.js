import { useState, useEffect } from "react";
import { Row, Col, Image, Card, Input, Radio, Divider, message } from "antd";

import { List, Button } from "antd";

import { object_selectall_name, object_selectone } from "../../../api/api";
import { Link } from "react-router-dom";
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
      if (res.status === 200) {
        setObjList(res.data);
      } else {
        message.error("load list fail");
      }
    });
  }, []);
  const loadImage = (e) => {
    setObjFile(e?.target?.files[0]);
    setObjFileURL(URL.createObjectURL(e?.target?.files[0]));
  };
  return (
    <>
      <Row className="Row" gutter={32}>
        <Col span={6} className="Left">
          <Radio.Group
            value={selectedId}
            onChange={(e) => {
              setSelectedId(e.target.value);
              objList.forEach((item) => {
                if (item.id === e.target.value) {
                  setObjName(item.accessname);
                  props.setObj(item.accessname);

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
                  <Radio value={item.id} />
                </List.Item>
              )}
            />
          </Radio.Group>
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
                    props.setObj(e.target.value);
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
      <Row>
        <Col span={8} offset={8}>
          <Link to="/Simulation/Level">
            <Button block type="primary" onClick={props.goToNextStep}>
              下一页
            </Button>
          </Link>
        </Col>
      </Row>
    </>
  );
}

export default Obj;
