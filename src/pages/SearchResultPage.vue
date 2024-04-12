<template>
  <UserList ref="userList" :user-list-info="userListInfo"
            :onRefresh="onRefresh" :onLoad="onLoad"></UserList>
</template>

<script setup lang="ts">
import {getUserListByTag, getUserRecommendations} from '../api/api';
import type {CurrentUser} from '../models/Models';
import {QueryUserByTag} from "@/api/type";

const {
  query: {tags},
} = useRoute();

const userListInfo = ref<CurrentUser[]>([]);

const queryTags = ref<QueryUserByTag>({
  tags: tags as string[],
  pageSize: 10,
  currentPage: 1,
});

const userList = ref();
const onLoad = () => {
  setTimeout(async () => {
    if (userList.value.refreshing.value) {
      userList.value.setRefreshing(false);
    }
    const res = await getUserListByTag(queryTags.value);
    if (res.code === 0) {
      console.log(res);
      userListInfo.value.push(...(res.data.records as CurrentUser[]));
      (queryTags.value.currentPage as number)++;
      if ((queryTags.value.currentPage as number) > Number(res.data.pages)) {
        userList.value.setFinished(true);
      }
    }
    userList.value.setLoading(false);
  }, 1000);
};

const onRefresh = () => {
  // 清空列表数据
  userListInfo.value = []
  userList.value.setFinished(false);
  // 重新加载数据
  // 将 loading 设置为 true，表示处于加载状态
  userList.value.setLoading(true);
  onLoad();
};

</script>

<style scoped></style>
