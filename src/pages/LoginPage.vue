<template>
  <van-row justify="center" align="center" style="width: 100vw; height: 100vh; background-color: #ddeaf1">
    <van-col>
      <van-form @submit="onSubmit">
        <van-cell-group inset>
          <van-field
            :border="true"
            v-model="userAccount"
            name="userAccount"
            label="用户名"
            placeholder="用户名"
            :rules="[{ required: true, message: '请填写用户名' }]" />
          <van-field
            v-model="userPassword"
            type="password"
            name="userPassword"
            label="密码"
            placeholder="密码"
            :rules="[{ required: true, message: '请填写密码' }]" />
        </van-cell-group>
        <div style="margin: 16px">
          <van-button round block type="primary" native-type="submit">提交</van-button>
        </div>
      </van-form>
    </van-col>
  </van-row>
</template>

<script setup lang="ts">
import { login } from '../api/api';
import useUserInfo from '../hooks/useUserInfo';
const router = useRouter();
const userAccount = ref('');
const userPassword = ref('');
const { setUserInfo } = useUserInfo();
const onSubmit = async () => {
  const res = await login({
    userAccount: userAccount.value,
    userPassword: userPassword.value,
  });
  if (res.code === 0) {
    showToast('登录成功');
    setUserInfo(res.data);
    router.replace('/basic/index');
  }
};
</script>

<style scoped></style>
