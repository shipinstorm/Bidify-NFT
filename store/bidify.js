export const state = () => ({
  bidding: false,
  listModal: false,
  listing: false,
  approving: false
})

export const mutations = {
  bid (state) {
    state.bidding = true
  },
  listModal (state, visible) {
    state.listModal = visible
  },
  approving (state, request) {
    state.approving = request
  },
  listing (state, request) {
    state.listing = request
  }
}
