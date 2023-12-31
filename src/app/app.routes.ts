import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { ComicPageComponent } from './pages/comic-page/comic-page.component';
import { ArchiveComponent } from './pages/archive/archive.component';
import { GalleryComponent } from './pages/gallery/gallery.component';
import { SoundtrackComponent } from './pages/soundtrack/soundtrack.component';
import { AboutComponent } from './pages/about/about.component';
import { CharactersComponent } from './pages/characters/characters.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Sniff and Bark Tales',
  },
  {
    path: 'comics',
    component: ArchiveComponent,
    title: 'Sniff and Bark Tales | Archive',
  },
  {
    path: 'comics/:id',
    component: ComicPageComponent,
    title: 'Sniff and Bark Tales | Comic',
  },
  {
    path: 'characters',
    component: CharactersComponent,
    title: 'Sniff and Bark Tales | Characters',
  },
  {
    path: 'gallery',
    component: GalleryComponent,
    title: 'Sniff and Bark Tales | Gallery',
  },
  {
    path: 'ost',
    component: SoundtrackComponent,
    title: 'Sniff and Bark Tales | Soundtrack',
  },
  {
    path: 'about',
    component: AboutComponent,
    title: 'Sniff and Bark Tales | About',
  },
  {
    path: '**',
    component: NotfoundComponent,
    title: 'Sniff and Bark Tales | Page Not Found',
  },
];
