import { Injectable } from '@angular/core';
import io from 'socket.io-client';
const BASE_URL = 'http://localhost:3000'



@Injectable({ providedIn: 'root' })
export class SocketService {
  public socket;

  constructor() {
  }

  public setup() {    
    this.socket = io(BASE_URL);
}

public terminate() {
  this.socket = null;
}

public on(eventName, cb) {
  this.socket.on(eventName, cb)
}

public off(eventName, cb) {
  this.socket.off(eventName, cb)
}

public emit(eventName, data) {
    this.socket.emit(eventName, data)    
}
}