import { getAction,postAction} from '@/api/manage'

const getBaseList = (params)=>getAction("/baseInfo/list",params);
const getBaseListAll = (params)=>getAction("/baseInfo/selectAll",params);
const delBase = (params)=>getAction("/baseInfo/delete",params);
const getBaseTypeEnum = (params)=>getAction("/enum/getBaseTypeEnum",params);
const getBaseCategoryEnum = (params)=>getAction("/enum/getCategoryEnum",params);
const getChinaArea = (params)=>getAction("/area/getAreaByLevel",params);
const getSecondArea = (params)=>getAction("/area/getAreaByParentCode",params);
const getSoilTypeEnum = (params)=>getAction("/enum/getSoilTypeEnum",params);
const getBaseAllTest = (params)=>getAction("/envStandards/all",params);
const addBase = (params)=>postAction("/baseInfo/add",params);
const editBase = (params)=>postAction("/baseInfo/update",params);
const getEnvStandards = (params)=>getAction("/enum/getEnvStandardsEnum",params);
const getEnvStandardsList = (params)=>getAction("/envStandards/list",params);
const delEnvStandards = (params)=>getAction("/envStandards/delete",params);
const getUnit = (params)=>getAction("/enum/getDetectionUnitEnum",params);
const addEnvStandards = (params)=>postAction("/envStandards/add",params);
const editEnvStandards = (params)=>postAction("/envStandards/update",params);
const addBaseUser = (params)=>postAction("/baseUserRel/add",params);
const delBaseUser = (params)=>getAction("/baseUserRel/delete",params);
const getBaseUserList = (params)=>getAction("/baseUserRel/list",params);
const getALLBaseList = (params)=>getAction("/baseInfo/all",params);
const getALLBaseUserList = (params)=>getAction("/user/all",params);
const getALLBaseUserandrole = (params)=>getAction("/user/getUserAndRole",params);
const getPlotList = (params)=>getAction("/lot/list",params);
const delPlot = (params)=>getAction("/lot/delete",params);
const addPlot = (params)=>postAction("/lot/add",params);
const editPlot = (params)=>postAction("/lot/update",params);
const getAllUser = (params)=>getAction("/user/all",params);
const getPlotById= (params)=>getAction("/lot/getLotById",params);
const delPic= (params)=>getAction("/pictureInfo/delete",params);
const getCropList= (params)=>getAction("/crop/list",params);
const addCrop = (params)=>postAction("/crop/add",params);
const delCrop= (params)=>getAction("/crop/delete",params);
const editCrop = (params)=>postAction("/crop/update",params);
const getPucType= (params)=>getAction("/enum/getHarvestedTypeEnum",params);
const getBaseWithoutUser= (params)=>getAction("/baseInfo/getBaseWithoutUser",params);
const getBaseListbyid = (params)=>getAction("/baseInfo/selectByPrimaryKey",params);
const getallplan = (params)=>getAction("/plantingPlan/all",params);
const getBatchByPlanId = (params)=>getAction("/cropBatch/getBatchByPlanId",params);
const getBudgetList = (params)=>getAction("/budget/list",params);
const delCsp = (params)=>getAction("/harvestedPro/delete",params);
const getAllCrop = (params)=>getAction("/crop/all",params);
const getAllBusiness = (params)=>getAction("/budget/getBusinessReport",params);
const getAllFarm = (params)=>getAction("/user/getFarmer",params);


/*公司信息管理*/
const getCompanyList = (params)=>getAction("/companyInfo/list",params);
const addCompany = (params)=>postAction("/companyInfo/insert",params);
const updateCompany = (params)=>postAction("/companyInfo/update",params);
const delCompany = (params)=>getAction("/companyInfo/delete",params);
/*公司信息管理*/


/*用肥情况管理*/
const getFertilizersList = (params)=>getAction("/fertilizers/list",params);
const addFertilizers = (params)=>postAction("/fertilizers/insert",params);
const updateFertilizers = (params)=>postAction("/fertilizers/update",params);
const delFertilizers = (params)=>getAction("/fertilizers/delete",params);
/*用肥情况管理*/ 
const delFile = (params)=>getAction("/fileInfo/delete",params);

/*设备管理*/
const addEquipment = (params)=>postAction("/equipment/insert",params);
const updateEquipment = (params)=>postAction("/equipment/update",params);
const delEquipment = (params)=>getAction("/equipment/delete",params);
const getEquipmentList =(params)=>getAction("/equipment/list",params);
const getBoardUrl = params => getAction('/equipment/getBoardUrl', params)
/*设备管理*/

/*预警值*/
const addWarnEnv = (params)=>postAction("/warnEnv/insert",params);
const updateWarnEnv = (params)=>postAction("/warnEnv/update",params);
const delWarnEnv =(params)=>getAction("/warnEnv/delete",params);
const getWarnEnvList =(params)=>getAction("/warnEnv/list",params);
const getEquipmentIdAndNameList =(params)=>getAction("/equipment/getEquipmentIdAndNameList",params);
/*预警值*/

const changeStatus = (params) => getAction("/warnEnv/updateStatus", params)
const getOrderLocal =(params)=>getAction("/workOrder/getOrderLocal",params);
/*监测数据*/
const getEnvmonitorList = (params)=>getAction("/envmonitor/list",params);
const delEnvmonitor = (params)=>getAction("/envmonitor/delete",params);
const getEnvChart = (params)=>getAction("/envmonitor/getEnvChart",params); 
/*监测数据*/

/*监测设备校验*/
const checkEquipment = (params)=>getAction("/equipment/checkId",params);
/*监测设备校验*/

/*服务团队*/
const getTeamList = (params)=>getAction("/team/list",params);
const delTeam = (params)=>getAction("/team/delete",params);
const addTeam = (params)=>postAction("/team/insert",params);
const updateTeam = (params)=>postAction("/team/update",params);
/*服务团队*/

/*监控设备*/
const addVideoEquipment = (params)=>postAction("/videoEquipment/insert",params);
const updateVideoEquipment = (params)=>postAction("/videoEquipment/update",params);
const delVideoEquipment = (params)=>getAction("/videoEquipment/delete",params);
const getVideoEquipmentList = (params)=>getAction("/videoEquipment/list",params);
const getVideoEquipment = (params)=>getAction("/videoEquipment/getList",params);
/*监控设备*/

/*通道与基地对应关系*/
const addVideoChannel = (params)=>postAction("/videoChannel/insert",params);
const updateVideoChannel = (params)=>postAction("/videoChannel/update",params);
const delVideoChannel = (params)=>getAction("/videoChannel/delete",params);
const getVideoChannelList = (params)=>getAction("/videoChannel/list",params);
/*通道与基地对应关系*/

// 监测数据异常
const warnData = (params)=>getAction("/warnRecord/getWarnRecord",params);
const getDeviceBase = (params)=>getAction("/baseInfo/getBaseEquipment",params);

// 监测数据缺失
const loseData = (params) => getAction("/monitorLack/list", params)

//获取有监控设备的基地
const getBaseEquipment = (params) => getAction("/baseInfo/getBaseEquipment",params)

//获取监控视频的token
const getYsToken = (params) => getAction("/common/getYsToken",params)

//获取所有监控设备
const getVideoList = (params)=>getAction("/videoEquipment/getVideoList",params);

// 金融管理

// 年份
const getContractYear = params => getAction('/contractYear/all', params)

// 基地订单采购
const getBasePurchase = params => getAction("/basePurchase/list", params)
const addBasePurchase = params => postAction("/basePurchase/add", params)
const updateBasePurchase = params => postAction("/basePurchase/update", params)
const deleteBasePurchase = params => getAction("/basePurchase/delete", params)

// 规范化种植协议
const getStandardPlan = params => getAction("/standardPlan/list", params)
const addStandardPlan = params => postAction("/standardPlan/add", params)
const updateStandardPlan = params => postAction("/standardPlan/update", params)
const deleteStandardPlan = params => getAction("/standardPlan/delete", params)

// 肥料采购合同
const getFertilizerPurchase = params => getAction("/fertilizerPurchase/list", params)
const addFertilizerPurchase = params => postAction("/fertilizerPurchase/add", params)
const updateFertilizerPurchase = params => postAction("/fertilizerPurchase/update", params)
const deleteFertilizerPurchase = params => getAction("/fertilizerPurchase/delete", params)

// 肥料交付情况
const getFertilizerDeliver = params => getAction("/fertilizerDeliver/list", params)
const addFertilizerDeliver = params => postAction("/fertilizerDeliver/add", params)
const updateFertilizerDeliver = params => postAction("/fertilizerDeliver/update", params)
const deleteFertilizerDeliver = params => getAction("/fertilizerDeliver/delete", params)

// 劳务派遣合同
const getLaborDispatch = params => getAction("/laborDispatch/list", params)
const addLaborDispatch = params => postAction("/laborDispatch/add", params)
const updateLaborDispatch = params => postAction("/laborDispatch/update", params)
const deleteLaborDispatch = params => getAction("/laborDispatch/delete", params)

// 订单合同
const getOrderContract = params => getAction("/orderContract/list", params)
const addOrderContract = params => postAction("/orderContract/add", params)
const updateOrderContract = params => postAction("/orderContract/update", params)
const deleteOrderContract = params => getAction("/orderContract/delete", params)

// 质押物权合同
const getPledgeGoods = params => getAction("/pledgeGoods/list", params)
const addPledgeGoods = params => postAction("/pledgeGoods/add", params)
const updatePledgeGoods = params => postAction("/pledgeGoods/update", params)
const deletePledgeGoods = params => getAction("/pledgeGoods/delete", params)

// 保险合同
const getInsuranceContract = params => getAction("/insuranceContract/list", params)
const addInsuranceContract = params => postAction("/insuranceContract/add", params)
const updateInsuranceContract = params => postAction("/insuranceContract/update", params)
const deleteInsuranceContract = params => getAction("/insuranceContract/delete", params)

// 贷款合同
const getLoanContract = params => getAction("/loanContract/list", params)
const addLoanContract = params => postAction("/loanContract/add", params)
const updateLoanContract = params => postAction("/loanContract/update", params)
const deleteLoanContract = params => getAction("/loanContract/delete", params)
const getLoanType = params => getAction('/enum/getLoanTypeEnum', params)


const getNum = params => getAction('/orderApply/getPendDisCount',params)

export {
  getNum,
  getVideoList,
  getYsToken,
  getBaseEquipment,
  addVideoChannel,
  updateVideoChannel,
  delVideoChannel,
  getVideoChannelList,

  addVideoEquipment,
  updateVideoEquipment,
  delVideoEquipment,
  getVideoEquipmentList,
  getVideoEquipment,

  getTeamList,
  delTeam,
  addTeam,
  updateTeam,

  checkEquipment,
  getBaseListAll,
  /*******/
  getEnvmonitorList,
  delEnvmonitor,
  getEnvChart,
  /*******/

  changeStatus,
  getOrderLocal,
  getAllFarm,
  getEquipmentIdAndNameList,
  /********/
  addWarnEnv,
  updateWarnEnv,
  delWarnEnv,
  getWarnEnvList,
  /********/

  /********/
  addEquipment,
  updateEquipment,
  delEquipment,
  getEquipmentList,
  getBoardUrl,
  /********/

  /********/
  getCompanyList,
  addCompany,
  updateCompany,
  delCompany,
 /********/
  
 /*******/
 getFertilizersList,
 addFertilizers,
 updateFertilizers,
 delFertilizers,
 /*******/
 delFile,

  getBaseList,
  delBase,
  getBaseTypeEnum,
  getBaseCategoryEnum,
  getChinaArea,
  getSecondArea,
  getSoilTypeEnum,
  getBaseAllTest,
  addBase,
  editBase,
  getEnvStandards,
  getEnvStandardsList,
  delEnvStandards,
  getUnit,
  addEnvStandards,
  editEnvStandards,
  addBaseUser,
  delBaseUser,
  getBaseUserList,
  getALLBaseList,
  getALLBaseUserList,
  getALLBaseUserandrole,
  getPlotList,
  delPlot,
  addPlot,
  editPlot,
  getAllUser,
  getPlotById,
  delPic,
  getCropList,
  addCrop,
  delCrop,
  editCrop,
  getPucType,
  getBaseWithoutUser,
  getBaseListbyid,
  getallplan,
  getBatchByPlanId,
  getBudgetList,
  delCsp,
  getAllCrop,
  getAllBusiness,

  warnData,
  getDeviceBase,

  loseData,

  getContractYear,
  getBasePurchase,
  addBasePurchase,
  updateBasePurchase,
  deleteBasePurchase,
  getStandardPlan,
  addStandardPlan,
  updateStandardPlan,
  deleteStandardPlan,
  getFertilizerPurchase,
  addFertilizerPurchase,
  updateFertilizerPurchase,
  deleteFertilizerPurchase,
  getFertilizerDeliver,
  addFertilizerDeliver,
  updateFertilizerDeliver,
  deleteFertilizerDeliver,
  getLaborDispatch,
  addLaborDispatch,
  updateLaborDispatch,
  deleteLaborDispatch,
  getOrderContract,
  addOrderContract,
  updateOrderContract,
  deleteOrderContract,
  getPledgeGoods,
  addPledgeGoods,
  updatePledgeGoods,
  deletePledgeGoods,
  getInsuranceContract,
  addInsuranceContract,
  updateInsuranceContract,
  deleteInsuranceContract,
  getLoanContract,
  addLoanContract,
  updateLoanContract,
  deleteLoanContract,
  getLoanType
}
