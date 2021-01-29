require('dotenv').config();
const { expect } = require('chai');
const supertest = require('supertest');


process.env.NODE_ENV = 'test';
process.env.TEST_DB_URL = process.env.TEST_DB_URL || 'postgresql://dunder_mifflin@localhost/test_res_review';

global.expect = expect;
global.supertest = supertest;