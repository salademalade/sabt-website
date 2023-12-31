import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ComicDisplayComponent } from '../../components/comic-display/comic-display.component';

@Component({
  selector: 'app-comic-page',
  standalone: true,
  imports: [ComicDisplayComponent],
  templateUrl: './comic-page.component.html',
  styleUrl: './comic-page.component.scss'
})
export class ComicPageComponent {
  activatedRoute: ActivatedRoute = inject(ActivatedRoute);

  get pageNo() {
    const param = this.activatedRoute.snapshot.paramMap.get('id');
    if (param === 'latest') return 'latest';
    return parseInt(param as string);
  }
}
