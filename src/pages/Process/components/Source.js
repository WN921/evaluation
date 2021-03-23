import { useState } from "react";

import { Link } from "react-router-dom";
import { Row, Col, Divider, message, Card, Radio } from "antd";
import {   Button } from "antd";
import { source_selectall_name } from "../../../api/api";
const gridStyle = {
  width: "25%",
};

function Source(props) {
  const [sources, setSources] = useState([]);
  const [selecedSource, setSelectedSource] = useState("");
  const selectAllSources = () => {
    source_selectall_name().then((res) => {
      if (res.status === 200) {
        message.success("获取数据源列表成功");
        setSources(res.data);
      }
    });
  };
  return (
    <>
      <Row
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "5vh",
        }}
      >
        <h1>选择待评估的数据源</h1>
      </Row>
      <Divider />
      <Row>
        <Col span={8} className="Center">
          <h1>方式一：从数据库选择数据源</h1>
        </Col>
        <Col span={16} className="Center">
          <Button type="primary" onClick={selectAllSources}>
            点击查询
          </Button>
        </Col>
      </Row>
      <Radio.Group
        onChange={(e) => {
          setSelectedSource(e.target.value);
          props.setSource(e.target.value);
        }}
        value={selecedSource}
      >
        <Card>
          {sources.map((item) => (
            <Card.Grid hoverable={false} style={gridStyle}>
              <p>{`数据源名称：${item.accessname}`}</p>
              <p>{`对象：${item.accessobject}`}</p>
              <p>{`场景：${item.accessscene}`}</p>
              <p>{`等级：${item.accesslevel}`}</p>
              <p>{`数据源描述：${item.accessdesc}`}</p>
              <Radio value={item.accessname}></Radio>
            </Card.Grid>
          ))}
        </Card>
      </Radio.Group>
      <Divider />
      <Row>
        <Col span={8} className="Center">
          <h1>方式二：仿真获取</h1>
        </Col>
        <Col span={16} className="Center">
          <Link to='/Simulation'>
          <Button type="primary">进入仿真</Button>
          </Link>
        </Col>
      </Row>
      <Row
        style={{
          marginTop: "5vh",
        }}
      >
        <Col span={8} offset={8}>
          <Link to="/Process/method">
            <Button block type="primary" onClick={props.goToNextStep}>
              下一页
            </Button>
          </Link>
        </Col>
      </Row>
    </>
  );
}

export default Source;
