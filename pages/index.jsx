import { createClient } from 'contentful';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';

export const getStaticProps = async () => {
  const client = createClient({
    space: process.env.NEXT_PUBLIC_SPACE_ID,
    accessToken: process.env.NEXT_PUBLIC_ACCESS_TOKEN,
  });
  const data = await client.getEntries({ content_type: 'sampleModel' });
  return { props: { items: data.items } };
};

export default function Home({ items }) {
  console.log(items);
  const { title, content, image, state } = items[0].fields;
  return (
    <div>
      <h1>Lesson Contentful</h1>
      <div style={{ border: '1px solid #444', padding: '16px', margin: '8px' }}>
        <h1>{title}</h1>
        <hr />
        <button>❤️ {state.favorites}</button>
        <ReactMarkdown>{content}</ReactMarkdown>
        <Image src={'https:' + image.fields.file.url} width={image.fields.file.details.image.width} height={image.fields.file.details.image.height} />
      </div>
    </div>
  );
}
