import { useEffect } from "react";
import { Row, Col, Card, message } from "antd";
import * as echarts from "echarts";
import { access, access_selectAllByName } from "../../../api/api";

function Result(props) {
  useEffect(() => {
    if (
      !(props.method && props.obj && props.level && props.scene && props.source)
    ) {
      message.error("前置参数有空缺，请重新进行评估流程！");
      return;
    }
    let params = {
      methodname: props.method,
      accessname: props.obj,
      levelname: props.level,
      scenename: props.scene,
      dataname: props.source,
    };
    access(params).then((res) => {
      if (res.status === 200 && typeof res.data === "number") {
        props.setRes((prevRes) => res.data);
        message.success("评估成功");
      } else {
        message.success("评估失败");
      }
    });
  }, []);
  useEffect(() => {
    if (!props.res) {
      return;
    }
    var chartDom = document.getElementById("chart");
    var myChart = echarts.init(chartDom);
    var option;

    option = {
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b}: {c} ({d}%)",
      },
      legend: {
        data: ["评估分数", "损失分数"],
      },
      series: [
        {
          name: "智能评估",
          type: "pie",
          radius: ["45%", "60%"],
          labelLine: {
            length: 30,
          },
          label: {
            formatter: "{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ",
            backgroundColor: "#F6F8FC",
            borderColor: "#8C8D8E",
            borderWidth: 1,
            borderRadius: 4,

            rich: {
              a: {
                color: "#6E7079",
                lineHeight: 22,
                align: "center",
              },
              hr: {
                borderColor: "#8C8D8E",
                width: "100%",
                borderWidth: 1,
                height: 0,
              },
              b: {
                color: "#4C5058",
                fontSize: 14,
                fontWeight: "bold",
                lineHeight: 33,
              },
              per: {
                color: "#fff",
                backgroundColor: "#4C5058",
                padding: [3, 4],
                borderRadius: 4,
              },
            },
          },
          data: [
            { value: props.res.toFixed(1), name: "评估分数" },
            { value: (100 - props.res).toFixed(1), name: "损失分数" },
          ],
        },
      ],
    };
    option && myChart.setOption(option);
  });
  useEffect(() => {
    access_selectAllByName(props.obj).then((res) => {
      if (res.status === 200) {
        let xAxisData = [];
        let yAxisData = [];
        res.data.forEach(item => {
          xAxisData.push(item.id);
          yAxisData.push(item.result);
        });

        var chartDom = document.getElementById("line-chart");
        var myChart = echarts.init(chartDom);
        var option;

        option = {
          xAxis: {
            type: "category",
            data: xAxisData
          },
          yAxis: {
            type: "value",
          },
          series: [
            {
              data: yAxisData,
              type: "line",
            },
          ],
        };

        option && myChart.setOption(option);
      } else {
        message.error("获取历史数据有误！");
      }
    });
  });

  return (
    <>
      <Row>
        <Col span={4}>
          <Card style={{ width: "100%", marginTop: "10vh" }}>
            <p>评估方法：{props.method}</p>
            <p>评估对象：{props.obj}</p>
            <p>评估等级：{props.level}</p>
            <p>评估场景：{props.scene}</p>
            <p>评估数据源：{props.source}</p>
            <p>评估分数：{props.res.toFixed(1)}</p>
          </Card>
        </Col>
        <Col span={12}>
          <div
            id="chart"
            style={{
              height: "50vh",
            }}
          ></div>
        </Col>
        <Col span={8}>
          <div
            id="line-chart"
            style={{
              height: "50vh",
            }}
          ></div>
        </Col>
      </Row>
    </>
  );
}

export default Result;
