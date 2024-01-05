import { Request, Response } from 'express';
import { Timestamp } from 'firebase-admin/firestore';
import { firestore } from "../services/firebase";

export async function genRSS(req: Request, res: Response<any>) {
  let items: string = '';
  const data = await firestore.collectionGroup('pages')
    .where('createdAt', '<=', Timestamp.now())
    .orderBy('createdAt', 'desc')
    .orderBy('number', 'desc')
    .get();

  for (const doc of data.docs) {
    items = items.concat(
      `
      <item>
        <title>
          <![CDATA[${doc.get('titleLong')}]]>
        </title>
        <pubDate>
          ${doc.get('createdAt').toDate().toLocaleString('en-GB', {
            weekday: 'short',
            day: 'numeric',
            month: 'short',
            year: 'numeric'
          })}
        </pubDate>
        <link>https://sniffandbarktales.com/comic/${doc.get('number').toString()}</link>
        <description>
          <![CDATA[${doc.get('description')}]]>
        </description>
      </item>
      `
    );
  }

  const doc =
  `
  <?xml version="1.0" encoding="UTF-8" ?>
  <rss version="2.0">
    <channel>
      <title>
        <![CDATA[Sniff and Bark Tales]]>
      </title>
      <link>https://sniffandbarktales.com</link>
      <description>
        <![CDATA[A webcomic]]>
      </description>
      ${items}
    </channel>
  </rss>
  `.trim();

  res.set('content-type', 'application/xml');
  res.status(200).send(doc);
}
