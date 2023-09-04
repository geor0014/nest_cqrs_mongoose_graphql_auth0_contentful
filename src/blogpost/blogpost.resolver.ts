import { Query, Resolver } from "@nestjs/graphql";
import { BlogPostType } from "./blogpost.type";

@Resolver(of => BlogPostType)
export class BlogPostResolver {
    @Query(returns => BlogPostType)
    blogPost() {
        return {
            id: 'some-id',
            title: 'some-title',
            content: 'some-content'
        }
    }
}