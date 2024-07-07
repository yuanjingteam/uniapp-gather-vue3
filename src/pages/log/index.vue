<script lang="ts" setup>
import { useUserStore } from '@/stores/modules/user';

const userStore = useUserStore();
// onLoad((query) => {
//   console.log('log onLoad query', query);
// });
</script>

<template>
  <view class="text-center">
    <view class="mt-36 text-center">
      登录后访问log
    </view>
    <image class="my-4 h-48 w-48" :src="userStore.userInfo?.avatar" mode="aspectFit" lazy-load="false" binderror="" bindload="" />
    <view>{{ userStore.userInfo?.nickname }}</view>
  </view>
</template>

<style lang="scss" scoped></style>
