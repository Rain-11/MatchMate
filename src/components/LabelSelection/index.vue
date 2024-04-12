<template>
  <div class="card" v-show="activeIds.length > 0">
    <van-row gutter="8">
      <van-col v-for="item in activeIds" :key="item">
        <van-tag round closeable size="medium" type="primary" @close="close(item)">{{ item }}</van-tag>
      </van-col>
    </van-row>
  </div>
  <div class="card fallback" v-show="activeIds.length <= 0">
    <span>请选择标签</span>
  </div>
  <div class="card">
    <van-tree-select
      v-model:active-id="activeIds"
      v-model:main-active-index="activeIndex"
      :items="displayLabels as any" />
  </div>
</template>

<script setup lang="ts">
import { getTags } from '@/api/api.ts';
import { TagVo } from '@/api/type';

/**
 * 选择标签
 */
const activeIds = ref([]);
const activeIndex = ref(0);

let originalLabel: TagVo[] = [];
const displayLabels = ref(originalLabel);
const initializeLabelInformation = async () => {
  const res = await getTags();
  if (res.code == 0) {
    originalLabel = res.data.map(item => {
      const children = item.subTags?.map(tag => {
        return { text: tag.name, id: tag.name };
      });
      return {
        text: item.name,
        children: children,
      };
    });
    displayLabels.value = originalLabel;
  }
};

onMounted(() => {
  initializeLabelInformation();
});

const close = (val: string) => {
  activeIds.value = activeIds.value.filter(item => item !== val);
};

/**
 * 搜索功能
 */
const filterTags = (value: string) => {
  if (!value) {
    return;
  }
  let tmpOriginalLabel = JSON.parse(JSON.stringify(originalLabel));
  displayLabels.value = tmpOriginalLabel.map((item: any) => {
    item.children = (item.children || []).filter((tag: any) => tag.text.includes(value));
    return item;
  });
};
const clearSearch = () => {
  displayLabels.value = originalLabel;
};

const getActiveIds = () => {
  return activeIds.value;
};

/**
 * 修改标签
 */
const modifyLabels = async () => {};

const updateActiveIds = (value: string) => {
  activeIds.value = JSON.parse(value);
};

defineExpose({
  filterTags,
  clearSearch,
  updateActiveIds,
  getActiveIds,
});
</script>

<style scoped>
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
