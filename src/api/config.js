import axios from "axios";

const instance = axios.create({
  baseURL: "http://10.27.166.99:8999",
});
export const indicatorsConfig = {
  Adaptability: {
    name: "适应性评估",
    firstIndicators: [
      {
        name: "complicacy",
        alias: "环境复杂性指标体系",
        secondIndicators: [
          {
            name: "obsnum",
            alias: "障碍物数量",
            value: 0,
          },
          {
            name: "obsden",
            alias: "障碍物密度",
            value: 0,
          },
          {
            name: "obshm",
            alias: "障碍物高度均值",
            value: 0,
          },
          {
            name: "obshd",
            alias: "障碍物高度方差",
            value: 0,
          },
          {
            name: "obsregd",
            alias: "障碍物区域密度方差",
            value: 0,
          },
          {
            name: "obsgridd",
            alias: "障碍物栅格密度方差",
            value: 0,
          },
        ],
      },
      {
        name: "availability",
        alias: "系统有效性指标体系",
        secondIndicators: [
          {
            name: "effect",
            alias: "效果",
            value: 0,
          },
          {
            name: "effecincy",
            alias: "效率",
            value: 0,
          },
          {
            name: "benefit",
            alias: "效益",
            value: 0,
          },
        ],
      },
    ],
  },
};
export default instance;
