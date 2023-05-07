import request from 'supertest';
import { app } from '../../app';

describe('Posts Routes', () => {
  const post = {
    title: 'Test Post',
    body: 'This is a test post'
  };
  const fakePostId = '6404e6b73672982ebc23f7c7'; // non-existent ID

  describe('GET /posts', () => {
    it('should return an empty array', async () => {
      const response = await request(app).get('/posts');

      expect(response.status).toBe(200);
      expect(response.body).toEqual([]);
    });

    it('should return an array of posts', async () => {
      
      await request(app).post('/posts').send(post);

      const response = await request(app).get('/posts');

      expect(response.status).toBe(200);
      expect(response.body.length).toBe(1);
      expect(response.body[0].title).toBe(post.title);
      expect(response.body[0].body).toBe(post.body);
    });
  });

  describe('POST /posts', () => {
    it('should create a new post', async () => {
      const response = await request(app)
        .post('/posts')
        .send(post);

      expect(response.status).toBe(201);
      expect(response.body.title).toBe(post.title);
      expect(response.body.body).toBe(post.body);
    });

    it('should return a 400 if title is missing', async () => {
      const response = await request(app)
        .post('/posts')
        .send({ body: 'This is a test post' });

      expect(response.status).toBe(400);
    });

    it('should return a 400 if body is missing', async () => {
      const response = await request(app)
        .post('/posts')
        .send({ title: 'Test Post' });

      expect(response.status).toBe(400);
    });
  });

  describe('GET /posts/:id', () => {
    it('should return a post', async () => {
      const createdPost = await request(app).post('/posts').send(post);
      console.log(createdPost.body);
      const response = await request(app).get(`/posts/${createdPost.body.id}`);

      expect(response.status).toBe(200);
      expect(response.body.title).toBe(post.title);
      expect(response.body.body).toBe(post.body);
    });

    it('should return a 404 if post is not found', async () => {
      const response = await request(app).get(`/posts/${fakePostId}`);

      expect(response.status).toBe(404);
    });
  });

  describe('PUT /posts/:id', () => {
    it('should update a post', async () => {
      const createdPost = await request(app).post('/posts').send(post);

      const updatedPost = {
        title: 'Updated Test Post',
        body: 'This is an updated test post'
      };

      const response = await request(app)
        .put(`/posts/${createdPost.body.id}`)
        .send(updatedPost);

      expect(response.status).toBe(200);
      expect(response.body.title).toBe(updatedPost.title);
      expect(response.body.body).toBe(updatedPost.body);
    });

    it('should return a 404 error if the post does not exist', async () => {
      const response = await request(app).put(`/posts/${fakePostId}`).send(post);
      expect(response.status).toBe(404);
    });

    it('should return a 400 error if the request body is invalid', async () => {
      const createdPost = await request(app).post('/posts').send(post);

      const invalidPost = { title: '', body: '' }; // missing required fields
      const response = await request(app).put(`/posts/${createdPost.body.id}`).send(invalidPost);
      expect(response.status).toBe(400);
    });
  })

  describe('DELETE /posts/:id', () => {
    it('should delete an existing post', async () => {
      const createdPost = await request(app).post('/posts').send(post);
  
      const response = await request(app)
        .delete(`/posts/${createdPost.body.id}`)
        .send()
        .expect(204);
    });
  
    it('should return a 404 if the post is not found', async () => {
      const response = await request(app)
        .delete(`/posts/${fakePostId}`)
        .send()
        .expect(404);
  
      expect(response.body.errors[0].message).toEqual('Not Found');
    });
  });

})
