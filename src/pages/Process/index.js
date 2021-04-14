import React, { useState } from "react";
import { Steps } from "antd";
import "../../static/style/Process.css";
import { Switch, Route } from "react-router-dom";
import { Obj, Level, Scene, Source, Result, Method } from "./components";

const { Step } = Steps;

function Process(props) {
  const [step, setStep] = useState(0);
  const [method, setMethod] = useState("");
  const [obj, setObj] = useState("");
  const [level, setLevel] = useState("");
  const [scene, setScene] = useState("");
  const [source, setSource] = useState("");
  // const [indicators, setIndicators] = useState(indicatorsConfig);
  // const [rawIndicators, setRawIndicators] = useState(null);
  const [res, setRes] = useState(0);
  const goToNextStep = () => {
    setStep((step + 1) % 7);
  };

  return (
    <>
      <Steps current={step}>

        <Step title="评估对象选择" />
        <Step title="评估等级选择" />
        <Step title="评估场景选择" />
        <Step title="评估数据源选择" />
        <Step title="评估方法选择" />
        {/* <Step title="为指标分配权重" /> */}
        <Step title="评估结果" />
      </Steps>
      <Switch>
        <Route path="/Process/Level">
          <Level goToNextStep={goToNextStep} setLevel={setLevel} />
        </Route>
        <Route path="/Process/Scene">
          <Scene goToNextStep={goToNextStep} setScene={setScene} level={level} />
        </Route>
        <Route path="/Process/Source">
          <Source goToNextStep={goToNextStep} obj={obj} level={level} scene={scene} setSource={setSource} />
        </Route>
        {/* <Route path="/Process/Indicator">
          <Indicator goToNextStep={goToNextStep} indicators={indicators} setRawIndicators={setRawIndicators} rawIndicators={rawIndicators} source={source} setRes={setRes}/>
        </Route> */}
        <Route path="/Process/Result">
          <Result goToNextStep={goToNextStep} obj={obj} level={level} scene={scene} source={source} res={res} method={method} setRes={setRes} />
        </Route>
        <Route path="/Process/method">
          <Method goToNextStep={goToNextStep} setMethod={setMethod} />
        </Route>
        <Route path="/Process">
          <Obj goToNextStep={goToNextStep} setObj={setObj} />
        </Route>

      </Switch>
    </>
  );
}

export default Process;
