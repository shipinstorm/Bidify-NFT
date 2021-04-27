<template>
  <div>
    <Nuxt v-if="(loaded && ready)" />

    <el-dialog
      title="Wrong Network"
      :visible.sync="chainInvalid"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="false"
      width="40%"
    >
      <span>Change network to Mainnet and refresh the page.</span>
    </el-dialog>

    <DialogList />

    <client-only>
      <CheckConnection />
    </client-only>
  </div>
</template>

<script>
export default {
  name: 'DefaultLayout',
  components: {

  },
  data () {
    return {
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      formLabelWidth: '120px'
    }
  },
  computed: {
    loaded () {
      return !this.$store.state.app.waiting
    },
    ready () {
      return this.$store.state.localStorage.status
    },
    pending () {
      return this.$store.state.wallets.pending
    },
    error () {
      return this.$store.state.wallets.error
    },
    chainInvalid () {
      return this.$store.state.wallets.chainInvalid
    },
    listing () {
      return this.$store.state.bidify.listing
    },
    bidding () {
      return this.$store.state.bidify.bidding
    },
    validated () {
      return this.$store.state.wallets.validated
    }
  },
  watch: {
    error (newError, oldError) {
      if (newError) {
        this.$notify({
          title: 'Error',
          message: newError,
          type: 'error'
        })

        this.$store.commit('wallets/error', false)
      }
    },
    pending (newPending, oldPending) {
      if (newPending) {
        // this.$notify({
        //   title: 'Request Sent',
        //   message: 'Connect your wallet',
        //   type: 'info'
        // })
      }
    },
    validated () {
      // this.fetchListings()
    }
  },
  mounted () {
    setTimeout(() => {
      this.initBidify()
    }, 1500)
  },
  methods: {
    async initBidify () {
      const bidify = require('~/plugins/bidify.js')

      await bidify.init()

      this.$store.commit('app/open')
    }
  }
}
</script>

<style lang="stylus">

html
  font-family $family-content
  font-size 16px
  word-spacing 1px
  -ms-text-size-adjust 100%
  -webkit-text-size-adjust 100%
  -moz-osx-font-smoothing grayscale
  -webkit-font-smoothing antialiased
  box-sizing border-box
  background-color $dark

*,
*::before,
*::after
  box-sizing border-box
  margin 0

h1, h2, h3, h4, h5
  font-family $family-display
  text-transform uppercase

</style>
