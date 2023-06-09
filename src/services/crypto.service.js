import axios from "axios"
import { storageService } from './storage.service'
const MARKET_PRICE_KEY = 'marketPriceDB'
const BLOCK_SIZE_KEY = 'blockSizeDB'
const TRADE_VOLUME_KEY = 'tradeVolumeDB'
export const cryptoService = {
     getRate,
     getMarketPrice,
     getConfirmedTransactions,
}

async function getRate(coins) {
     try {
          const coinsInUsd = await axios.get(`https://blockchain.info/tobtc?currency=USD&value=${coins}`)
          return coinsInUsd.data
     } catch (err) {
          console.error(`failed to get coins`, err)
     }
}

async function getMarketPrice() {
     const marketPricesFromStorage = storageService.load(MARKET_PRICE_KEY)
     if (marketPricesFromStorage) return marketPricesFromStorage
     try {
          const response = await axios.get(`https://api.blockchain.info/charts/market-price?timespan=5months&format=json&cors=true`)
          const data = response.data
          storageService.save(MARKET_PRICE_KEY, data)
          return data
     } catch (err) {
          console.error('Error getting market prices:', err)
          return null
     }
}

async function getConfirmedTransactions() {
     const blockSizeFromStorage = storageService.load(BLOCK_SIZE_KEY)
     if (blockSizeFromStorage) return blockSizeFromStorage
     try {
          const response = await axios.get(`https://api.blockchain.info/charts/avg-block-size?timespan=5months&format=json&cors=true`)
          const data = response.data
          storageService.save(BLOCK_SIZE_KEY, data)
          return data
     } catch (err) {
          console.error('Error getting block size:', err)
          return null
     }
}