 <template>
  <div :class="item.class">
    <component is="style">
      .{{item.classname}} {
        background-position: {{item.bgPos}};
        background-size: cover;
      }
      @media (min-width: 1500px) {
        .{{item.classname}} {
          background-image: {{item.bgImgPC}};
        }
      }
      @media (max-width: 1500px) and (min-width: 600px) {
        .{{item.classname}} {
          background-image: {{item.bgImgPC}};
        }
      }
      @media screen and (max-width:600px) {
        .{{item.classname}} {
          background-image: {{item.bgImgSP}};
        }
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
