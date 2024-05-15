import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { Logger } from 'winston';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { TestService } from './test.service';
import { TestModule } from './test.module';

describe('UserController', () => {
  let app: INestApplication;
  let logger: Logger;
  let testService: TestService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, TestModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    logger = app.get(WINSTON_MODULE_PROVIDER);
    testService = app.get(TestService);
  });

  describe('POST /api/users', () => {
    beforeEach(async () => {
      await testService.deleteUser()
    })


    it("should be rejected if request in invalid", async () => {
      const response = await request(app.getHttpServer())
        .post('/api/users')
        .send({
          username: '',
          password: '',
          name:''
      })
      
      expect(response.status).toBe(400);
      expect(response.body.errors).toBeDefined();

    })
    
    it("should be able to resgiter", async () => {
      const response = await request(app.getHttpServer())
        .post('/api/users')
        .send({
          username: 'test',
          password: 'test',
          name:'test'
      })
      
      expect(response.status).toBe(200);
      expect(response.body.data.username).toBe('test');
      expect(response.body.data.name).toBe('test');

    })

    it("should be rejected if username already exists", async () => {
      await testService.createuser();
      const response = await request(app.getHttpServer())
        .post('/api/users')
        .send({
          username: 'test',
          password: 'test',
          name:'test'
      })
      
      expect(response.status).toBe(400);
      expect(response.body.errors).toBeDefined();

    })


  })
  describe('POST /api/users/login', () => {
    beforeEach(async () => {
      await testService.deleteUser()
      await testService.createuser()
    })


    it("should be rejected if request in invalid", async () => {
      const response = await request(app.getHttpServer())
        .post('/api/users/login')
        .send({
          username: '',
          password: ''
      })
      
      expect(response.status).toBe(400);
      expect(response.body.errors).toBeDefined();

    })
    
    it("should be able to login", async () => {
      const response = await request(app.getHttpServer())
        .post('/api/users/login')
        .send({
          username: 'test',
          password: 'test'
      })
      
      expect(response.status).toBe(200);
      expect(response.body.data.username).toBe('test');
      expect(response.body.data.name).toBe('test');
      expect(response.body.data.token).toBeDefined();

    })

  })

  describe('GET /api/users/current', () => {
    beforeEach(async () => {
      await testService.deleteUser()
      await testService.createuser()
    })


    it("should be rejected if token in invalid", async () => {
      const response = await request(app.getHttpServer())
        .get('/api/users/current')
        .set('Authorization', 'wrong')
      expect(response.status).toBe(401);
      expect(response.body.errors).toBeDefined();

    })
    
    it("should be able to get user", async () => {
      const response = await request(app.getHttpServer())
        .get('/api/users/current')
        .set('Authorization', 'test')
      expect(response.status).toBe(200);
      expect(response.body.data.username).toBe('test');
      expect(response.body.data.name).toBe('test');

    })

  })

  describe('PATCH /api/users', () => {
    beforeEach(async () => {
      await testService.deleteUser()
      await testService.createuser()
    })


    it("should be rejected if request in invalid", async () => {
      const response = await request(app.getHttpServer())
        .patch('/api/users/current')
        .set('Authorization', 'test')
        .send({
          password: '',
          name:''
      })
      
      expect(response.status).toBe(400);
      expect(response.body.errors).toBeDefined();

    })
    
    it("should be able update name", async () => {
      const response = await request(app.getHttpServer())
        .patch('/api/users/current')
        .set('Authorization', 'test')
        .send({
          name:'test update'
      })
      
      expect(response.status).toBe(200);
      expect(response.body.data.username).toBe('test');
      expect(response.body.data.name).toBe('test update');

    })

    it("should be able update password", async () => {
      let response = await request(app.getHttpServer())
        .patch('/api/users/current')
        .set('Authorization', 'test')
        .send({
          password:'updated'
      })
      
      expect(response.status).toBe(200);
      expect(response.body.data.username).toBe('test');
      expect(response.body.data.name).toBe('test');

      response = await request(app.getHttpServer())
        .post('/api/users/login')
        .send({
          username:'test',
          password:'updated'
      })
      
      expect(response.status).toBe(200);
      expect(response.body.data.token).toBeDefined();

    })

  })

});
