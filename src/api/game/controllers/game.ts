/**
 * game controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::game.game",
  ({ strapi }) => ({
    async populate(ctx) {
      const options = {
        limit: 48,
        order: "desc:trending",
        ...ctx.query,
      };

      // ctx.send(await strapi.service("api::game.game").populate(ctx.query));
      await strapi.service("api::game.game").populate(options);

      ctx.send("Finished popupating games!");
    },
  })
);

/* QUERY EXAMPLES

findOne
{
  game(id: 30) {
    data {
      attributes {
        name
        short_description
      }
    }
  }
}

findMany
{
  game {
    data {
      attributes {
        name
        short_description
      }
    }
  }
}





*/
