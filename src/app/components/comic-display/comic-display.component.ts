import { CommonModule } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { Firestore, Timestamp, collectionGroup, getDocs, limit, orderBy, query, where } from '@angular/fire/firestore';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faAngleDoubleLeft, faAngleDoubleRight, faAngleLeft, faAngleRight, faSquare } from '@fortawesome/free-solid-svg-icons';
import { NotfoundComponent } from '../notfound/notfound.component';

@Component({
  selector: 'app-comic-display',
  standalone: true,
  imports: [CommonModule, RouterModule, FontAwesomeModule, NotfoundComponent],
  templateUrl: './comic-display.component.html',
  styleUrl: './comic-display.component.scss'
})
export class ComicDisplayComponent {
  @Input() pageNo: number | string = 0;
  @Input() displayNotFound: boolean = false;

  firestore: Firestore = inject(Firestore);

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

  ngOnInit() {
    if (this.pageNo !== 'latest' && this.pageNo as number < 1) return;

    getDocs(query(collectionGroup(this.firestore, 'pages'), where('createdAt', '<=', Timestamp.now()), orderBy('createdAt', 'desc'), orderBy('number', 'desc'), limit(1))).then((snap) => {
      snap.forEach((docSnap) => {
        this.lastNo = docSnap.data()['number'];
        if (this.pageNo === 'latest') {
          this.pageExists = true;

          this.title = docSnap.data()['titleLong'];
          this.number = docSnap.data()['number'];
          this.imageURL = docSnap.data()['imageURL'];
          this.description = docSnap.data()['description'];
          this.createdAt = docSnap.data()['createdAt'];
        } else {
          getDocs(query(collectionGroup(this.firestore, 'pages'), where('createdAt', '<=', Timestamp.now()), where('number', '==', this.pageNo))).then((snap) => {
            if (snap.docs.length == 0) return;

            this.pageExists = true;
            snap.forEach((docSnap) => {
              this.title = docSnap.data()['titleLong'];
              this.number = docSnap.data()['number'];
              this.imageURL = docSnap.data()['imageURL'];
              this.description = docSnap.data()['description'];
              this.createdAt = docSnap.data()['createdAt'];
            });
          });
        }
      });
    });
  }
}
