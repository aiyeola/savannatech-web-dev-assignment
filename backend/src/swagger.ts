import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import config from 'config';

const port = config.get('port') as number;

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Users and Posts API',
      version: '1.0.0',
      description: 'A simple API for managing users and posts with SQLite database',
    },
    servers: [
      {
        url: `http://localhost:${port}`,
        description: 'Development server',
      },
    ],
    components: {
      schemas: {
        User: {
          type: 'object',
          required: ['id', 'name', 'username', 'email'],
          properties: {
            id: {
              type: 'string',
              description: 'The unique identifier for the user',
            },
            name: {
              type: 'string',
              description: 'Full name of the user',
            },
            username: {
              type: 'string',
              description: 'Username of the user',
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'Email address of the user',
            },
            phone: {
              type: 'string',
              description: 'Phone number of the user',
            },
            user_id: {
              type: 'string',
              description: 'Alternative user identifier',
            },
            street: {
              type: 'string',
              description: 'Street address',
            },
            state: {
              type: 'string',
              description: 'State or province',
            },
            city: {
              type: 'string',
              description: 'City name',
            },
            zipcode: {
              type: 'string',
              description: 'Postal/ZIP code',
            },
          },
        },
        Post: {
          type: 'object',
          required: ['id', 'user_id', 'title', 'body'],
          properties: {
            id: {
              type: 'string',
              description: 'The unique identifier for the post',
            },
            user_id: {
              type: 'string',
              description: 'ID of the user who created the post',
            },
            title: {
              type: 'string',
              description: 'Title of the post',
            },
            body: {
              type: 'string',
              description: 'Content of the post',
            },
            created_at: {
              type: 'string',
              format: 'date-time',
              description: 'Timestamp when the post was created',
            },
          },
        },
        CreatePostRequest: {
          type: 'object',
          required: ['userId', 'title', 'body'],
          properties: {
            userId: {
              type: 'string',
              description: 'ID of the user creating the post',
            },
            title: {
              type: 'string',
              description: 'Title of the post',
            },
            body: {
              type: 'string',
              description: 'Content of the post',
            },
          },
        },
        PaginatedUsersResponse: {
          type: 'object',
          properties: {
            users: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/User',
              },
            },
            pageNumber: {
              type: 'number',
              description: 'Current page number (0-based)',
            },
            pageSize: {
              type: 'number',
              description: 'Number of items per page',
            },
            totalPages: {
              type: 'number',
              description: 'Total number of pages',
            },
          },
        },
        CountResponse: {
          type: 'object',
          properties: {
            count: {
              type: 'number',
              description: 'Total count of users',
            },
          },
        },
        ErrorResponse: {
          type: 'object',
          properties: {
            error: {
              type: 'string',
              description: 'Error message',
            },
            message: {
              type: 'string',
              description: 'Error message',
            },
          },
        },
        SuccessResponse: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              description: 'Success message',
            },
            post: {
              $ref: '#/components/schemas/Post',
            },
          },
        },
      },
    },
  },
  apis: ['./src/routes/*.ts'],
};

const specs = swaggerJsdoc(options);

export { swaggerUi, specs };