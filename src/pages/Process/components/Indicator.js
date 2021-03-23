import { useState, useEffec } from "react";

import { Link } from "react-router-dom";
import { Row, Col, Divider, Input, message, Form } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { List, Avatar, Button } from "antd";
import { source_upload } from "../../../api/api";
import Item from "antd/lib/list/Item";
// import { adapt_topsis } from '../../../api/api';

function Indicator(props) {
  return (
    <>
      <Row>
        <Col span={22} offset={1}>
          <Form
            onFinish={(formValue) => {
              // adapt_topsis(formValue, props.source).then(res => {
              //   if(res.status === 200){
              //     console.log(res);
              //     props.setRes(res.data);
              //     console.log('sucesuss');
              //   }
              // })
            }}
          >
            <h1>{props.indicators.Adaptability.name}</h1>
            {props.indicators.Adaptability.firstIndicators.map((item) => (
              <div>
                <Divider />
                <h3>{item.alias}</h3>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-around",
                    flexFlow: "row wrap",
                  }}
                >
                  {item.secondIndicators.map((innerItem) => (
                    <Form.Item
                      key={innerItem.name}
                      label={innerItem.alias}
                      name={innerItem.name}
                      initialValue={innerItem.value}
                      style={{
                        flexBasis: "33%",
                      }}
                    >
                      <Input />
                    </Form.Item>
                  ))}
                </div>
              </div>
            ))}
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Button htmlType="submit">设置参数</Button>
            </div>
          </Form>
        </Col>
      </Row>
      <Row style={{
        marginTop: '2vh'
      }}>
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

export default Indicator;
