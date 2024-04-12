import index from '../pages/HomePage.vue';
import team from '../pages/TeamPage.vue';
import user from '../pages/UserPage.vue';
import search from '../pages/SearchPage.vue';
import UserEdit from '../pages/UserEdit.vue';
import SearchResultPage from '../pages/SearchResultPage.vue';
import BasicLayout from '../layouts/BasicLayout.vue';
import Login from '../pages/LoginPage.vue';
import CreateTeam from '@/pages/CreateTeam.vue';
import {RouteRecordRaw, createRouter, createWebHashHistory} from 'vue-router';
import {getCurrentUser} from '../api/api';
import useUserInfo from '../hooks/useUserInfo';
import TeamDetails from '@/pages/TeamDetails.vue';

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        redirect: '/basic/index',
    },
    {
        path: '/basic',
        component: BasicLayout,
        children: [
            {
                path: 'index',
                component: index,
                meta: {
                    title: '主页'
                }
            },
            {
                path: 'team',
                component: team,
                meta: {
                    title: '队伍页面'
                }
            },
            {
                path: 'user',
                component: user,
                meta: {
                    title: '个人信息'
                }
            },
            {
                path: 'search',
                component: search,
                meta: {
                    title: '搜索页面'
                }
            },
            {
                path: 'edit',
                component: UserEdit,
                meta: {
                    title: '修改页面'
                }
            },
            {
                path: 'user/list',
                component: SearchResultPage,
                meta: {
                    title: '搜索结果页面'
                }
            },
            {
                path: 'createTeam',
                component: CreateTeam,
                meta: {
                    title: '创建队伍页面'
                }
            },
            {
                path: 'detail',
                component: TeamDetails,
                meta: {
                    title: '队伍详情'
                }
            },
        ],
    },
    {
        path: '/login',
        component: Login,
        meta: {
            title: '登录页面',
        }
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});
const {setUserInfo, getUserInfo} = useUserInfo();
const whitelist = ['/login', '/basic/index'];
router.beforeEach(async (to, _) => {
    if (whitelist.includes(to.path)) {
        return true;
    }
    const info = getUserInfo();
    if (!info.id) {
        const res = await getCurrentUser();
        if (res.code === 0) {
            setUserInfo(res.data);
            return true;
        }
        if (res.code === 40100) {
            showToast('请登录');
            router.push('/login');
        }
    }
    return true;
});

export default router;
