import { Observable } from 'rxjs';

export class Exception {

  handleError(error: any) {
    return Observable.throw(error);
  }
}