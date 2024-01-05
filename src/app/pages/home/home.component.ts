import { Component } from '@angular/core';
import { ComicDisplayComponent } from '../../components/comic-display/comic-display.component';
import { faRss } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ComicDisplayComponent, FontAwesomeModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  faRss = faRss;
}
