<template>
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field
        v-model="teamForm.teamName as string"
        name="teamName"
        label="队伍名"
        placeholder="请输入队伍名"
        :rules="[{ required: true, message: '请输入队伍名' }]" />
      <van-field
        v-model="teamForm.details as string"
        rows="2"
        autosize
        label="留言"
        type="textarea"
        placeholder="请输入留言"
        maxlength="512"
        show-word-limit />
      <van-field
        v-model="teamForm.expireTime as string"
        is-link
        readonly
        label="过期时间"
        placeholder="请选择过期时间"
        @click="showPicker = true" />
      <van-popup v-model:show="showPicker" round position="bottom">
        <van-picker-group title="预约日期" :tabs="['选择日期', '选择时间']" @confirm="onConfirm" @cancel="onCancel">
          <van-date-picker v-model="currentDate" :min-date="minDate" />
          <van-time-picker v-model="currentTime" />
        </van-picker-group>
      </van-popup>
      <van-field name="stepper" label="步进器">
        <template #input>
          <van-stepper :disabled="isDisable" v-model="teamForm.maximumNum as number" min="2" max="5" />
        </template>
      </van-field>
      <van-field name="radio" label="单选框">
        <template #input>
          <van-radio-group v-model="teamForm.status" direction="horizontal">
            <van-radio :name="0">公开</van-radio>
            <van-radio :name="1">私有</van-radio>
            <van-radio :name="2">加密</van-radio>
          </van-radio-group>
        </template>
      </van-field>
      <van-field
        v-if="teamForm.status == 2"
        v-model="teamForm.password as string"
        type="password"
        name="password"
        label="队伍密码"
        placeholder="请输入队伍密码"
        :rules="[{ required: true, message: '请填写密码' }]" />
    </van-cell-group>
    <div style="margin: 16px">
      <van-button round block type="primary" native-type="submit">提交</van-button>
    </div>
  </van-form>
</template>

<script setup lang="ts">
import { createTeam, queryTeam, updateTeam } from '@/api/api';
import { CreateTeam } from '@/api/type';
import { showSuccessToast } from 'vant/es';

const { query } = useRoute();
const router = useRouter();
const teamForm = reactive<CreateTeam>({});
const minDate = new Date();

const showPicker = ref(false);

const currentDate = ref([]);
const currentTime = ref([]);

const onConfirm = () => {
  teamForm.expireTime = `${currentDate.value.join('-')} ${currentTime.value.join(':')}:00`;
  showPicker.value = false;
};

const onCancel = () => {
  showPicker.value = false;
};

const onSubmit = async () => {
  const id = query.id;
  let res;
  if (id) {
    res = await updateTeam(teamForm);
  } else {
    res = await createTeam(teamForm);
  }
  if (res.code === 0) {
    showSuccessToast(id ? '修改成功' : '添加成功');
    router.push({
      path: '/basic/team',
    });
  }
};
const isDisable = computed(() => {
  return query.id != undefined;
});
/**
 * 回显数据
 */
onMounted(async () => {
  if (query.id) {
    const res = await queryTeam({
      id: query.id as unknown as number,
    });
    if (res.code === 0) {
      console.log(res.data.records);
      Object.assign(teamForm, res.data.records![0]);
    }
  }
});
</script>

<style scoped></style>
