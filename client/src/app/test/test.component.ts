import { Component, OnInit } from '@angular/core';
import { CompleterService, CompleterData } from 'ng2-completer';
import { AlertBoxService } from '../shared/alert-box.service';
import { DialogData } from '../models/common/dialog-data.model';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  constructor(){}
  ngOnInit() {
  }


}
