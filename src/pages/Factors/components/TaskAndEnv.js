import { useState, useEffect } from "react";
import { Row, Col, Input, Radio, Divider, message, Popconfirm } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { List, Button } from "antd";
import {
  task_add,
  task_selectall,
  task_delete,
  task_update,
  env_upload,
	env_selectall_name,
	env_delete,
} from "../../../api/api";
const { TextArea } = Input;

function TaskAndEnv(props) {
  const [taskName, setTaskName] = useState("");
  const [taskDesc, setTaskDesc] = useState("");
  const [taskList, setTaskList] = useState([]);
  const [selectedTastId, setSelectedTaskId] = useState(0);

  const [envName, setEnvName] = useState("");
  const [file, setFile] = useState(null);
	const [envList, setEnvList] = useState([]);
	const [selectedEnvId, setSelectedEnvId] = useState(0);
  const [envDesc, setEnvDesc] = useState('');


  useEffect(() => {
    task_selectall().then((res) => {
      if (res.status === 200) {
        setTaskList(res.data);
      }
			else {
				message.error('加载失败');
			}
    });
		env_selectall_name().then((res) => {
      if (res.status === 200) {
				console.log(res.data);
        setEnvList(res.data);
      }
			else {
				message.error('加载失败');
			}
    });
  }, []);

  const addTask = () => {
    task_add(taskName, taskDesc).then((res) => {
      if (res.status === 200) {
        console.log(res.data);
        message.success(res.data);
      }
    });
  };

  const confirmTask = (taskname) => {
    task_delete(taskname).then((res) => {
      if (res.status === 200) {
        message.success(res.data);
      } else {
        message.error("删除失败");
      }
    });
  };

	const confirmEnv = (envname) => {
    env_delete(envname).then((res) => {
      if (res.status === 200) {
        message.success(res.data);
      } else {
        message.error("删除失败");
      }
    });
  };

  const updateTask = () => {
    task_update(taskName, taskDesc).then((res) => {
      if (res.status === 200) {
        message.success(res.data);
      } else {
        message.error('上传失败');
      }
    });
  };
  return (
    <Row gutter={16}>
      <Col span={6}>
        <Radio.Group
          value={selectedTastId}
          onChange={(e) => {
            setSelectedTaskId(e.target.value);
            taskList.forEach((item) => {
              if (item.id === e.target.value) {
                setTaskDesc(item.taskdesc);
                setTaskName(item.taskname);
              }
            });
          }}
        >
          <List
            style={{
              overflowY: "scroll",
              height: "30vh",
              marginTop: "2vh",
            }}
            itemLayout="horizontal"
            dataSource={taskList}
            renderItem={(item, index) => (
              <List.Item>
                <List.Item.Meta title={item.taskname} />
                <EditOutlined
                  style={{ fontSize: "x-large" }}
                  onClick={updateTask}
                />
                <Popconfirm
                  title="Are you sure to delete this?"
                  onConfirm={() => confirmTask(item.taskname)}
                  okText="Yes"
                  cancelText="No"
                >
                  <DeleteOutlined style={{ fontSize: "x-large" }} />
                </Popconfirm>
                <Radio value={item.id} />
              </List.Item>
            )}
          />
        </Radio.Group>
        <Button
          block
          type="primary"
          style={{
            marginTop: "3vh",
          }}
          onClick={addTask}
        >
          新增
        </Button>
      </Col>
      <Col span={6}>
        <p>任务名：</p>
        <Input
          value={taskName}
          onChange={(e) => {
            setTaskName(e.target.value);
          }}
        />
        <Divider />
        <p>任务描述：</p>
        <TextArea
          rows={3}
          value={taskDesc}
          onChange={(e) => {
            setTaskDesc(e.target.value);
          }}
        />
      </Col>
      <Col span={6}>
        <Radio.Group
				value={selectedEnvId}
				onChange={e => {
					setSelectedEnvId(e.target.value);
					envList.forEach(item => {
						if(item.id === e.target.value){
							setEnvName(item.envname);
              setEnvDesc(item.vdesc)
						}
					})
				}}
				>
          <List
            style={{
              overflowY: "scroll",
              height: "30vh",
              marginTop: "2vh",
            }}
            itemLayout="horizontal"
						dataSource={envList}
						renderItem={(item, index) => (
							<List.Item>
								<List.Item.Meta title={item.envname} />
								<Popconfirm
									title="Are you sure to delete this?"
									onConfirm={() => confirmEnv(item.envname)}
									okText="Yes"
									cancelText="No"
								>
									<DeleteOutlined style={{ fontSize: "x-large" }} />
								</Popconfirm>
								<Radio value={item.id} />
							</List.Item>
						)}
          />
        </Radio.Group>
        <Button
          block
          type="primary"
          style={{
            marginTop: "3vh",
          }}
          onClick={() => {
						env_upload(envName, file, envDesc).then(res => {
							if(res.status === 200){
								message.success(res.data);
							}
							else{
								message.error('upload fail');
							}
						})
					}}
        >
          新增
        </Button>
      </Col>
      <Col span={6}>
        <p>环境名：</p>
        <Input
          value={envName}
          onChange={(e) => {
            setEnvName(e.target.value);
          }}
        />
        <Divider />
        
        <p>环境描述：</p>
        <TextArea
          rows={3}
          value={envDesc}
          onChange={(e) => {
            setEnvDesc(e.target.value);
          }}
        />
        <Divider />
        <input
          type="file"
          onChange={(e) => {
            setFile(e.target.files[0]);
          }}
        ></input>
      </Col>
    </Row>
  );
}

export default TaskAndEnv;
