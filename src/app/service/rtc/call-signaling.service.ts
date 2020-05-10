import {Injectable} from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class CallSignalingService {
  addEventListener(message: string, param2: (message) => Promise<void>) {
    console.log(message);
    console.log(param2);
  }

  send(param: { offer: Promise<RTCSessionDescriptionInit> }) {
    console.log(param);
  }
}
