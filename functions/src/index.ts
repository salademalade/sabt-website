import { onRequest } from 'firebase-functions/v2/https';
import { initializeApp } from 'firebase-admin/app';
import { Timestamp, getFirestore } from 'firebase-admin/firestore';

const app = initializeApp();

const db = getFirestore(app);

export const genRSS = onRequest(async (req, res) => {
  const snap = await db.collectionGroup('pages')
    .where('createdAt', '<=', Timestamp.now())
    .orderBy('createdAt', 'desc')
    .orderBy('number', 'desc')
    .limit(20)
    .get();

  let contentStr = '';
  for (let doc of snap.docs) {
    contentStr = contentStr.concat(
      `
      <item>
        <title><![CDATA[${doc.get('titleLong')}]]></title>
        <link>https://sniffandbarktales.com/comic/${doc.get('number').toString()}</link>
        <pubDate><![CDATA[${doc.get('createdAt').toDate().toLocaleDateString('en-GB', {
          weekday: 'short',
          day: 'numeric',
          month: 'short',
          year: 'numeric'
        })}]]></pubDate>
        <description><![CDATA[${doc.get('description')}]]></description>
      </item>
      `
    );
  }

  res.set('Content-Type', 'text/xml');
  res.status(200).send(
    `
    <?xml version="1.0" encoding="UTF-8" ?>
    <rss version="2.0">
      <channel>
        <title><![CDATA[Sniff and Bark Tales]]></title>
        <link>https://sniffandbarktales.com</link>
        <description><![CDATA[Sniff and Bark Tales Webcomic]]></description>
        ${contentStr}
      </channel>
    </rss>
    `.trim()
  );
});
