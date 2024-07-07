<script setup lang="ts">
import { onHide, onLaunch, onShow } from '@dcloudio/uni-app';
import { useUserStore } from '@/stores/modules/user';

onLaunch(() => {
  console.log('App Launch');
});
onShow(() => {
  const userStore = useUserStore();
  userStore.initUserInfo();
  console.log('App Show');
});
onHide(() => {
  console.log('App Hide');
});
</script>

<style lang="scss">
@import '@/uni_modules/uview-plus/index.scss'

</style>
