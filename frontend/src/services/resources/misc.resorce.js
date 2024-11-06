import { CrudService } from "@/services/api/crud.service";

export class MiscResource extends CrudService {
  constructor() {
    super("/api/misc");
  }

  getMiscs() {
    return this.get();
  }
}
