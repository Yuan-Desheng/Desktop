<template>
  <common-card title="累计销售额" value="¥ 126,560">
    <template>
      <div class="compare">
      </div>
    </template>
    <template v-slot:footer>
      <div>
        <span>昨日销售额</span>
        <span class="money">¥ 1,200</span>
      </div>
    </template>
  </common-card>
</template>

<script>
import CommonCardMixin from "@/mixins/commonCardMixin";

export default {
  name: "index",
  mixins: [CommonCardMixin]
}
</script>

<style scoped>
.compare{
  height: 100%;
  background: yellow;
}

span {
  font-size: 12px;
}

.money {
  margin-left: 5px;
  color: #eee;
  font-weight: 700;
}
</style>
