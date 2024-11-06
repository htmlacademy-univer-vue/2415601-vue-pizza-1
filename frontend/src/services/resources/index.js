import { AddressResource } from "./address.resource";
import { DoughResource } from "./dough.resource";
import { IngredientResource } from "./ingredients.resource";
import { MiscResource } from "./misc.resorce";
import { OrderResource } from "./order.resource";
import { SauceResource } from "./sauce.resource";
import { SizeResource } from "./size.resource";

export default {
    address: new AddressResource(),
    dough: new DoughResource(),
    ingredient: new IngredientResource(),
    misc: new MiscResource(),
    order: new OrderResource(),
    sauce: new SauceResource(),
    size: new SizeResource(),
}