import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Firestore, collection, getDocs, limit, orderBy, query } from '@angular/fire/firestore';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss'
})
export class GalleryComponent {
  firestore: Firestore = inject(Firestore);
  data: { creator: string, description: string, imageURL: string }[] = [];

  ngOnInit() {
    getDocs(query(collection(this.firestore, 'gallery'), orderBy('createdAt', 'desc'), limit(50))).then((snap) => {
      snap.forEach((docSnap) => {
        const creator = docSnap.data()['creator'];
        const description = docSnap.data()['description'];
        const imageURL = docSnap.data()['imageURL'];

        this.data.push({ creator, description, imageURL });
      });
    });
  }
}
