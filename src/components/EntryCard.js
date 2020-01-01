import React from 'react';
import { formatReadingTime } from '../utils/readingTime';
import TagList from './TagList';

const Card = ({
  post,
  showTags = true,
  showDescription = true,
  showImage = false
}) => {
  return (
    <section className={`card ${showImage ? 'card--bg' : ''}`} role="article">
      {showImage && (
        <img
          className="card__image"
          src={`../../img/${post.frontmatter.featuredImage}`}
          alt="Featured of this blogpost"
        />
      )}
      <div className="card__content">
        <a href={post.fields.slug} className="card__title">
          {post.frontmatter.title || ''}
        </a>
        <span className="card__subtitle">
          <time dateTime={post.frontmatter.date}>{post.frontmatter.date}</time>
          {` • ${formatReadingTime(post.wordCount.words)}`}
        </span>
        {showTags && (
          <TagList
            className="card__tags"
            tags={post.frontmatter.tags}
            max={3}
          />
        )}
      </div>
    </section>
  );
};

export default Card;
