import { type z } from 'zod';
import {
  Router,
  type RequestHandler,
  type Response,
  type Request,
  type NextFunction,
} from 'express';
import { isAuthenticated } from '~/shared/middlewares';

type HttpMethod = 'get' | 'post' | 'put' | 'patch' | 'delete';

type RouteSchema = {
  body?: z.ZodObject;
  query?: z.ZodObject;
  params?: z.ZodObject;
};

type InferDto<S extends RouteSchema> = {
  body: S['body'] extends z.ZodObject<any> ? z.infer<S['body']> : undefined;
  query: S['query'] extends z.ZodObject<any> ? z.infer<S['query']> : undefined;
  params: S['params'] extends z.ZodObject<any> ? z.infer<S['params']> : undefined;
};

type Context<S extends RouteSchema> = {
  requestParams: InferDto<S>;
  response: Response;
  originalRequest: Request;
  next: NextFunction;
};

type RouteConfig<S extends RouteSchema> = {
  method: HttpMethod;
  path: string;
  isPublic?: boolean;
  schema?: S;
  middlewares?: RequestHandler[];
  handler?: (ctx: Context<S>) => Promise<unknown> | void;
};

export function defineRoute<S extends RouteSchema>(route: RouteConfig<S>): RouteConfig<S> {
  return route;
}

export function createRouter<T extends RouteConfig<RouteSchema>[]>(path: string, routes: T) {
  const router = Router();

  for (const route of routes) {
    const middlewares: RequestHandler[] = [];

    if (route.middlewares) {
      middlewares.push(...route.middlewares);
    }

    if (!route.isPublic) {
      middlewares.push(isAuthenticated);
    }

    router[route.method](route.path, ...middlewares, async (req: Request, res, next) => {
      try {
        if (!route.handler) {
          return;
        }

        const requestParams = {
          body: route.schema?.body?.parse(req.body),
          query: route.schema?.query?.parse(req.query),
          params: route.schema?.params?.parse(req.params),
        } as InferDto<RouteSchema>;

        await route.handler({
          requestParams,
          originalRequest: req,
          response: res,
          next,
        });
      } catch (e) {
        next(e);
      }
    });
  }

  return { path, router };
}
