'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

      await queryInterface.bulkInsert('Activities', [
        {
          name: 'Comedor Comunitario',
          content: 'Gracias al esfuerzo de todos los donantes, pudimos garantizar, hasta el momento, 2293 entregas de donaciones en 493 comedores y merenderos de todo el país. Desde entonces, llevamos distribuidos casi 710 toneladas de alimento y más de 153 mil artículos de higiene y limpieza.',
          image: 'https://cohorte-octubre-e8bd4748.s3.amazonaws.com/media/c48adbad-e605-4703-8ef7-b6d76822d083.jpg',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Recorridas por el barrio',
          content: 'Esta nueva organización por zonas, nos permite incluir nuevos voluntarios de manera paulatina y en sus barrios de origen. ¿De qué manera? Sumándolos a los grupos armados que ya tienen experiencia y, además, conocen a las personas que vamos a visitar en cada recorrida por el barrio.',
          image: 'https://cohorte-octubre-e8bd4748.s3.amazonaws.com/media/0846df8e-4fc0-4987-b61c-0e16c4cb5975.jpg',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Apoyo escolar',
          content: 'Durante los últimos meses, decenas de voluntarios de todo el país participaron de las tareas de difusión y contacto con escuelas de zonas rurales o alejadas de los centros urbanos. Invitar a los jóvenes que estuvieran finalizando el secundario y que quisieran continuar estudiando',
          image: 'https://cohorte-octubre-e8bd4748.s3.amazonaws.com/media/4c509c35-6f8a-48aa-ae0f-953de809cf5d.jpg',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Guiso Solidario',
          content: 'A través de esta iniciativa, estaremos colaborando con platos de comida para 23 comedores de todo el país durante todo un mes. De este modo, haremos posible que cientos de chicos y sus familias puedan disfrutar de un plato caliente en sus mesas. Gracias.',
          image: 'https://cohorte-octubre-e8bd4748.s3.amazonaws.com/media/6e7180ba-ae2b-4173-8838-d3557ce1d17f.jpg',
          createdAt: new Date(),
          updatedAt: new Date()
        }], {});
    },

  down: async (queryInterface, Sequelize) => {
  await queryInterface.bulkDelete('Activities', null, {});
  }
};
