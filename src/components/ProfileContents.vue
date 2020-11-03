 <template>
  <div class="profileSection" v-bind:style="{ backgroundImage: item.bgImg}">
    <div class="profileSection__infoWrapper">
      <div class="profileSection__infoWrapper__inner">
        <div class="profileSection__infoWrapper__inner__title">{{item.title}}</div>
        <div class="profileSection__infoWrapper__description">{{item.description}}</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    FirebaseDataManagerProps: null,
    item: null
  }
}
</script>

<style lang="scss" scoped>
</style>
