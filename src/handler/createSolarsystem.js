
 'use strict'
 import {getPlanetSwapi} from '../services/planets/planetService';
 const AWS = require('aws-sdk');
 const uuid = require('uuid');
 
 const dynamoDb = new AWS.DynamoDB.DocumentClient();
 
 module.exports.createSolarsystem = (event, context, callback) => {
 
     const datetime = new Date().toISOString();
     const data = JSON.parse(event.body);
 
     if( typeof data.name !== 'string' ) {
         console.error('name is not a string');
         const response = {
             statusCode: 400,
             body: JSON.stringify({ "message":"name is not a string." })
         }
 
         return;
     }
     if( typeof data.idPlanet !== 'string' ) {
        console.error('idPlanet is not a string');
        const response = {
            statusCode: 400,
            body: JSON.stringify({ "message":"idPlanet is not a string." })
        }

        return;
    }
     const dataPlanetApi = getPlanetSwapi(data.idPlanet);
     const params = {
         TableName: 'solarsystem',
         Item: {
             id: uuid.v1(),
             nameSolarsystem: data.name,
             planet: {
                name:dataPlanetApi.name,
                rotation_period: dataPlanetApi.rotation_period,
                orbital_period:dataPlanetApi.orbital_period,
                climate:dataPlanetApi.climate,
                gravity:dataPlanetApi.gravity,
                surface_water:dataPlanetApi.surface_water,
                population:dataPlanetApi.population,
                residents:dataPlanetApi.residents
             },
             createdAt: datetime,
             updatedAt: datetime
         }
     };
 
     dynamoDb.put(params, (error, data) => {
         if(error) {
             console.error(error);
             callback(new Error(error));
             return;
         }
 
         const response = {
             statusCode: 201,
             body: JSON.stringify(data.Item)
         };
 
         callback(null, response);
     });
 }