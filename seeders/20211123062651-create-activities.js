'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

      await queryInterface.bulkInsert('Activities', [
        {
          name: 'Comedor Comunitario',
          content: 'Gracias al esfuerzo de todos los donantes, pudimos garantizar, hasta el momento, 2293 entregas de donaciones en 493 comedores y merenderos de todo el país. Desde entonces, llevamos distribuidos casi 710 toneladas de alimento y más de 153 mil artículos de higiene y limpieza.',
          image: 'https://s3.amazonaws.com/arc-wordpress-client-uploads/infobae-wp/wp-content/uploads/2016/07/02174140/Mes-de-la-Sopa-Solidaria-1920-3.jpg',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Recorridas por el barrio',
          content: 'Esta nueva organización por zonas, nos permite incluir nuevos voluntarios de manera paulatina y en sus barrios de origen. ¿De qué manera? Sumándolos a los grupos armados que ya tienen experiencia y, además, conocen a las personas que vamos a visitar en cada recorrida por el barrio.',
          image: 'https://www.unicef.org/argentina/sites/unicef.org.argentina/files/styles/hero_desktop/public/DSC_5372_0.JPG?itok=JKeN-a-h',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Apoyo escolar',
          content: 'Durante los últimos meses, decenas de voluntarios de todo el país participaron de las tareas de difusión y contacto con escuelas de zonas rurales o alejadas de los centros urbanos. Invitar a los jóvenes que estuvieran finalizando el secundario y que quisieran continuar estudiando',
          image: 'https://www.unicef.org/argentina/sites/unicef.org.argentina/files/styles/hero_desktop/public/UNI116793.jpg?itok=uVx7FLxT',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Guiso Solidario',
          content: 'A través de esta iniciativa, estaremos colaborando con platos de comida para 23 comedores de todo el país durante todo un mes. De este modo, haremos posible que cientos de chicos y sus familias puedan disfrutar de un plato caliente en sus mesas. Gracias.',
          image: 'https://www.diariosumario.com.ar/u/fotografias/fotosnoticias/2020/5/6/22591.jpg',
          createdAt: new Date(),
          updatedAt: new Date()
        }], {});
    },

  down: async (queryInterface, Sequelize) => {
  await queryInterface.bulkDelete('Activities', null, {});
  }
};
