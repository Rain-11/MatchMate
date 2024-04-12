<template>
  <van-cell-group inset border v-if="currentUser.id">
    <van-cell title="头像" clickable @click="editUserInfo('avatarUrl', '头像', currentUser.avatarUrl)">
      <van-image round width="4rem" height="4rem" :src="currentUser.avatarUrl as string"/>
    </van-cell>
    <van-cell
        title="昵称"
        :value="currentUser.username as string"
        clickable
        @click="editUserInfo('username', '昵称', currentUser.username)"/>
    <van-cell
        title="账户"
        :value="currentUser.userAccount as string"
        clickable
        @click="editUserInfo('userAccount', '账户', currentUser.userAccount)"/>
    <van-cell
        title="手机号"
        :value="currentUser.phone as string "
        clickable
        @click="editUserInfo('phone', '手机号', currentUser.phone)"/>
    <van-cell
        title="邮箱"
        :value="currentUser.email as string"
        clickable
        @click="editUserInfo('email', '邮箱', currentUser.email)"/>
    <van-cell
        title="性别"
        :value="currentUser.gender === 1 ? '男' : '女'"
        clickable
        @click="editUserInfo('gender', '性别', currentUser.gender)"/>
    <van-cell title="星球id" :value="currentUser.planetCode as string" clickable/>
    <van-cell title="标签" clickable @click="editUserInfo('tags', '标签', currentUser.tags)">
      <van-row gutter="2" justify="end">
        <van-col v-for="item in JSON.parse(currentUser.tags as unknown as string)" :key="item">
          <van-tag round size="medium" type="primary">{{ item }}</van-tag>
        </van-col>
      </van-row>
    </van-cell>
    <van-button type="primary" block style="margin-top: 15px" @click="logOutLogIn">退出登录</van-button>
  </van-cell-group>

</template>

<script setup lang="ts">
import useUserInfo from '../hooks/useUserInfo';
import {CurrentUser} from '@/models/Models';
import {logOut} from "@/api/api.ts";
import {showSuccessToast} from "vant/es";

const router = useRouter();
const {getUserInfo} = useUserInfo();
let currentUser: CurrentUser = getUserInfo();

const editUserInfo = (editKey: string, keyName: string, currentValue: any) => {
  router.push({
    path: '/basic/edit',
    query: {
      editKey,
      keyName,
      currentValue,
      id: currentUser.id,
    },
  });
};

const logOutLogIn = async () => {
  const res = await logOut();
  if (res.code === 0) {
    showSuccessToast("退出登录成功");
    await router.replace('/login');
  }
}
</script>

<style scoped></style>
