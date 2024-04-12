<template>
  <div class="search">
    <form action="/">
      <van-search
        @clear="onCancel"
        v-model="value"
        show-action
        placeholder="过滤标签"
        @search="onSearch"
        @cancel="onCancel" />
    </form>
    <label-selection ref="labelRef"></label-selection>
    <div style="padding: 10px">
      <van-button round type="primary" block @click="doSearch">搜索</van-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getTags } from '@/api/api.ts';
const router = useRouter();
const originalLabel = ref();
const initializeLabelInformation = async () => {
  const res = await getTags();
  if (res.code == 0) {
    originalLabel.value = res.data.map(item => {
      const children = item.subTags?.map(tag => {
        return { text: tag.name, id: tag.name };
      });
      return {
        text: item.name,
        children: children,
      };
    });
  }
};

onMounted(() => {
  initializeLabelInformation();
});

/**
 * 搜索功能
 */
const value = ref('');
const labelRef = ref();

const onSearch = (value: string) => {
  labelRef.value.filterTags(value);
};

const onCancel = () => {
  labelRef.value.clearSearch();
};

/**
 * 根据标签搜索用户
 */
const doSearch = () => {
  router.push({
    path: '/basic/user/list',
    query: {
      tags: labelRef.value.getActiveIds(),
    },
  });
};
</script>

<style scoped>
.search {
  height: 100vh;
  width: 100vw;
  background-color: #f6f6f6;
}

.card {
  background-color: #ffffff;
  border-radius: 15px;
  min-height: 50px;
  margin: 10px;
  padding: 10px;
  box-shadow: 1px 1px 16px 2px rgba(0, 0, 0, 0.15);
}

.fallback {
  text-align: center;
  line-height: 50px;
  color: #c8c9cc;
}
</style>
