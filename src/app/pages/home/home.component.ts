import { Component } from '@angular/core';
import { ComicDisplayComponent } from '../../components/comic-display/comic-display.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ComicDisplayComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
