<script setup lang="ts">
import { onHide, onShow, onLaunch } from '@dcloudio/uni-app'
onLaunch(() => {})
onShow(() => {})
onHide(() => {})
</script>
<style lang="scss">
@import 'uview-plus/index.scss';
page {
  height: 100%;
  overflow: hidden;
  background-color: #f4f4f4;
}

view,
text {
  // 允许我们在元素的总宽度和高度中包括内边距和边框,宽度和高度会包括内边距和边框中
  box-sizing: border-box;
}
</style>
