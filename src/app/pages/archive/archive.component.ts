import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Firestore, Timestamp, collection, getDocs, orderBy, query, where } from '@angular/fire/firestore';

@Component({
  selector: 'app-archive',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './archive.component.html',
  styleUrl: './archive.component.scss'
})
export class ArchiveComponent {
  firestore: Firestore = inject(Firestore);

  data: { title: string, chapters: { title: string, number: number, imageURL: string }[] }[] = [];

  ngOnInit() {
    getDocs(query(collection(this.firestore, 'chapters'), orderBy('number', 'asc'))).then((snap) => {
      snap.forEach((docSnap) => {
        const title: string = docSnap.data()['title'];
        let chapters: { title: string, number: number, imageURL: string }[] = [];
        getDocs(query(collection(this.firestore, 'chapters', docSnap.id, 'pages'), where('createdAt', '<=', Timestamp.now()), orderBy('createdAt', 'asc'), orderBy('number', 'asc'))).then((snap) => {
          snap.forEach((docSnap) => {
            const title: string = docSnap.data()['titleShort'];
            const number: number = docSnap.data()['number'];
            const imageURL: string = docSnap.data()['imageURL'];

            chapters.push({ title, number, imageURL });
          });
        });

        this.data.push({ title, chapters });
      });
    });
  }
}
