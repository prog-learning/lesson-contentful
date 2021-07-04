import React from 'react';
import { createClient } from 'contentful';
import ReactMarkdown from 'react-markdown';
import Image from 'next/image';

const client = createClient({
  space: process.env.NEXT_PUBLIC_SPACE_ID,
  accessToken: process.env.NEXT_PUBLIC_ACCESS_TOKEN,
});
export const getStaticPaths = async () => {
  const data = await client.getEntries({
    content_type: 'sampleModel',
  });
  const paths = data.items.map((item) => ({
    params: { postId: item.sys.id },
  }));
  return { paths, fallback: false };
};

export const getStaticProps = async ({ params }) => {
  const data = await client.getEntries({
    content_type: 'sampleModel',
    'sys.id': params.postId,
  });
  return { props: { item: data.items[0] } };
};

const Post = ({ item }) => {
  console.log(item);
  const { title, content, image } = item.fields;
  return (
    <div>
      <h1>Posts detail Page</h1>
      <div>
        <h2>{title}</h2>
        <hr />
        {image && (
          <Image
            src={'https:' + image.fields.file.url}
            alt={image.fields.title}
            width={image.fields.file.details.image.width}
            height={image.fields.file.details.image.height}
          />
        )}
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    </div>
  );
};

export default Post;
