export function createBlogPostFromEntry(entry) {
  const zoneIdentifier = 'en-US';

  const {
    title: cratedTitle,
    content: createdContent,
    slug: createdSlug,
    author: createdAuthor,
  } = entry.fields;

  const blogPost = {
    id: entry.sys.id,
    title: cratedTitle[zoneIdentifier],
    content: createdContent[zoneIdentifier],
    slug: createdSlug[zoneIdentifier],
    author: createdAuthor[zoneIdentifier],
  };

  return blogPost;
}
