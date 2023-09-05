import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

/**
 * This guard is used to protect GraphQL resolvers.
 * It extends the AuthGuard from @nestjs/passport.
 * We need to use it because GraphQL does not understand the concept of a request object.
 */
@Injectable()
export class LocalGuard extends AuthGuard('jwt') {
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }
}
