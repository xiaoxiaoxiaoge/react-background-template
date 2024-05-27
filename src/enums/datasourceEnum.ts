export enum DiscoverTaskStrategyEnum {
  '立即执行' = 1,
  '定时执行',
  '周期执行'
}

export enum PeriodicExecTimeEnum {
  '每天0点' = 1,
  '每天4点',
  '每周二0点',
  '每周二4点',
  '每月1号0点',
  '每月1号4点'
}

export enum DiscoverTaskStatusEnum {
  '待执行' = 1,
  '执行中',
  '执行成功',
  '执行失败'
}
