/**
 * game service
 */

import axios from "axios";
import { factories } from "@strapi/strapi";

export default factories.createCoreService("api::game.game", () => ({
  async populate(params) {
    const gogApiUrl = `https://catalog.gog.com/v1/catalog?limit=48&genres=in%3Aaction&order=desc%3Atrending&productType=in%3Agame%2Cpack%2Cdlc%2Cextras&page=1&countryCode=BR&locale=en-US&currencyCode=BRL`;

    const {
      data: { products },
    } = await axios.get(gogApiUrl);

    console.log(products)
  },
}));
