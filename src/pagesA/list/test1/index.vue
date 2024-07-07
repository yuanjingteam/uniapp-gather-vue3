<script lang="ts" setup>
import BasicButton from '@/components/BasicButton/index.vue';

const router = useRouter();
function jumpTest2() {
  router.push('/pagesA/list/test2/index?id=256');
}
</script>

<template>
  <view class="center">
    Test1
  </view>
  <view class="center">
    <BasicButton @click="jumpTest2">
      Test2 →
    </BasicButton>
  </view>
</template>

<style scoped></style>
