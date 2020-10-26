<template>
  <div class="card" v-bind:id="item.id">
    <!-- 依存あり -->
    <div class="card__contentsWrapper">
      <progressive-img v-show="!isLimit" class="card__contentsWrapper__img" v-bind:src="item.thumbnail" />
      <h2 class="card__contentsWrapper__title">{{item.title}}</h2>
      <p class="card__contentsWrapper__description" v-show="!isLimit&&item.description!=''" v-html="item.description"></p>
      <div class="card__contentsWrapper__tags">
        <div class="card__contentsWrapper__tags__wrapper" v-show="item.problem!=''||item.targetUser!=''||item.solution!=''">
          <div v-bind:class="{ card__contentsWrapper__tags__wrapper__TaishoKadai: item.targetUser!=''&&item.problem!='' }">
            <div class="card__tag--red" v-show="item.targetUser!=''"><p class="card__tag__title--red">対象 <font-awesome-icon icon="user" /></p><p class="card__tag__val--red">{{item.targetUser}}</p></div>
            <div class="card__tag--red" v-show="item.problem!=''"><p class="card__tag__title--red">課題 <font-awesome-icon icon="sad-tear" /></p><p class="card__tag__val--red">{{item.problem}}</p></div>
          </div>
          <div class="card__tag__arrow--red" v-show="item.solution!=''" v-bind:class="{ cardTagsArrowMargin: item.targetUser!=''&&item.problem!='' }"><font-awesome-icon icon="arrow-down" size="lg" /></div>
          <div class="card__tag--red" v-show="item.solution!=''"><p class="card__tag__title--red">解決 <font-awesome-icon icon="grin-beam" /></p><p class="card__tag__val--red">{{item.solution}}</p></div>
        </div>
        <div class="card__tag--green" v-show="item.whatLearned!=''"><p class="card__tag__title--study">学習 <font-awesome-icon icon="school" /></p><p class="card__tag__val--study">{{item.whatLearned}}</p></div>
        <div class="card__tag" v-show="item.genle!=''"><p class="card__tag__title">環境 <font-awesome-icon icon="mobile-alt" /></p><p class="card__tag__val">{{item.genle}}</p></div>
        <div class="card__tag" v-show="item.allLang!=''"><p class="card__tag__title">言語 <font-awesome-icon icon="code" /></p><p class="card__tag__val">{{item.allLang}}</p></div>
      </div>
      <p class="card__contentsWrapper__kdwr" v-show="item.kdwr!=''&&item.kdwr!=null">{{item.kdwr}}</p>
      <div v-show="isDispEdit&&isLogin"><button @click="oepnEdit(item.id)" class="card__button card__button--edit">Edit</button></div>
      <!-- 依存あるかも: #card-button-wrapper -->
      <div class="card__contentsWrapper__buttonWrapper" v-show="!isLimit">
        <button @click="cardButtonEv(item.siteurl, item.id)" class="card__button card__button--read wid50per" v-bind:disabled="!item.isDispReadButton"><font-awesome-icon icon="book-reader" /> 詳しく読む</button>
        <button @click="goToSite(item.siteurl)" class="card__button card__button--gosite wid50per" v-bind:disabled="!item.isDispGotoSiteButton"><font-awesome-icon icon="external-link-alt" /> サイトを開く</button>
      </div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object
    },
    isDispEdit: {
      type: Boolean
    },
    isLogin: {
      type: Boolean
    },
    isLimit: {
      type: Boolean
    }
  },
  methods: {
    cardButtonEv(siteUrl, articleId) {
      this.$emit('cardButtonEv', {"siteUrl": siteUrl, "articleId": articleId})
    },
    goToSite(siteUrl) {
      this.$emit('goToSite', siteUrl)
    },
    oepnEdit(articleId) {
      this.$emit('oepnEdit', articleId)
    }
  }
}
</script>
<style lang="scss" scoped>
.card {
  max-width: 760px;
  border-radius: 25px;
  padding: 15px 10px 15px 10px;
  box-shadow: 0 0 5px 3px rgba(204, 204, 204, 0.2);
  background-color: $card-background;
  &__contentsWrapper__img {
    border-radius: 25px;
    z-index: 1;
    border: 1px solid $card-border;
  }
  &__contentsWrapper__title {
    margin: 0 5px 0;
  }
  &__contentsWrapper__description {
    font-size: large;
    margin: 0px 5px 0px 5px;
  }
  &__contentsWrapper__kdwr {
    margin: 5px;
  }
  &__contentsWrapper__tags {
    display: grid;
    gap: 5px;
    margin-top: 5px;
    &__wrapper__TaishoKadai {
      display: grid;
      gap: 5px;
      grid-template-columns: 0.5fr 0.5fr;
    }
    &__wrapper {
      padding: 10px;
      border: 2px solid $red-border;
      border-radius: 25px;
    }
  }
  &__tag {
    border: 2px solid $main;
    border-radius: 25px;
    &__title {
      display: inline-block;
      width: 80px;
      margin: 0;
      padding: 10px;
      color: $white;
      background-color: $main;
      border-radius: 18px 0 0 18px;
      opacity: 0.75;
      text-align: center;
      &--study {
        display: inline-block;
        width: 80px;
        margin: 0;
        padding: 10px;
        color: $white;
        background-color: $study;
        border-radius: 18px 0 0 18px;
        opacity: 0.75;
        text-align: center;
      }
      &--green {
        display: block;
        width: auto !important;
        margin: 0;
        padding: 5px !important;
        background-color:$study !important;
        border-radius: 18px 18px 0 0 !important;
        opacity: 0.75;
        color: $white;
        text-align: center;
      }
      &--red {
        display: block;
        width: auto !important;
        margin: 0;
        padding: 5px !important;
        background-color:$red !important;
        border-radius: 18px 18px 0 0 !important;
        opacity: 0.75;
        color: $white;
        text-align: center;
      }
    }
    &__val {
      display: inline-block;
      width: calc(100% - 120px);
      margin: 0;
      padding: 10px;
      &--study {
        display: inline-block;
        width: calc(100% - 120px);
        margin: 0;
        padding: 10px;
      }
      &--green {
        display: block !important;
        width: auto !important;
        text-align: center !important;
      }
      &--red {
        display: block !important;
        width: auto !important;
        text-align: center !important;
      }
    }
    &__arrow{
      &--green {
        margin: 5px;
        text-align: center;
        color: $study-dark;
      }
      &--red {
        margin: 5px;
        text-align: center;
        color: $red-dark;
      }
    }
    &--green {
      border: 2px solid $study-border;
      border-radius: 25px;
    }
    &--red {
      border: 2px solid $red-border;
      border-radius: 25px;
    }
  }
  &__button {
    border: none;
    cursor: pointer;
    outline: none;
    appearance: none;
    &:disabled {
      opacity: 0.3;
      cursor: default;
    }
    &--close {
      height: 35px;
      width: 35px;
      margin-bottom: 10px;
      background-color: $close-button;
    }
    &--gosite {
      margin-top: 10px;
      display: inline-block;
      height: 50px;
      border-radius: 25px;
      background-color: $main;
      color: $white;
      font-size: large;
    }
    &--read {
      margin-top: 10px;
      display: inline-block;
      height: 50px;
      border-radius: 25px;
      background-color: $main;
      color: $white;
      font-size: large;
    }
  }
}
.cardTagsArrowMargin {
  margin: 0 !important;
  margin-bottom: 5px !important;
}
.wid50per {
  width: 49%;
}
.wid100per {
  width: 100%;
}
</style>
