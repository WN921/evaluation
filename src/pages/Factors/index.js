import { Menu } from 'antd';
import '../../static/style/Factors.css'
import { Switch, Route, Link } from 'react-router-dom';
import { Obj, Level, Scene, Method, Data } from './components';




function Factors(props) {
    return (
        <>
            <Menu mode="horizontal" className='Factor-Menu' defaultSelectedKeys={["object"]}>
                <Menu.Item key="object" >
                    <Link to='/Factors/Object' className='object'>评估对象管理</Link>
                </Menu.Item>
                <Menu.Item key="level">
                    <Link to='/Factors/Level' className='level'>评估等级管理</Link>
                </Menu.Item>
                <Menu.Item key="scene">
                    <Link to='/Factors/Scene' className='scene'>评估场景管理</Link>
                </Menu.Item>
                <Menu.Item key="method" >
                    <Link to='/Factors/Method' className='method'>评估方法管理</Link>
                </Menu.Item>
                <Menu.Item key="data" >
                    <Link to='/Factors/Data' className='data'>评估数据管理</Link>
                </Menu.Item>
            </Menu>
            <Switch>
                <Route path='/Factors/Level' component={Level} />
                <Route path='/Factors/Scene' component={Scene} />
                <Route path='/Factors/Method' component={Method} />
                <Route path='/Factors/Data' component={Data} />
                <Route path='/Factors' component={Obj} />
            </Switch>

        </>
    );
}

export default Factors;