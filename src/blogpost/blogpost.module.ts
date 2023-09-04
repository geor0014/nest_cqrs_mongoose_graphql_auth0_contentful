import { Module } from '@nestjs/common';
import { BlogPostResolver } from './blogpost.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { BlogPostSchema } from './blogpost.schema';

@Module({
    providers: [
        BlogPostResolver
    ],
    imports: [
        MongooseModule.forFeature([
            {
                name: 'BlogPost',
                schema: BlogPostSchema
            }
        ])
    ]
})
export class BlogpostModule {
    
}

