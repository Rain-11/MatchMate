<template>
  <van-pull-refresh v-model="refreshing" @refresh="props.onRefresh">
    <van-list offset="100" v-model:loading="loading" :finished="finished" finished-text="没有更多了"
              @load="props.onLoad">
      <van-card
          v-for="user in props.userListInfo"
          :key="user.id as number"
          :tag="user.gender === 1 ? '男' : '女'"
          :desc="user.describe as string"
          :title="`${user.username}  (${user.planetCode})`"
          :thumb="user.avatarUrl as string"
      >
        <template #tags>
          <van-row gutter="8" style="padding-top: 10px">
            <van-col v-for="item in JSON.parse(user.tags as unknown as string)" :key="item">
              <van-tag round closeable size="medium" type="primary">{{ item }}</van-tag>
            </van-col>
          </van-row>
        </template>
        <template #footer>
          <van-button size="mini">联系我</van-button>
        </template>
      </van-card>
    </van-list>
  </van-pull-refresh>
</template>

<script setup lang="ts">
import type {CurrentUser} from '@/models/Models';

const loading = ref(false);
const finished = ref(false);
const refreshing = ref(false);
const props = defineProps<{
  userListInfo: CurrentUser[],
  onLoad: () => {},
  onRefresh: () => {},
}>();
const setFinished = (flag: boolean) => {
  finished.value = flag;
}
const setLoading = (flag: boolean) => {
  loading.value = flag;
}
const setRefreshing = (flag: boolean) => {
  refreshing.value = flag;
}
defineExpose({
  setFinished,
  setRefreshing,
  setLoading,
  loading,
  finished,
  refreshing
})
</script>

<style scoped></style>
