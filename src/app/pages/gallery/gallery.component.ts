import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Firestore, collection, getDocs, limit, orderBy, query } from '@angular/fire/firestore';
import { Storage, getDownloadURL, ref } from '@angular/fire/storage';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss'
})
export class GalleryComponent {
  firestore: Firestore = inject(Firestore);
  storage: Storage = inject(Storage);

  data: any[] = [];

  async ngOnInit() {
    const snap = await getDocs(query(collection(this.firestore, 'gallery'), orderBy('createdAt', 'desc'), limit(20)));

    for (let doc of snap.docs) {
      this.data.push({
        creator: doc.get('creator'),
        description: doc.get('description'),
        imageURL: await getDownloadURL(ref(this.storage, doc.get('imagePath'))),
      });
    }
  }
}
