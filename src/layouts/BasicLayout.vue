<template>
  <div class="van-safe-area-top">
    <van-nav-bar :title="route.meta.title as string" :left-arrow="!show" :left-text="show ? '' : '返回'"
                 @click-left="onClickLeft">
      <template #right>
        <van-icon v-if="rightShow" name="search" size="18" @click="onClickRight"/>
        <van-button v-if="route.path === '/basic/team'" type="primary" size="mini" @click="createTeam">
          创建队伍
        </van-button>
      </template>
    </van-nav-bar>
  </div>
  <div class="content">
    <router-view/>
  </div>
  <div class="van-safe-area-bottom">
    <van-tabbar route>
      <van-tabbar-item icon="home-o" name="index" to="/basic/index">主页</van-tabbar-item>
      <van-tabbar-item icon="friends-o" name="team" to="/basic/team">队伍</van-tabbar-item>
      <van-tabbar-item icon="contact-o" name="user" to="/basic/user">个人</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script setup lang="ts">
const router = useRouter();
const route = useRoute();
const back = ['/basic/index', '/basic/team', '/basic/user'];
const show = computed(() => {
  return back.includes(route.path);
});

const searchIcon = ['/basic/index'];
const rightShow = computed(() => {
  return searchIcon.includes(route.path);
});
const onClickLeft = () => history.back();
const onClickRight = () => router.push('/basic/search');

/**
 * 创建队伍
 */

const createTeam = () => {
  router.push({
    path: '/basic/createTeam',
  });
};
</script>

<style scoped>
.content {
  padding-bottom: 50px;
}
</style>
