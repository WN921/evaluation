import axios from "_axios@0.21.1@axios";
import axiosInstance from "./config";

export const accessLevel_selectall = () => {
  return axiosInstance.get("/accessLevel_selectall");
};
export const accessLevel_add = (levelaccess, levelname, leveldesc) => {
  return axiosInstance.post("/accessLevel_add", null, {
    params: {
      levelaccess,
      levelname,
      leveldesc,
    },
  });
};

export const accessLevel_delete = (name) => {
  return axiosInstance.delete("/accessLevel_delete", {
    params: {
      name,
    },
  });
};

export const accessLevel_update = (levelaccess, levelname, leveldesc) => {
  return axiosInstance.put("/accessLevel_update", null, {
    params: {
      levelaccess,
      levelname,
      leveldesc,
    },
  });
};

export const method_add = (methodname, methodscene, methoddesc) => {
  return axiosInstance.post("/method_add", null, {
    params: {
      methodname,
      methodscene,
      methoddesc,
    },
  });
};

export const method_selectall = () => {
  return axiosInstance.post("/method_selectall");
};

export const method_update = (methodname, methodscene, methoddesc) => {
  return axiosInstance.post("/method_update", null, {
    params: {
      methodname,
      methodscene,
      methoddesc,
    },
  });
};

export const method_delete = (name) => {
  return axiosInstance.post("/method_delete", null, {
    params: {
      name,
    },
  });
};

export const object_upload = (file, accessname, accessscale, accessdesc) => {
  let data = new FormData();
  data.append("file", file);
  return axiosInstance.post("/object_upload", data, {
    params: {
      accessname,
      accessscale,
      accessdesc,
    },
  });
};

export const object_delete = (accessname) => {
  return axiosInstance.delete("/object_delete", {
    params: {
      accessname,
    },
  });
};

export const object_selectall_name = () => {
  return axiosInstance.post("/object_selectall_name");
};

export const object_selectone = (accessname) => {
  return axiosInstance.post("/object_selectone", null, {
    params: {
      accessname,
    },
    responseType: "blob",
  });
};

export const scene_upload = (file, scenename, taskname, envname, taskdesc) => {
  let data = new FormData();
  data.append("file", file);
  return axiosInstance.post("/scene_upload", data, {
    params: {
      scenename,
      taskname,
      envname,
      taskdesc,
    },
  });
};

export const scene_selectall_name = (level) => {
  return axiosInstance.post("/scene_selectall_name", null, {
    params: {
      level,
    },
  });
};

export const scene_selectall = () => {
  return axiosInstance.post("/scene_selectall");
};

export const scene_selectone = (scenename) => {
  return axiosInstance.post("/scene_selectone", null, {
    params: {
      scenename,
    },
    responseType: "blob",
  });
};

export const scene_delete = (scenename) => {
  return axiosInstance.delete("/scene_delete", {
    params: {
      scenename,
    },
  });
};

export const source_upload = (file, accessObject, level, scene, name, desc) => {
  let data = new FormData();
  data.append("file", file);
  return axiosInstance.post("/source_upload", data, {
    params: {
      accessObject,
      level,
      scene,
      name,
      desc,
    },
  });
};
export const source_selectall_name = () => {
  return axiosInstance.post("/source_selectall_name");
};

export const source_selectone = (name) => {
  return axiosInstance.post("/source_selectone", null, {
    params: {
      name,
    },
  });
};
export const source_delete = (name) => {
  return axiosInstance.delete("/source_delete", {
    params: {
      name,
    },
  });
};

export const access = ({
  methodname,
  accessname,
  levelname,
  scenename,
  dataname,
}) => {
  return axiosInstance.post("/access", null, {
    params: {
      methodname,
      accessname,
      levelname,
      scenename,
      dataname,
    },
  });
};

export const access_selectAllByName = (accessname) => {
  return axiosInstance.get("/access_selectAllByName", {
    params: {
      accessname,
    },
  });
};
export const game = ({ breakrate, breaktimerate, dtargetnums, obsnums }) => {
  return axiosInstance.get("/game", {
    params: { breakrate, breaktimerate, dtargetnums, obsnums },
  });
};

export const gazebo = ({
  agent_num,
  dtarget_set_rate,
  dtargetnum,
  fagent_num_rate,
  fagent_set_rate,
}) => {
  return axiosInstance.get("/gazebo", {
    params: {
      agent_num,
      dtarget_set_rate,
      dtargetnum,
      fagent_num_rate,
      fagent_set_rate,
    },
  });
};

export const task_add = (taskname, taskdesc) => {
  return axiosInstance.post("/task_add", null, {
    params: {
      taskname,
      taskdesc,
    },
  });
};

export const task_selectall = () => {
  return axiosInstance.get("/task_selectall");
};

export const task_delete = (name) => {
  return axiosInstance.delete("/task_delete", {
    params: {
      name,
    },
  });
};

export const task_update = (taskname, taskdesc) => {
  return axiosInstance.put('/task_update', null, {
    params:{
      taskname,
      taskdesc
    }
  })
}

export const env_upload = (envname, file, vdesc ) => {
  let data = new FormData();
  data.append("file", file);
  return axiosInstance.post('/env_upload', data, {
    params: {
      envname,
      vdesc 
    }
  })
}

export const env_selectall_name = () => {
  return axiosInstance.post('/env_selectall_name');
}

export const env_delete = (name) => {
  return axiosInstance.delete("/env_delete", {
    params: {
      name,
    },
  });
};