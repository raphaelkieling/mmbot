require("dotenv").config();

export default {
  PREFIX: process.env.PREFIX,
  MMBOT_TOKEN: process.env.MMBOT_TOKEN,
  ITEM_TYPES: {
    ORE: "ore",
  },
};
