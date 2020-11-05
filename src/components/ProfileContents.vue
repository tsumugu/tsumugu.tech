 <template>
  <div :class="item.class">
    <component is="style">
      .{{item.classname}} {
        background-image: {{item.bgImg}};
        background-position: {{item.bgPos}};
        background-size: cover;
        /*background-attachment: fixed;*/
      }
    </component>
    <div class="profileSection__infoWrapper">
      <div class="profileSection__infoWrapper__inner">
        <div class="profileSection__infoWrapper__inner__title">{{item.title}}</div>
        <div class="profileSection__infoWrapper__description" v-html="item.description"></div>
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
