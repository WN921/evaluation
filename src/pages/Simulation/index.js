import React, { useState } from 'react';
import { Steps } from 'antd';
import '../../static/style/Simulation.css'
import { Switch, Route } from 'react-router-dom';
import { Obj, Level, Scene, Params } from './components';

const { Step } = Steps;

function Simulation(props) {
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
        setStep((step + 1) % 5);
    };
    return (
        <>
            <Steps current={step}>
                <Step title="评估对象选择" />
                <Step title="评估等级选择" />
                <Step title="评估场景选择" />
                <Step title="输入仿真参数" />
                {/* <Step title="实时仿真" /> */}
            </Steps>
            <Switch>
                <Route path='/Simulation/Level' >
                    <Level goToNextStep={goToNextStep} setLevel={setLevel} />
                </Route>
                <Route path='/Simulation/Scene'>
                    <Scene goToNextStep={goToNextStep} setScene={setScene} level={level}/>
                </Route>
                <Route path='/Simulation/Params'>
                    <Params goToNextStep={goToNextStep} />
                </Route>
                {/* <Route path='/Simulation/RealTimeSi'>
                    <RealTimeSi />
                </Route> */}
                <Route path='/Simulation'>
                    <Obj goToNextStep={goToNextStep} setObj={setObj} />
                </Route>
            </Switch>
        </>
    )
}

export default Simulation;