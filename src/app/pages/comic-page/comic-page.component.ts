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

  get pageNo(): number {
    const param = this.activatedRoute.snapshot.paramMap.get('id') || 0;
    if (param === 0) return 0;
    return parseInt(param);
  }
}
