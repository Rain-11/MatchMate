<script setup lang="ts">
import {JoinTeam, TeamVo} from '@/api/type';
import {dissolveTeam, exitTeam, joinTeam, queryTeam} from '@/api/api.ts';
import {TeamEnum} from '@/constant/TeamConstant.ts';
import useUserInfo from '@/hooks/useUserInfo.ts';
import {showSuccessToast} from 'vant/es';

const router = useRouter();
const {query} = useRoute();
const {getUserInfo} = useUserInfo();
const currentUser = getUserInfo();
const teamDetail = ref<TeamVo>();

const xuserPermissions = computed(() => {
  return teamDetail.value?.userId == currentUser.id || currentUser.userRole == 1;
});
const userExitTeam = computed(() => {
  const ids = teamDetail.value?.memberInformation?.map(menubar => {
    return menubar.id;
  });
  return ids?.includes(currentUser.id);
});
onMounted(async () => {
  const res = await queryTeam({
    id: query.id as unknown as number,
  });
  if (res.code === 0) {
    teamDetail.value = res.data.records![0];
  }
});

/**
 * 修改队伍信息
 */
const onUpdateTeam = (id: number) => {
  router.push({
    path: '/basic/createTeam',
    query: {
      id,
    },
  });
};
/**
 * 退出队伍
 */
const onExitTeam = async () => {
  const res = await exitTeam({teamId: teamDetail.value?.id as number});
  if (res.code == 0) {
    showSuccessToast('退出成功');
    history.back();
  }
};
/**
 * 解散队伍
 */
const onDissolveTeam = async () => {
  const res = await dissolveTeam({teamId: teamDetail.value?.id as number});
  if (res.code == 0) {
    showSuccessToast('解散成功');
    history.back();
  }
};
/**
 * 加入队伍
 */
const show = ref(false);
const joinTeamForm = ref<JoinTeam>({
  teamId: Number(query.id),
});
const joinTeamRequest = async () => {
  const res = await joinTeam(joinTeamForm.value);
  if (res.code == 0) {
    showSuccessToast('加入队伍成功');
    location.reload();
  }
};
const onJoinTeam = () => {
  if (teamDetail.value?.status == 2) {
    show.value = true;
  } else {
    console.log('joinTeamForm.value', joinTeamForm.value);
    joinTeamRequest();
  }
};
const onSubmit = () => {
  joinTeamRequest();
};
</script>

<template>
  <div style="padding: 15px">
    <van-row>
      <van-col span="6">
        <van-image round width="5rem" height="5rem" src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"/>
      </van-col>
      <van-col span="18">
        <VanRow gutter="8">
          <VanCol>
            <span style="font-size: 14px">队伍名:{{ teamDetail?.teamName }}--队伍id:({{ teamDetail?.id }})</span>
          </VanCol>
          <VanCol>
            <van-tag type="success">{{ TeamEnum[teamDetail?.status as number] }}</van-tag>
          </VanCol>
        </VanRow>
        <VanRow>
          <VanCol span="24">
            <van-text-ellipsis
                style="font-size: 14px; padding-top: 5px"
                rows="1"
                :content="teamDetail?.details as string"
                expand-text="展开"
                collapse-text="收起"/>
          </VanCol>
        </VanRow>
      </van-col>
    </van-row>
    <van-row style="padding: 5px; margin-top: 30px" gutter="6" justify="center">
      <van-col v-for="item in teamDetail?.memberInformation" :key="item.id as number">
        <van-image round width="4rem" height="4rem" :src="item.avatarUrl as string"/>
      </van-col>
    </van-row>
    <van-row style="margin-top: 10px">
      <van-col class="buttonTeam" span="24">
        过期时间:
        <span>{{ teamDetail?.expireTime }}</span>
      </van-col>
    </van-row>
    <van-row style="margin-top: 10px">
      <van-col class="buttonTeam" span="24">
        创建人:
        <span>{{ teamDetail?.captainInformation?.username }}</span>
      </van-col>
    </van-row>

    <van-row style="margin-top: 35px">
      <van-col class="buttonTeam" span="24">
        <van-button type="primary" block v-if="xuserPermissions" @click="onUpdateTeam(teamDetail?.id as number)">
          更新队伍
        </van-button>
      </van-col>
    </van-row>
    <van-row>
      <van-col class="buttonTeam" span="24">
        <van-button type="primary" block @click="onJoinTeam" v-if="!userExitTeam">加入队伍</van-button>
      </van-col>
    </van-row>
    <van-row>
      <van-col class="buttonTeam" span="24">
        <van-button type="primary" v-if="xuserPermissions" block @click="onDissolveTeam">解散队伍</van-button>
      </van-col>
    </van-row>
    <van-row>
      <van-col class="buttonTeam" span="24">
        <van-button type="primary" block v-if="userExitTeam" @click="onExitTeam">退出队伍</van-button>
      </van-col>
    </van-row>
  </div>

  <van-dialog v-model:show="show" title="标题" show-cancel-button>
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field
            v-model="joinTeamForm.password as string"
            type="password"
            name="密码"
            label="密码"
            placeholder="密码"
            :rules="[{ required: true, message: '请填写密码' }]"/>
      </van-cell-group>
      <div style="margin: 16px">
        <van-button round block type="primary" native-type="submit">提交</van-button>
      </div>
    </van-form>
  </van-dialog>
</template>

<style scoped>
.buttonTeam {
  padding-bottom: 15px;
}
</style>
