<script lang="ts" setup>
import Iconify from '@/components/Iconify/index.vue';

const demo = ref('Demo');
</script>

<template>
  <view class="pt-36 text-lg font-medium flex flex-col justify-center items-center">
    {{ demo }}
    <view class="mt-30px">
      iconify 组件
    </view>
    <view class="mt-30px center flex flex-row gap-10px">
      <Iconify icon="i-ri-alipay-fill" size="32" color="blue" />
      <Iconify icon="i-ri-settings-5-line" size="48" color="orange" />
      <Iconify icon="i-ri-wechat-fill" size="32" color="green" />
    </view>
  </view>
</template>

<style lang="scss" scoped>
</style>
