/**
 * game service
 */

import { factories } from "@strapi/strapi";
import axios from "axios";
import { JSDOM } from "jsdom";

async function getGameInfo(slug) {
  // const gogSlug = slug.replaceAll("-", "_").toLowerCase();

  const body = await axios.get(`https://www.gog.com/en/game/${slug}`);
  const dom = new JSDOM(body.data);

  const raw_description = dom.window.document.querySelector(".description");
  const description = raw_description.innerHTML;
  const short_description = raw_description.textContent.slice(0, 160);

  const ratingElement = dom.window.document.querySelector(
    ".age-restrictions__icon use"
  );

  return {
    description,
    short_description,
    rating: ratingElement
      ? ratingElement
          .getAttribute("xlink:href")
          .replace(/_/g, "")
          .replace("#", "")
      : "BR0",
  };
}

export default factories.createCoreService("api::game.game", () => ({
  async populate(params) {
    const gogApiUrl = `https://catalog.gog.com/v1/catalog?limit=48&genres=in%3Aaction&order=desc%3Atrending&productType=in%3Agame%2Cpack%2Cdlc%2Cextras&page=1&countryCode=BR&locale=en-US&currencyCode=BRL`;

    const {
      data: { products },
    } = await axios.get(gogApiUrl);

    console.log(await getGameInfo(products[0].slug));
  },
}));
