import 'antd/dist/antd.css';
import './static/style/App.css'
import React from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
} from '@ant-design/icons';
import Factors from './pages/Factors';
import Process from './pages/Process';
import Simulation from './pages/Simulation';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

class App extends React.Component {
  state = {
    collapsed: false,
  };

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  render() {
    const { collapsed } = this.state;
    return (
      <BrowserRouter>
        <Layout style={{ minHeight: '100vh' }}>
          <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
            <div className="logo" />
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
              <Menu.Item key="1" icon={<PieChartOutlined />}>
                <Link to='/Factors'>评估要素管理</ Link>
              </Menu.Item>
              <Menu.Item key="2" icon={<DesktopOutlined />}>
                <Link to='/Process'>评估过程管理</ Link>
              </Menu.Item>
              <Menu.Item key="3" icon={<FileOutlined />}>
                <Link to='/Simulation'>对象仿真管理</ Link>
              </Menu.Item>
            </Menu>
          </Sider>

          <Layout className="site-layout">
            <Header className="site-layout-background" style={{ padding: 0, textAlign: 'center' }} ><h1>无人系统群体智能评估平台</h1></Header>
            <Content style={{ margin: '0 16px' }}>
              <div className="site-layout-background" style={{ padding: 24, minHeight: '80vh', margin: '16px 0' }}>
                <Switch>
                  <Route path='/Factors' component={Factors} />
                  <Route path='/Process' component={Process} />
                  <Route path='/Simulation' component={Simulation} />
                </Switch>
              </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>陕西省嵌入式系统技术重点实验室</Footer>
          </Layout>
        </Layout>
      </BrowserRouter>
    );
  }
}

export default App;
