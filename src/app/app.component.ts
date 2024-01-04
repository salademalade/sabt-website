import { Component, inject, isDevMode } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Meta } from '@angular/platform-browser';
import { Firestore, connectFirestoreEmulator } from '@angular/fire/firestore';
import { HeaderComponent } from './layout/header/header.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { FooterComponent } from './layout/footer/footer.component';
import { Storage, connectStorageEmulator } from '@angular/fire/storage';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, NavbarComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'sabt-website';

  firestore: Firestore = inject(Firestore);
  storage: Storage = inject(Storage);
  meta: Meta = inject(Meta);

  ngOnInit() {
    if (isDevMode()) {
      connectFirestoreEmulator(this.firestore, 'localhost', 8080);
      connectStorageEmulator(this.storage, 'localhost', 9199);
    }
  }
}
