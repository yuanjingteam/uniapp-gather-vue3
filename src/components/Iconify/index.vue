<script lang="ts" setup name="Iconify">
interface Props {
  icon: string
  size?: string | number
  color?: string
}
/**
 * @name Iconify
 * @desc 图标
 * @docs https://iconify.design/docs/icon-components/vue/
 * @example <Iconify icon="ant-design:home-outlined" />
 */
const props = withDefaults(defineProps<Props>(), {
  size: 'inherit',
  color: 'inherit',
});

const emits = defineEmits(['click']);
function click() {
  emits('click');
}

function isNumber(str: string | number): boolean {
  return !Number.isNaN(Number(str));
}
</script>

<template>
  <view class="iconify-icon" :class="[props.icon]" @click="click" />
</template>

<style lang="scss" scoped>
.iconify-icon {
  display: inline-block;
  line-height: 1;
  font-size: v-bind('isNumber(props.size) ? `${props.size}px` : props.size');
  color: v-bind('props.color');
}
</style>
