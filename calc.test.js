const request = require('supertest');
const express = require('express');
const app = require('./app');

describe('GET /mean', () => {
    it('calculates the mean correctly', async () => {
        const response = await request(app).get('/mean?nums=1,2,3,4,5');
        expect(response.status).toBe(200);
        expect(response.header['content-type']).toBe('application/json; charset=utf-8');
        expect(response.body).toEqual({
                operation: "mean",
                value: 3
            });
    });

    it('handles invalid number error', async () => {
        const response = await request(app).get('/mean?nums=foo,2,3');
        expect(response.status).toBe(400);
        expect(response.header['content-type']).toBe('application/json; charset=utf-8');
        expect(response.body).toEqual({
                operation: "mean",
                value: 'foo is not a number'
            });
    });

    it('handles null query error', async () => {
        const response = await request(app).get('/mean');
        expect(response.status).toBe(400);
        expect(response.header['content-type']).toBe('application/json; charset=utf-8');
        expect(response.body).toEqual({
                operation: "mean",
                value: 'nums are required'
            });
    });
});


describe('GET /median', () => {
    it('calculates the median correctly', async () => {
        const response = await request(app).get('/median?nums=1,2,3,4,5');
        expect(response.status).toBe(200);
        expect(response.header['content-type']).toBe('application/json; charset=utf-8');
        expect(response.body).toEqual({
            operation: "median",
            value: 3
        });
    });

    it('handles invalid number error', async () => {
        const response = await request(app).get('/median?nums=foo,2,3');
        expect(response.status).toBe(400);
        expect(response.header['content-type']).toBe('application/json; charset=utf-8');
        expect(response.body).toEqual({
            operation: "median",
            value: 'foo is not a number'
        });
    });

    it('handles null query error', async () => {
        const response = await request(app).get('/median');
        expect(response.status).toBe(400);
        expect(response.header['content-type']).toBe('application/json; charset=utf-8');
        expect(response.body).toEqual({
            operation: "median",
            value: 'nums are required'
        });
    });
});

describe('GET /mode', () => {
    it('calculates the mode correctly', async () => {
        const response = await request(app).get('/mode?nums=1,2,2,4,5');
        expect(response.status).toBe(200);
        expect(response.header['content-type']).toBe('application/json; charset=utf-8');
        expect(response.body).toEqual({
            operation: "mode",
            value: 2
        });
    });

    it('handles invalid number error', async () => {
        const response = await request(app).get('/mode?nums=foo,2,3');
        expect(response.status).toBe(400);
        expect(response.header['content-type']).toBe('application/json; charset=utf-8');
        expect(response.body).toEqual({
            operation: "mode",
            value: 'foo is not a number'
        });
    });

    it('handles null query error', async () => {
        const response = await request(app).get('/mode');
        expect(response.status).toBe(400);
        expect(response.header['content-type']).toBe('application/json; charset=utf-8');
        expect(response.body).toEqual({
            operation: "mode",
            value: 'nums are required'
        });
    });
});