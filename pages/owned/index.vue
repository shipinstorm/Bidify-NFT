<template>
  <div class="container is-themed">
    <Nav />

    <div class="heading">
      <h2>
        Your NFT Auctions
      </h2>
    </div>

    <Listings :list="owned" type="listing" />

    <div class="heading">
      <h2>
        Not Listed
      </h2>
    </div>

    <Listings :list="nfts" type="nft" />

  </div>
</template>

<script>
export default {
  name: 'Create',
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
      }
    }
  },
  computed: {
    owned () {
      return this.$store.state.localStorage.listings.owned
    },
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

      await listings.getOwnedListings(this)
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
    async createNFT (item) {
      const listings = require('~/plugins/listings.js')

      const tokenId = Math.floor(Math.random() * 999)

      console.log(tokenId)

      const nft = await listings.mint({ $store: this.$store, tokenId })

      return nft
    }
  }
}
</script>
