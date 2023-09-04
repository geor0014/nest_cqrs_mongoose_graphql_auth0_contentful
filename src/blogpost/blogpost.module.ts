import { Module } from '@nestjs/common';
import { BlogPostResolver } from './blogpost.resolver';

@Module({
    providers: [
        BlogPostResolver
    ],
})
export class BlogpostModule {
}

