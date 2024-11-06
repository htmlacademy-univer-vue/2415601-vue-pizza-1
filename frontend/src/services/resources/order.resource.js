import { CrudService } from "@/services/api/crud.service";

export class OrderResource extends CrudService {
    constructor() {
        super("/api/orders");
    }

    getOrders() {
        return this.get();
    }

    addOrder(order) {
        return this.post(order);
    }

    removeOrder(id) {
        return this.delete(id);
    }
}
