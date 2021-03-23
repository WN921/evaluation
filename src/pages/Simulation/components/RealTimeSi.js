import { Row, Col } from 'antd';

import { EditOutlined, DeleteOutlined} from '@ant-design/icons';
import { List, Avatar, Button } from 'antd';
const data = [
    {
        title: 'Ant Design Title 1',
    },
    {
        title: 'Ant Design Title 2',
    },
    {
        title: 'Ant Design Title 3',
    },
    {
        title: 'Ant Design Title 4',
    },
    {
        title: 'Ant Design Title 4',
    },
    {
        title: 'Ant Design Title 4',
    },
    {
        title: 'Ant Design Title 4',
    },
    {
        title: 'Ant Design Title 4',
    },
    {
        title: 'Ant Design Title 4',
    },
    {
        title: 'Ant Design Title 4',
    },
    {
        title: 'Ant Design Title 4',
    },
    {
        title: 'Ant Design Title 4',
    }
];

function RealTimeSi(props){
    return(
        <Row className='Factor-Row' gutter={16}>
                <Col span={6} className='Factor-Left'>
                    <List
                    style={{
                        overflowY: 'scroll',
                        height:'50vh',
                        marginTop:'2vh'
                    }}
                        itemLayout="horizontal"
                        dataSource={data}
                        renderItem={item => (
                            <List.Item>
                                <List.Item.Meta
                                    avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                    title={<a href="https://ant.design">{item.title}</a>}
                                />
                                <EditOutlined style={{fontSize:'x-large'}}/>
                                <DeleteOutlined  style={{fontSize:'x-large'}}/>
                            </List.Item>
                        )}
                    />
                    <Button block type='primary' style={{
                        marginTop:'3vh'
                    }}>新增</Button>
                </Col>
                <Col span={18} className='Factor-Right'>
                </Col>
            </Row>
    )
};

export default RealTimeSi;