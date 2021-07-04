import { createClient } from 'contentful';
import Router from 'next/router';

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

  const handleClick = (postId) => {
    Router.push(`/posts/${postId}`);
  };

  return (
    <div>
      <h1>Lesson Contentful</h1>
      <h2>Post List</h2>
      {items.map((item) => {
        const { title } = item.fields;
        const { id } = item.sys;
        return (
          <div
            key={id}
            onClick={() => handleClick(id)}
            style={{
              border: '1px solid #444',
              padding: '16px',
              margin: '8px',
              cursor: 'pointer',
            }}
          >
            <h3>{title}</h3>
          </div>
        );
      })}
    </div>
  );
}
