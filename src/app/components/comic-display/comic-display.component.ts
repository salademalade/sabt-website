import { CommonModule } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { Firestore, Timestamp, collectionGroup, getDocs, limit, orderBy, query, where } from '@angular/fire/firestore';
import { RouterModule } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faAngleDoubleLeft, faAngleDoubleRight, faAngleLeft, faAngleRight, faSquare } from '@fortawesome/free-solid-svg-icons';
import { NotfoundComponent } from '../notfound/notfound.component';
import { Storage, getDownloadURL, ref } from '@angular/fire/storage';
import { marked } from 'marked';

@Component({
  selector: 'app-comic-display',
  standalone: true,
  imports: [CommonModule, RouterModule, FontAwesomeModule, NotfoundComponent],
  templateUrl: './comic-display.component.html',
  styleUrl: './comic-display.component.scss'
})
export class ComicDisplayComponent {
  @Input() pageNo: number = 0;
  @Input() displayNotFound: boolean = false;
  @Input() setTitle: boolean = false;

  firestore: Firestore = inject(Firestore);
  storage: Storage = inject(Storage);
  titleService: Title = inject(Title);

  title: string = '';
  number: number = 0;
  imageURL: string = '';
  description: string = '';
  createdAt: Timestamp = new Timestamp(0, 0);

  pageExists: boolean = false;
  lastNo: number = 0;

  faSquare = faSquare;
  faAngleLeft = faAngleLeft;
  faAngleRight = faAngleRight;
  faAngleDoubleLeft = faAngleDoubleLeft;
  faAngleDoubleRight = faAngleDoubleRight;

  get createdDate() {
    return this.createdAt.toDate().toLocaleString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  }

  async ngOnInit() {
    const latestSnap = await getDocs(query(collectionGroup(this.firestore, 'pages'), where('createdAt', '<=', Timestamp.now()), orderBy('createdAt', 'desc'), orderBy('number', 'desc'), limit(1)));

    this.lastNo = latestSnap.docs[0].get('number');
    if (this.pageNo == 0) {
      this.pageExists = true;
      this.title = latestSnap.docs[0].get('titleLong');
      this.number = latestSnap.docs[0].get('number');
      this.description = await marked.parse(latestSnap.docs[0].get('description'));
      this.createdAt = latestSnap.docs[0].get('createdAt');
      this.imageURL = await getDownloadURL(ref(this.storage, latestSnap.docs[0].get('imagePath')));
    } else {
      const snap = await getDocs(query(collectionGroup(this.firestore, 'pages'), where('createdAt', '<=', Timestamp.now()), where('number', '==', this.pageNo)));

      if (snap.docs.length == 0) return;

      this.pageExists = true;
      this.title = snap.docs[0].get('titleLong');
      this.number = snap.docs[0].get('number');
      this.description = await marked.parse(snap.docs[0].get('description'));
      this.createdAt = snap.docs[0].get('createdAt');
      this.imageURL = await getDownloadURL(ref(this.storage, snap.docs[0].get('imagePath')));
    }

    if (this.setTitle) {
      this.titleService.setTitle(`Sniff and Bark Tales | ${this.title}`);
    }
  }
}
