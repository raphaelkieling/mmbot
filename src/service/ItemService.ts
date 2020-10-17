import config from "../config";
import Item, { IItem } from "../database/models/Item";

export default class ItemService {
  getAll(): Promise<IItem[]> {
    return Item.find().exec();
  }

  getAllByType(type): Promise<IItem[]> {
    return Item.find({ type }).exec();
  }

  getAllOres() {
    return this.getAllByType(config.ITEM_TYPES.ORE);
  }
}
