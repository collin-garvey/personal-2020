import FsLightbox from 'fslightbox-react';
import {useState} from 'react';
import ReactMarkdown from 'react-markdown';
import CTASection from '../../components/CTASection';
import Hero from '../../components/Hero';
import Section from '../../components/Section';
import {TagList} from '../../components/TagList';
import config from '../../data/config.js';
import {getAllPosts, getPostBySlug, TWorkPost} from '../../lib/api';
import styles from '../../styles/WorkPost.module.css';

export default function Post({post}) {
  const carouselImages = post.images.map((path: string) => {
    return `${config.imagesPath}${path}`;
  });
  const [toggler, setToggler] = useState(false);

  return (
    <>
      <Hero imagePath={`${config.imagesPath}${post.mainImage}`}>
        <h1>{post.title}</h1>
      </Hero>
      <Section width="wide">
        <article className={styles.WorkPost}>
          <div className={styles.sidebar}>
            <h3>Project Type</h3>
            <TagList tags={[post.type]} />
            <h3>Technologies</h3>
            <TagList tags={post.tags} />
            {post.liveUrl && (
              <>
                <h3>URL</h3>
                <div className={styles.tagList}>
                  <span className={styles.tag}>
                    <a href={post.liveUrl} target="_blank">
                      {post.liveUrl}
                    </a>
                  </span>
                </div>
              </>
            )}
            <button onClick={() => setToggler(!toggler)}>View Gallery</button>
            <FsLightbox toggler={toggler} sources={carouselImages} />
          </div>
          <div className={styles.postContent}>
            <ReactMarkdown source={post.content} className={styles.markdown} />
          </div>
        </article>
      </Section>
      <CTASection />
    </>
  );
}

export async function getStaticProps({params}) {
  const post: TWorkPost = getPostBySlug('work', params.slug, [
    'title',
    'slug',
    'date',
    'content',
    'mainImage',
    'featuredBlurb',
    'liveURL',
    'images',
    'tags',
    'type',
  ]);

  return {
    props: {
      post: {
        ...post,
      },
    },
  };
}

export async function getStaticPaths() {
  const posts: TWorkPost[] = getAllPosts('work', ['slug']);

  return {
    paths: posts.map(post => {
      return {
        params: {
          slug: post.slug,
        },
      };
    }),
    fallback: false,
  };
}
