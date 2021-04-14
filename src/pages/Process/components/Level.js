import { useState, useEffect } from "react";
import { Row, Col, Card, Input, Radio, Divider } from "antd";
import { List, Avatar, Button } from "antd";
import { Link } from "react-router-dom";
import UAV1 from "../../../static/Image/UAV1.png";
import { accessLevel_selectall } from "../../../api/api";

const { TextArea } = Input;

function Level(props) {
  const [levels, setLevels] = useState([]);
  const [selectedId, setSelectedId] = useState(0);
  const [levelAccess, setLevelAccess] = useState(null);
  const [levelName, setLevelName] = useState(null);
  const [levelDesc, setLevelDesc] = useState(null);
  useEffect(() => {
    accessLevel_selectall().then((res) => {
      if (res.status !== 200) {
        console.log("加载失败");
      } else {
        console.log(res.data);
        setLevels(res.data);
      }
    });
  }, []);
  return (
    <>
      <Row className="Row" gutter={32}>
        <Col span={6} className="Left">
          <Radio.Group
            onChange={(e) => {
              setSelectedId(e.target.value);
              levels.forEach((item) => {
                if (item.id === e.target.value) {
                  setLevelAccess(item.levelaccess);

                  setLevelName(item.levelname);
                  props.setLevel(item.levelname);

                  setLevelDesc(item.leveldesc);
                }
              });
            }}
            value={selectedId}
          >
            <List
              style={{
                overflowY: "scroll",
                height: "50vh",
                marginTop: "2vh",
              }}
              itemLayout="horizontal"
              dataSource={levels}
              renderItem={(item, index) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar shape="square" size="large" src={UAV1} />}
                    title={item.levelaccess}
                    description={item.levelname}
                  />
                  <Radio value={item.id} />
                </List.Item>
              )}
            />
          </Radio.Group>
        </Col>
        <Col span={18} className="Right">
          <Row gutter={32}>
            <Col span={24} className="Factor-Obj-Card">
              <Card bordered={false} style={{ width: "30vw", margin: "5vh 0" }}>
                <p>访问等级:</p>
                <Input
                  onChange={(e) => setLevelAccess(e.target.value)}
                  value={levelAccess}
                />
                <Divider />
                <p>等级名:</p>
                <Input
                  onChange={(e) => {
                    setLevelName(e.target.value);
                    props.setLevel(e.target.value);
                  }}
                  value={levelName}
                />
                <Divider />
                <p>等级描述:</p>
                <TextArea
                  rows={10}
                  onChange={(e) => setLevelDesc(e.target.value)}
                  value={levelDesc}
                />
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row>
        <Col span={8} offset={8}>
          <Link to="/Process/Scene">
            <Button block type="primary" onClick={props.goToNextStep}>
              下一页
            </Button>
          </Link>
        </Col>
      </Row>
    </>
  );
}

export default Level;
