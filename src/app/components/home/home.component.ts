import { Component, OnInit } from '@angular/core';
import { ElectronService } from '../../providers/electron.service';
import { inspect } from 'util';
// import {MatButtonModule, MatCheckboxModule} from '@angular/material';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  title = `App is work !`;

  constructor(private electronService: ElectronService) {
    console.log('Hi2');
    this.electronService.ipcRenderer.on('asynchronous-reply', (event, arg) => {
      console.log(arg) // prints "pong"
    })
  }

  ngOnInit() {
    console.log(this.electronService.ipcRenderer.sendSync('synchronous-message', 'ping')) // prints "pong"

  }

  async_IPC() {
    // console.log('buttonclick')
    this.electronService.ipcRenderer.send('asynchronous-message', 'ping')
  }

}


