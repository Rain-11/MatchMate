export type CurrentUser = {
  /**
   * 描述信息
   */
  describe?: null | string;
  /**
   * 用户头像
   */
  avatarUrl?: null | string;
  /**
   * 创建时间
   */
  createTime?: null | string;
  /**
   * 邮箱
   */
  email?: null | string;
  /**
   * 性别
   */
  gender?: number | null;
  /**
   * 用户id
   */
  id?: number | null;
  /**
   * 手机号
   */
  phone?: null | string;
  /**
   * 账号
   */
  userAccount?: null | string;
  /**
   * 用户昵称
   */
  username?: null | string;
  /**
   * 密码
   */
  userPassword?: null | string;
  /**
   * 用户状态
   */
  userStatus?: null | number;
  /**
   * 0默认用户，1管理员
   */
  userRole?: number | null;
  planetCode?: string | null;
  tags?: string[] | null;
  [property: string]: any;
};
