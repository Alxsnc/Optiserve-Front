import { Component } from '@angular/core';
import { environment } from 'src/environments/environment.prod';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {  
  title='Optiservice-Front';
  public prod=environment.production;
  public variable=environment.urlapi;

  


}
