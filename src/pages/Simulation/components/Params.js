import React, { useState } from "react";
import { Form, Input, Button, Row, Col, Radio, message } from "antd";
import { game, gazebo } from "../../../api/api";
const params = {
	Pygame: {
		breaktimerate: {
			value: 0.2,
			desc: "0-1",
		},
		breakrate: {
			value: 0.2,
			desc: "0-1",
		},
		obsnums: {
			value: 10,
			desc: "",
		},
		dtargetnums: {
			value: 10,
			desc: "",
		},
		level: {
			value: 1,
			desc: "hide",
		},
	},
	Gazebo: {
		agent_num: {
			value: 0,
			desc: "0-10",
		},
		dtarget_set_rate: {
			value: 0,
			desc: "0-1",
		},
		fagent_set_rate: {
			value: 0,
			desc: "0-1",
		},
		fagent_num_rate: {
			value: 0,
			desc: "0-1",
		},
		sim_sec: {
			value: 0,
			desc: "hide",
		},
		dtargetnum: {
			value: 0,
			desc: "0-10",
		},
	},
};

function Params(props) {
	const [selectedItem, setSelectedItem] = useState("Pygame");
	const onFinish = (values) => {
		if (selectedItem === "Pygame") {
			game(values).then((res) => {
				if (res.status === 200) {
					message.success(res.data);
				} else {
					message.error('仿真失败');
				}
			});
		} else if (selectedItem === "Gazebo") {
			gazebo(values).then((res) => {
				if (res.status === 200) {
					message.success(res.data);
				} else {
					message.error('仿真失败');
				}
			});
		}
	};

	const onFinishFailed = (errorInfo) => {
		console.log("Failed:", errorInfo);
	};
	const layout = {
		labelCol: { span: 8 },
		wrapperCol: { span: 8 },
	};
	const tailLayout = {
		wrapperCol: { offset: 10, span: 10 },
	};
	return (
		<>
			<Row
				gutter={16}
				style={{
					margin: "5vh 0",
				}}
			>
				<Col span={12} offset={6}>
					<Radio.Group
						onChange={(e) => {
							setSelectedItem(e.target.value);
						}}
						value={selectedItem}
						style={{
							display: "flex",
							justifyContent: "center",
						}}
					>
						<Radio
							value={"Pygame"}
							style={{
								marginRight: "5vw",
							}}
						>
							Pygame
            </Radio>
						<Radio value={"Gazebo"}>Gazebo</Radio>
					</Radio.Group>
				</Col>
			</Row>
			<Row>
				<Col span={12} offset={6}>
					<Form {...layout} onFinish={onFinish} onFinishFailed={onFinishFailed}>
						{Object.entries(params[selectedItem]).map((item) => {
							if (item[1].desc === "hide") {
								return null;
							} else {
								return (
									<Form.Item
										label={`${item[0]} （${item[1].desc}）`}
										name={item[0]}
										initialValue={item[1].value}
										key={item[0]}
									>
										<Input />
									</Form.Item>
								);
							}
						})}
						<Form.Item {...tailLayout}>
							<Button type="primary" htmlType="submit">
								提交
              </Button>
						</Form.Item>
					</Form>
				</Col>
			</Row>
		</>
	);
}

export default Params;
