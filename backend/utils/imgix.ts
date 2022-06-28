import ImgixClient from '@imgix/js-core'

require('dotenv').config()

export default new ImgixClient({
  domain: 'rabble-academy.imgix.net',
  secureURLToken: process.env.IMGIX_TOKEN,
})
