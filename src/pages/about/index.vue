<script lang="ts" setup>
import BasicButton from '@/components/BasicButton/index.vue';
import { useUserStore } from '@/stores/modules/user';

const router = useRouter();
const userStore = useUserStore();
const { loggedIn, userInfo } = storeToRefs(userStore);

function handleJump(url: string) {
  router.push(url);
}

// 登出
function handleLoginOut() {
  userStore.logout();
}
</script>

<template>
  <view class="text-md pt-36">
    <view v-if="loggedIn" class="text-center">
      <image class="h-56 w-56" :src="userInfo?.avatar" />
      <view class="mt-2">
        {{ userInfo?.nickname }}
      </view>
    </view>
    <view class="mt-6 flex flex-col gap-y-xl justify-center items-center">
      <BasicButton @click="handleJump('/pages/log/index?id=4345&title=log&word=关键词')">
        log
      </BasicButton>
      <BasicButton v-if="loggedIn" @click="handleLoginOut">
        登出
      </BasicButton>
      <BasicButton v-else @click="handleJump('/pages/login/index')">
        登入
      </BasicButton>
    </view>
  </view>
</template>

<style lang="scss" scoped>
</style>
