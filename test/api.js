const request = require('supertest');
const chai = require('chai');
const app = require('../dist/app');

describe('testing mocha', function() {
    it('should respond with true', function() {
        chai.expect(true).to.be.false;
    });
});