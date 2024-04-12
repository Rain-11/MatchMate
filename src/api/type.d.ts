export type BasicResponse<T> = {
    code: number;
    message: string;
    data: T;
    details: string;
};

export type LoginForm = {
    userAccount: string;
    userPassword: string;
};
export type CreateTeam = {
    /**
     * 队伍描述
     */
    details?: null | string;
    /**
     * 过期时间
     */
    expireTime?: null | string;
    /**
     * 队伍id
     */
    id?: number | null;
    /**
     * 最大人数默认为5
     */
    maximumNum?: number | null;
    /**
     * 队伍密码
     */
    password?: null | string;
    /**
     * 队伍状态（0公开、1私有、2加密）默认为0
     */
    status?: number | null;
    /**
     * 队伍名称
     */
    teamName?: null | string;
    [property: string]: any;
};
/**
 * QueryTeamDto
 */
export type QueryTeam = {
    currentPage?: number | null;
    /**
     * 队伍描述
     */
    details?: null | string;
    /**
     * 过期时间
     */
    expireTime?: null | string;
    /**
     * 队伍id
     */
    id?: number | null;
    /**
     * 最大人数默认为5
     */
    maximumNum?: number | null;
    pageSize?: number | null;
    /**
     * 关键字
     */
    searchKey?: null | string;
    /**
     * 队伍状态（0公开、1私有、2加密）默认为0
     */
    status?: number | null;
    /**
     * 队伍名称
     */
    teamName?: null | string;
    [property: string]: any;
};
/**
 * PageVo«List«TeamVo»»
 */
export type PageVoListTeamVo = {
    pages?: number | null;
    records?: TeamVo[] | null;
    total?: number | null;
    [property: string]: any;
};

/**
 * TeamVo
 */
export type TeamVo = {
    /**
     * 是否已加入
     */
    hasItBeenAdd?: boolean | null;
    /**
     * 创建人信息
     */
    captainInformation?: UserVo;
    /**
     * 队伍描述
     */
    details?: null | string;
    /**
     * 过期时间
     */
    expireTime?: null | string;
    /**
     * 队伍id
     */
    id?: number | null;
    /**
     * 最大人数默认为5
     */
    maximumNum?: number | null;
    /**
     * 队伍成员信息
     */
    memberInformation?: UserVo[] | null;
    /**
     * 队伍状态（0公开、1私有、2加密）默认为0
     */
    status?: number | null;
    /**
     * 队伍名称
     */
    teamName?: null | string;
    /**
     * 创建人id
     */
    userId?: number | null;
    [property: string]: any;
};

/**
 * 创建人信息
 *
 * UserVo
 */
export type UserVo = {
    /**
     * 用户头像
     */
    avatarUrl?: null | string;
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
    planetCode?: null | string;
    tags?: null | string;
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
     * 0默认用户，1管理员
     */
    userRole?: number | null;
    /**
     * 状态 0 正常
     */
    userStatus?: number | null;
    [property: string]: any;
};

/**
 * TeamDto
 */
export type TeamDto = {
    /**
     * 队伍描述
     */
    details?: null | string;
    /**
     * 过期时间
     */
    expireTime?: null | string;
    /**
     * 队伍id
     */
    id?: number | null;
    /**
     * 最大人数默认为5
     */
    maximumNum?: number | null;
    /**
     * 队伍密码
     */
    password?: null | string;
    /**
     * 队伍状态（0公开、1私有、2加密）默认为0
     */
    status?: number | null;
    /**
     * 队伍名称
     */
    teamName?: null | string;
    [property: string]: any;
};

export type ExitTeamRequest = {
    teamId?: number;
    [property: string]: any;
};

/**
 * JoinTeam
 */
export type JoinTeam = {
    /**
     * 队伍密码
     */
    password?: null | string;
    /**
     * 队伍id
     */
    teamId?: number | null;
    [property: string]: any;
};

export type QueryUserByTag = {
    currentPage?: number;
    pageSize?: number;
    tags?: string[];
    [property: string]: any;
}
export type PageRequest = {
    currentPage?: number;
    pageSize?: number;
    [property: string]: any;
}

/**
 * TagVo
 */
export type TagVo = {
    /**
     * 标签id
     */
    id?: number | null;
    /**
     * 标签名
     */
    name?: null | string;
    /**
     * 父标签Id
     */
    parentId?: number | null;
    /**
     * 子标签
     */
    subTags?: TagVo[] | null;
    /**
     * 用户id
     */
    userId?: number | null;
    [property: string]: any;
}

