import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { DiagramModel } from '../_interfaces/diagrammodel.model';

@Injectable({
  providedIn: 'root',
})
export class SignalrService {
  public data: DiagramModel[];
  private hubConnection: signalR.HubConnection;
  public startConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:5001/diagram')
      .build();
    this.hubConnection
      .start()
      .then(() => console.log('Connection started'))
      .catch((err) => console.log('Error while starting connection: ' + err));
  };

  public addTransferChartDataListener = () => {
    this.hubConnection.on('transferdiagramdata', (data) => {
      this.data = data;
      console.log(data);
    });
  };
}
