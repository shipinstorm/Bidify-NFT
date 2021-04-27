<template>
  <div v-if="listing" class="container is-min-height">
    <DropNav :drop="listing" />

    <div class="contents">
      <el-row :gutter="32">
        <el-col :span="16" :xs="24">
          <div class="drop-contents" :class="{ fs: isFullscreen }">
            <div class="full-screen">
              <a class="el-button el-button--default is-circle is-themed" @click="toggleFS()">
                <i class="el-icon-full-screen" />
              </a>
            </div>

            <el-carousel
              trigger="click"
              :height="height"
              indicator-position="outside"
              :autoplay="false"
              class="is-themed"
              @change="carouselChange"
            >
              <el-carousel-item v-for="item in listing.unlockables" :key="item.index">
                <el-image
                  v-if="item.image"
                  style="width: 100%; height: 100%"
                  class="image"
                  :src="item.image"
                  fit="scale-down"
                />

                <video
                  v-if="item.video"
                  :src="item.video"
                  autoplay="true"
                  controls="true"
                  playsinline="true"
                  style="width: 100%; height: 100%"
                  loop="true"
                />
              </el-carousel-item>
            </el-carousel>

          </div>
        </el-col>

        <el-col :span="8" :xs="24">
          <article v-if="listing" class="is-themed">
            <h1>
              {{ listing.name }}
            </h1>

            <p style="white-space: pre-line;">{{ listing.description }}</p>

            <div class="simple-list">
              <h5>
                Details
              </h5>

              <a v-if="listing.owner" class="simple-list-item" :href="(`https://xxx.com/user/${listing.owner.address}`)" target="_blank">
                <el-avatar
                  v-if="listing.owner.profile_img_url"
                  :size="46"
                  :src="listing.owner.profile_img_url"
                  fit="cover"
                />

                <div v-if="listing.owner.user" class="label">
                  <small>Owner</small>

                  {{ listing.owner.user.username }}
                </div>

                <div v-else class="label">
                  <small>Owner</small>

                  <span class="truncate" :title="listing.owner.address">
                    {{ listing.owner.address }}
                  </span>
                </div>

              </a>

              <a v-if="listing.collection" class="simple-list-item" :href="listing.collection.external_url" target="_blank">
                <el-avatar
                  v-if="listing.collection.image_url"
                  :size="46"
                  :src="listing.collection.image_url"
                  fit="cover"
                />

                <div class="label">
                  <small>Collection</small>

                  <span class="truncate" :title="listing.collection.name">
                    {{ listing.collection.name }}
                  </span>
                </div>

              </a>

              <a v-if="listing.creator" class="simple-list-item" :href="(`https://xxx.com/user/${listing.creator.address}`)" target="_blank">
                <el-avatar
                  v-if="listing.creator.profile_img_url"
                  :size="46"
                  :src="listing.creator.profile_img_url"
                  fit="cover"
                />

                <div class="label">
                  <small>Creator</small>

                  <span class="truncate" :title="listing.creator.user.username">
                    {{ listing.creator.user.username }}
                  </span>
                </div>

              </a>
            </div>

            <div v-if="(listing.traits && listing.traits.length)" class="simple-list">
              <h5>
                Traits
              </h5>

              <div v-for="trait in listing.traits" :key="(`${ trait.trait_type }${ trait.value }`)" class="simple-list-item">
                <div class="label">
                  <small>{{ trait.trait_type }}</small>

                  <span class="truncate" :title="trait.value">
                    {{ trait.value }}
                  </span>
                </div>
              </div>
            </div>
          </article>
        </el-col>
      </el-row>
    </div>

    <el-drawer
      :visible.sync="$device.isMobile"
      :show-close="false"
      :withHeader="false"
      size="132px"
      direction="btt"
      :modal="false"
      :modal-append-to-body="false"
      :append-to-body="false"
      :wrapperClosable="false"
    >
      <div class="panel-action">
        <a v-if="listing.owned" class="el-button is-themed is-round" :href="listing.external_link" target="_blank">
          SELL
        </a>
        <a v-else class="el-button is-themed is-round" :href="listing.external_link" target="_blank">
          BUY
        </a>

        <span v-if="listing.owned">
          You can sell your {{ listing.type }} on xxx.
        </span>

        <span v-else>
          You can buy this {{ listing.type }} on xx.
        </span>
      </div>
    </el-drawer>
  </div>
</template>

<script>
const carouselHeight = (fs) => {
  if (fs) {
    return (window.screen.height - 230) + 'px'
  }

  return (window.screen.height * 0.6) + 'px'
}

export default {
  name: 'Listing',
  components: {

  },
  data () {
    return {
      current: 0,
      height: carouselHeight(),
      isFullscreen: false
    }
  },
  computed: {
    listing () {
      const active = this.$store.state.localStorage.listings.active

      if (active) {
        return active
      }

      const listings = this.$store.state.localStorage.listings.list

      const id = this.$route.params.id

      return listings.find(l => l.id === id)
    }
  },
  watch: {
    validated (newValidated) {
      this.getListing()
    }
  },
  mounted () {
    this.getListing()
  },
  methods: {
    carouselChange (index) {
      this.current = index
    },
    toggleFS () {
      this.isFullscreen = !this.isFullscreen
      this.height = carouselHeight(this.isFullscreen)
    },
    async getListing () {
      const listings = require('~/plugins/listings.js')

      await listings.getOne(this)
    }
  }
}
</script>

<style scoped lang="stylus">
  .container
    padding-bottom 132px

  .el-drawer__wrapper
    top auto
    height 132px

  .panel-action
    padding $space-l $space-m

    span
      font-size 12px
      text-align center
      display block
      padding $space-s

    .el-button
      width 100%
      text-decoration none

  .fs
    position fixed !important
    top 0
    left 0
    width 100%
    height 100%
    z-index 999999

  .contents
    position relative
    z-index 2000
    padding 64px 0
    width 80%
    margin auto
    overflow hidden

    +for_breakpoint(xs sm)
      width 100%
      padding 0

      article
        padding $space-m

  .drop-contents
    padding 0 0
    position relative

  .full-screen
    position absolute
    right $space-s
    top $space-s
    z-index 999

  .image
    max-width 100%

  .slide-text
    padding $space-m
    margin $space-m 0
    text-align left
    display flex
    justify-content space-between
    align-items center

  .slide-text-title
    font-size 18px

    .label
      display block
      font-size 14px
      color $grey

  .el-carousel__item h3
    color #475669
    font-size 14px
    opacity 0.75
    line-height 150px
    margin 0

</style>
