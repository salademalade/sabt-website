import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Firestore, Timestamp, collection, getCountFromServer, getDocs, limit, orderBy, query, sum, where } from '@angular/fire/firestore';
import { Storage, getDownloadURL, ref } from '@angular/fire/storage';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-archive',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './archive.component.html',
  styleUrl: './archive.component.scss'
})
export class ArchiveComponent {
  firestore: Firestore = inject(Firestore);
  storage: Storage = inject(Storage);
  route: ActivatedRoute = inject(ActivatedRoute);

  chapter: number = 0;
  count: number = 0;

  title: string = '';

  data: any[] = [];
  chapters: number[] = [];

  async ngOnInit() {
    const ch = this.route.snapshot.queryParamMap.get('ch');
    if (ch == null) this.chapter = 1;
    else this.chapter = parseInt(ch);

    this.count = (await getCountFromServer(query(collection(this.firestore, 'chapters'), where('createdAt', '<=', Timestamp.now())))).data().count;
    this.chapters = Array(this.count).fill(0).map((x, i) => i + 1);

    const chSnap = await getDocs(query(collection(this.firestore, 'chapters'), where('createdAt', '<=', Timestamp.now()), where('number', '==', this.chapter), limit(1)));

    if (chSnap.docs.length < 1) return;

    this.title = chSnap.docs[0].get('title');
    const pgsSnap = await getDocs(query(collection(this.firestore, 'chapters', chSnap.docs[0].id, 'pages'), where('createdAt', '<=', Timestamp.now()), orderBy('createdAt', 'asc'), orderBy('number', 'asc')));

    for (let doc of pgsSnap.docs) {
      this.data.push({
        title: doc.get('titleShort'),
        number: doc.get('number'),
        imageURL: await getDownloadURL(ref(this.storage, doc.get('imagePath'))),
      });
    }
  }
}
