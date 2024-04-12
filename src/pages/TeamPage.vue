<template>
  <van-search clearable v-model="value" show-action placeholder="请输入搜索关键词" @search="onSearch">
    <template #action>
      <div @click="onClickButton">搜索</div>
    </template>
  </van-search>
  <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
    <van-list offset="100" v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <van-card
        @click="viewTeamDetails(item.id as number)"
        v-for="item in list"
        :key="item.id as number"
        :desc="item.details as string"
        :title="item.teamName as string"
        thumb="https://fastly.jsdelivr.net/npm/@vant/assets/ipad.jpeg"
        :tag="TeamEnum[item.status as number]">
        <template #bottom>
          <van-row>
            <van-col span="8">最大人数:{{ item.maximumNum }}</van-col>
            <van-col span="8">创建人:{{ item.captainInformation?.username }}</van-col>
          </van-row>
        </template>
        <template #footer>
          <van-tag type="success" v-if="item.hasItBeenAdd">已加入</van-tag>
          <van-tag type="success" v-if="item.userId == currentUser.id">个人创建</van-tag>
        </template>
      </van-card>
    </van-list>
  </van-pull-refresh>
</template>

<script setup lang="ts">
import { QueryTeam, TeamVo } from '@/api/type';
import { queryTeam } from '@/api/api';
import { TeamEnum } from '@/constant/TeamConstant';
import useUserInfo from '@/hooks/useUserInfo.ts';
import router from '@/router/router';

const { getUserInfo } = useUserInfo();
const currentUser = getUserInfo();
/**
 * 搜索功能
 */
const value = ref('');
const onSearch = (val: string) => {
  queryForm.value.searchKey = val;
  queryForm.value.currentPage = 1;
  list.value = [];
  onLoad();
};
const onClickButton = () => {
  onSearch(value.value);
};

/**
 * 列表功能
 */
const list = ref<TeamVo[]>([]);
const loading = ref(false);
const finished = ref(false);
const refreshing = ref(false);
const queryForm = ref<QueryTeam>({
  pageSize: 10,
  currentPage: 1,
});
const onLoad = () => {
  setTimeout(async () => {
    if (refreshing.value) {
      refreshing.value = false;
    }
    const res = await queryTeam(queryForm.value);
    if (res.code === 0) {
      res.data.records?.forEach(team => {
        team.memberInformation?.forEach(member => {
          if (member.id == currentUser.id && team.userId != currentUser.id) {
            team.hasItBeenAdd = true;
          }
        });
      });
      list.value.push(...(res.data.records as TeamVo[]));
      (queryForm.value.currentPage as number)++;
      if ((queryForm.value.currentPage as number) > Number(res.data.pages)) {
        finished.value = true;
      }
    }
    loading.value = false;
  }, 1000);
};

const onRefresh = () => {
  // 清空列表数据
  finished.value = false;

  // 重新加载数据
  // 将 loading 设置为 true，表示处于加载状态
  loading.value = true;
  onLoad();
};

/**
 * 查看队伍详情
 */

const viewTeamDetails = (id: number) => {
  router.push({
    path: '/basic/detail',
    query: {
      id,
    },
  });
};
</script>

<style scoped></style>
