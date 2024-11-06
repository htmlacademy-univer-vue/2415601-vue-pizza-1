import { ApiService } from "./api.service";

export class CrudService extends ApiService {
  constructor(resource) {
    super();
    this.resource = resource;
  }

  get() {
    return this.$get(this.resource);
  }

  post(object) {
    return this.$post(this.resource, object);
  }

  put(object) {
    return this.$put(`${this.resource}/${object.id}`, object);
  }

  delete(id) {
    return this.$delete(`${this.resource}/${id}`);
  }
}
