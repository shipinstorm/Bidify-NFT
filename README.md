
# Bidify

Time-based bidding auctions for NFT's (non-fungible tokens).

## Definitions

### Nouns

- **Platform** - a specific ERC-721 contract address
- **Token** - the corresponding token id related to the contract address
- **NFT** - a non-fungible token, with both a platform and token, created outside of Bidify
- **Listing** - an auction wrapper, for an NFT, created with Bidify
- **Id** - the id of a Bidify Listing
- **Owned** - a specific accounts Listings, created with Bidify
- **Owned NFTs** - a specific accounts NFTs that have *not yet* been listed with Bidify
- **Balance** - a specific accounts ETHER wallet balance (i.e. 502.000 ETH)
- **Account User** - a user that has an active connected wallet to Bidify
- **Non-Account User** -  a user that does *not* have an active connected wallet to Bidify

### Actions

- **connect** - when a user connects their wallet to Bidify
- **disconnect** - when a user disconnects their wallet from Bidify
- **list** - when a user creates a Listing from their Owned NFTs
- **bid** - when a user places a bid on another users Listing
- **finish** - when a user ...

## Build Setup

Bidify uses Nuxt.js as the underlying framework for app architecture.
```bash

# install nuxt cli
$ npm i @nuxt/cli

# install dependencies
$ yarn

# serve with hot reload at localhost:3000
$ npm run dev

# serve with hot reload at [your ip] (helpful for mobile testing)
$ npm run dev:host

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

For a detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).


## Plugins

Active:
```
@/plugins/wallets // manages web3 providers and wallets
@/plugins/bidify // manages Bidify calls
@/plugins/opensea // manages OpenSea calls
@/plugins/listings // manages calls and states
```

Not active:

```
@/plugins/walletconnect
@/plugins/walletlink
```

## Modules
```
@nuxtjs/axios // http requests
@nuxtjs/pwa // progressive web app cool stuff
@nuxt/content // headless server for json, markdown, etc
nuxt-webfontloader // typekit fonts
nuxt-vuex-localstorage // optimistic data storage (encrypted)
```

## Build Modules
```
@nuxtjs/eslint-module
@nuxtjs/style-resources
@aceforth/nuxt-optimized-images
@nuxtjs/svg
@nuxtjs/device
@nuxtjs/google-gtag
@nuxtjs/color-mode
```

## Bidify UI

How users connect and interface with Bidify auctions.

### Bidding

- After a user lists an auction on Bidify, the countdown timer begins.
- A user can bid from a &lt;Card/&gt; component or from a &lt;Listing/&gt; view (see below).
- Bidding occurs from a modal or panel and does not require a user to leave their current view.

#### Time Display

- If time left is more than 1 day => ```1d 12h 3m```
- < 1 day => ```12h 3m 32s```
- < 1 hour => ```24m 50s```
- < 1 minute => ```22s left```
- timer up => ```Ended```

NOTE: If the timer is less than 3 minutes and a user attempts to bid, a warning is displayed to let the user know that their bid might not complete.

### Low-Latency

Bidify uses a combination of Server-Side rendering, push state, and optimistic caching to ensure the app loads as quickly as possible, and with the latest data, every time.

#### Tactical Nuxt
- Leverages Nuxt SSR to render HTML and any available data from the server (on first load)
- Leverages Nuxt $route to load subsequent views from the client
- Leverages Nuxt $stores to show optimistic data, even between page refreshes

#### Example

1. User views Listing page
2. Requests are made to assemble data
3. Data is cached in local storage for 30 minutes
4. View displays cache
5. User leaves page and returns (or refreshes)
6. View displays cache and makes request in background
7. Back to #3

#### Fallback
1. Cache will display for up to 30 minutes if either Bidify or OpenSea fails
2. If only OpenSea fails, app will still display data in all views, but with limited information

### States

Bidify's views are controlled entirely by states, both browser and local storage, so it's easy to trigger UI changes from anywhere in the app.

#### App Store
Controls whether or not the app is ready to be displayed
```
$store.commit('app/open') // opens the app to display UI
$store.commit('app/close') // closes the app and displays no UI
```

#### Bidify Store
Controls UI related to listing and bidding
```
$store.commit('bidify/listModal', { ... }) // show listing modal
$store.commit('bidify/listModal', false) // hide listing modal

$store.commit('bidify/approving', true/false) // show steps for approving listing
$store.commit('bidify/listing', true/false) // show steps for listing call
```

#### Wallet Store
Controls UI related to connecting to and displaying wallet information
```
$store.commit('wallets/balance', { balance, type }) // set a wallet balance
$store.commit('wallets/connected', { account }) // show user as connected in app
$store.commit('wallets/disconnect') // show user as disconnected in app
$store.commit('wallets/hasMetaMask', true/false) // display metamask UI
$store.commit('wallets/error', error) // display error modal
$store.commit('wallets/chain', error) // display message on network change (not active)
$store.commit('wallets/chainError', error) // display message on network error (not active)
```
#### LocalStorage Store
```
$store.commit('localStorage/listing', list) // populate Listings
$store.commit('localStorage/owned', list) // populate Owned Listings
$store.commit('localStorage/nfts', list) // populate Owned NFTs
$store.commit('localStorage/active', listing) // populate the current Listing view
```

### Vue

#### Layouts

**&lt;DefaultLayout/&gt;**

Wraps all other views. Ensures Bidify is initiated before any views are displayed.

```
/layouts/default.vue
```

#### Views

**&lt;Home/&gt;**
Shows Bidify Listings for both connected and non-connected users
```
route => '/'
/pages/index.vue
```

**&lt;Owned/&gt;**
Shows Bidify Owned Listings
```
route => '/owned'
/pages/owned/index.vue
```

**&lt;Create/&gt;**
Shows Bidify Owned NFT's and allows listing
```
route => '/create'
/pages/create/index.vue
```


**&lt;Listing/&gt;**
Shows a specific Bidify listing and allows bidding
```
route => '/listing/{id}/{platform}/{token}'
/pages/listing/_id/_platform/_token.vue

$route.params = { id, platform, token }
```

**&lt;Connect/&gt;**
Allows user to connect to their wallet of choice. Once user is connected, redirects to Home.

Note: May be deprecated.
```
route => '/connect'
/pages/connect/index.vue

```
