<template>
  <div class="container is-themed">
    <Nav />

    <div class="heading">
      <h2>
        Auction Your NFT's
      </h2>
    </div>

    <Listings :list="nfts" type="nft" />

    <a @click="createNFT()">NFT ME</a>

  </div>
</template>

<script>
export default {
  name: 'Create',
  components: {

  },
  computed: {
    nfts () {
      return this.$store.state.localStorage.listings.nfts
    }
  },
  mounted () {
    setTimeout(() => {
      this.fetchListings()
    }, 500)
  },
  methods: {
    async fetchListings () {
      const listings = require('~/plugins/listings.js')

      await listings.getOwnedNFTs(this)
    },
    async create (item) {
      const listings = require('~/plugins/listings.js')

      const list = await listings.list({
        $store: this.$store,
        params: {
          platform: item.address,
          token: item.id,
          price: '0.1',
          days: 10
        }
      })

      return list
    },
    async createNFT () {
      const listings = require('~/plugins/listings.js')

      const tokenId = Math.floor(Math.random() * 999)

      const nft = await listings.mint({ $store: this.$store, tokenId })

      this.fetchListings()

      return nft
    }
  }
}
</script>

<style scoped lang="stylus">

</style>
