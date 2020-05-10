import {Injectable} from '@angular/core';
import {RxStomp} from '@stomp/rx-stomp';

const ICE_SERVERS: RTCIceServer[] = [
  {urls: 'stun:stun.l.google.com:19302'}
];

const PEER_CONNECTION_CONFIG: RTCConfiguration = {
  iceServers: ICE_SERVERS
};

@Injectable({
  providedIn: 'root'
})
export class CallWebRTCService {
  public peerConnection: RTCPeerConnection;
  private sendChannel: RTCDataChannel;
  private rxStomp = new RxStomp();
  private uuid;

  constructor() {
    this.uuid = this.createUuid();
  }

  public setupPeerServer() {
    this.peerConnection = new RTCPeerConnection(PEER_CONNECTION_CONFIG);
    this.peerConnection.onicecandidate = this.getIceCandidateCallback();
    this.peerConnection.ondatachannel = (event) => { console.log(`received message from channel`); };
    this.sendChannel = this.peerConnection.createDataChannel('sendDataChannel');
    this.rxStomp.watch('/ws/call').subscribe(response => {
      this.getSignalMessageCallback(response);
    });
    console.log(this.sendChannel);
  }

  public send(str) {
    this.sendChannel.send(str);
  }

  public createOffer() {
    this.peerConnection
      .createOffer()
      .then((e) => this.setDescription(e))
      .catch(this.errorHandler);
  }

  public setDescription(e) {
    console.log(e);
    return (description) => {
      console.log('got description');
      console.log(description);

      this.peerConnection.setLocalDescription(description)
        .then(() => {

          this.rxStomp.publish({
            destination: '/ws/call', body: JSON.stringify({
              sdp: this.peerConnection.localDescription, uuid: this.uuid
            })
          });
        })
        .catch(this.errorHandler);
    };
  }

  public setupSignalingServer() {
    this.rxStomp.configure({
      brokerURL: 'ws:' + '//' + location.hostname + ':' + 8089 + '/ws/connect',
      reconnectDelay: 5000
    });

    this.rxStomp.activate();
    this.rxStomp.stompErrors$.subscribe(this.errorHandler);
    this.rxStomp.webSocketErrors$.subscribe(this.errorHandler);
  }

  public getIceCandidateCallback(): (str) => void {
    return (event) => {
      console.log(`got ice candidate:`);
      console.log(event);

      if (event.candidate != null) {
        this.rxStomp.publish({
          destination: '/ws/call', body: JSON.stringify({ice: event.candidate, uuid: this.uuid})
        });
      }
    };
  }

  public getSignalMessageCallback(response) {
    console.log(response);
    return (message) => {
      const signal = JSON.parse(message.data);
      if (signal.uuid === this.uuid) {
        return;
      }

      console.log('Received signal');
      console.log(signal);

      if (signal.sdp) {
        this.peerConnection.setRemoteDescription(new RTCSessionDescription(signal.sdp))
          .then(() => {
            if (signal.sdp.type === 'offer') {
              this.peerConnection.createAnswer()
                .then(e => this.setDescription(e))
                .catch(this.errorHandler);
            }
          })
          .catch(this.errorHandler);
      } else if (signal.ice) {
        this.peerConnection.addIceCandidate(new RTCIceCandidate(signal.ice)).catch(this.errorHandler);
      }
    };
  }

  public errorHandler = () => console.log('error');

  public createUuid(): string {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }

    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
  }
}
