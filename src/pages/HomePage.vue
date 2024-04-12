<template>
  <UserList ref="userList" :user-list-info="userListInfo"
            :onRefresh="onRefresh" :onLoad="onLoad"></UserList>
  <van-empty v-if="userListInfo.length === 0" description="数据正在路上..... 请稍后！"/>
</template>

<script setup lang="ts">
import {getUserRecommendations} from '../api/api';
import {CurrentUser} from '@/models/Models';
import {PageRequest} from "@/api/type";

const userListInfo = ref<CurrentUser[]>([]);
const queryForm = ref<PageRequest>({
  pageSize: 10,
  currentPage: 1,
});
const userList = ref();

const onLoad = async () => {
  if (userList.value.refreshing.value) {
    userList.value.setRefreshing(false);
  }
  const res = await getUserRecommendations(queryForm.value);
  if (res.code === 0) {
    userListInfo.value.push(...(res.data.records as CurrentUser[]));
    (queryForm.value.currentPage as number)++;
    if ((queryForm.value.currentPage as number) > Number(res.data.pages)) {
      userList.value.setFinished(true);
    }
  }
  userList.value.setLoading(false);
};

const onRefresh = () => {
  // 清空列表数据
  userListInfo.value = []
  userList.value.setFinished(false);
  // 重新加载数据
  onLoad();
};

</script>

<style scoped></style>
