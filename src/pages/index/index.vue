<script setup lang="ts">
import { getRandomIcon } from '@/utils/character';
import { platform } from '@/utils/platform';

const logo = getRandomIcon();
const appTitle = 'uniapp-gather-vue3';
</script>

<template>
  <view class="pt-36 flex flex-col gap-y-2 items-center">
    <image :src="logo" class="h-56 w-56" alt="" mode="widthFix" />
    <view class="text-xl font-semibold">
      {{ appTitle }}
    </view>
    <view>当前平台：{{ platform }}</view>
    <view style="padding: 20px;">
      <up-button type="primary" text="Uview-Plus" />
    </view>
  </view>
</template>

<style lang="scss">
</style>
