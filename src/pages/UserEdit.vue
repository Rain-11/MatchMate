<template>
  <van-form @submit="onSubmit">
    <van-field name="radio" label="性别" v-if="info.keyName === '性别'">
      <template #input>
        <van-radio-group v-model="info.currentValue" direction="horizontal">
          <van-radio name="1">男</van-radio>
          <van-radio name="0">女</van-radio>
        </van-radio-group>
      </template>
    </van-field>
    <van-field name="radio" label="标签" v-if="info.keyName === '标签'">
      <template #input>
        <van-row gutter="2">
          <van-col v-for="item in JSON.parse(info.currentValue as unknown as string)" :key="item">
            <van-tag round size="medium" type="primary">{{ item }}</van-tag>
          </van-col>
        </van-row>
        <van-floating-bubble v-model:offset="offset" axis="xy" icon="edit" magnetic="x" @click="editTags"/>
      </template>
    </van-field>
    <van-field
        v-if="info.keyName !== '性别' && info.keyName !== '标签'"
        :name="info.editKey"
        :label="info.keyName"
        :placeholder="`请输入${query.keyName}`"
        v-model="info.currentValue"/>
    <div style="margin: 16px">
      <van-button round block type="primary" native-type="submit">提交</van-button>
    </div>
  </van-form>
  <van-dialog v-model:show="show" title="修改标签" show-cancel-button @opened="onOpened" @confirm="saveEdit">
    <label-selection ref="labelRef"></label-selection>
  </van-dialog>
</template>

<script setup lang="ts">
import {updateUserInfoById} from '../api/api';
import useUserInfo from "@/hooks/useUserInfo.ts";

const {clearUserInformation} = useUserInfo();
const {query} = useRoute();
const info = ref({
  currentValue: query.currentValue?.toString(),
  keyName: query.keyName?.toString(),
  editKey: query.editKey?.toString(),
});
/**
 * 修改标签
 */
const offset = ref({x: 300, y: 400});
const show = ref(false);
const editTags = () => {
  show.value = true;
};
const labelRef = ref();
const onOpened = () => {
  labelRef.value.updateActiveIds(query.currentValue);
};
/**
 * 保存修改
 */
const onSubmit = async () => {
  const res = await updateUserInfoById({
    id: query.id as unknown as number,
    [info.value.editKey as string]: info.value.currentValue,
  });
  if (res.code === 0) {
    clearUserInformation();
    showToast('更新成功');
    history.back();
  }
};

const saveEdit = async () => {
  info.value.currentValue = JSON.stringify(labelRef.value.getActiveIds());
}
</script>

<style scoped>
.card {
  padding: 20px;
}
</style>
