import matter from 'gray-matter';
import ReactMarkdown from 'react-markdown';
import Link from 'next/link';
import Hero from '../../components/Hero';
import Section from '../../components/Section';
import LinkButton from '../../components/LinkButton';
import {imagesPath} from '../../data/config.json';
import Carousel from '../../components/Carousel';
import CTASection from '../../components/CTASection';

import styles from '../../styles/WorkPost.module.css';

export default function Post({content, data}) {
  const frontmatter = data;
  const carouselImages = frontmatter.images.map((path: string) => {
    return {
      source: `${imagesPath}${path}`,
    };
  });

  return (
    <>
      <Hero imagePath={`${imagesPath}${frontmatter.mainImage}`}>
        <h1>{frontmatter.title}</h1>
      </Hero>
      <Section width="wide">
        <article className={styles.WorkPost}>
          <div className={styles.sidebar}>
            <h3>Project Type</h3>
            <div className={styles.tagList}>
              <span className={styles.tag}>{frontmatter.type}</span>
            </div>
            <h3>Technologies</h3>
            <div className={styles.tagList}>
              {frontmatter.tags.map((tag: string, index: number) => {
                return (
                  <span className={styles.tag} key={index}>
                    {tag}
                  </span>
                );
              })}
            </div>
            <Carousel images={carouselImages} />
          </div>
          <div className={styles.postContent}>
            <ReactMarkdown source={content} className={styles.markdown} />
          </div>
        </article>
      </Section>
      <CTASection />
    </>
  );
}

Post.getInitialProps = async context => {
  const {slug} = context.query;
  const content = await import(`../../_work/${slug}.md`);
  const data = matter(content.default);

  return {...data};
};