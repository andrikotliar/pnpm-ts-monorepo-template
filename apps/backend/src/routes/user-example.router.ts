import z from 'zod';
import { createRouter, defineRoute } from '~/shared';
import crypto from 'crypto';

type EntityWithId<T> = T & {
  id: string;
};

const CreateUserSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  age: z.number(),
});

const DeleteUserSchema = z.object({
  id: z.string(),
});

let users: Array<EntityWithId<z.infer<typeof CreateUserSchema>>> = [];

export const userExampleRouter = createRouter('/users', [
  defineRoute({
    path: '/',
    method: 'get',
    handler({ response }) {
      response.status(200).send({ data: users });
    },
  }),
  defineRoute({
    path: '/',
    method: 'post',
    schema: {
      body: CreateUserSchema,
    },
    handler({ requestParams, response }) {
      const id = crypto.randomUUID();

      const newUser = {
        ...requestParams.body,
        id,
      };

      users.push(newUser);

      response.status(200).send(newUser);
    },
  }),
  defineRoute({
    path: '/:id',
    method: 'delete',
    schema: {
      params: DeleteUserSchema,
    },
    handler({ requestParams, response }) {
      users = users.filter((user) => user.id !== requestParams.params.id);

      response.status(200).send({
        deleted: {
          id: requestParams.params.id,
        },
      });
    },
  }),
]);
