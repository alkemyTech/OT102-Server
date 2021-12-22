'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

     await queryInterface.bulkInsert('Entries', [
       {
       name: 'Derechos infantiles',
       content: 'Gracias al esfuerzo de todos los donantes, pudimos garantizar, hasta el momento, 2293 entregas de donaciones en 493 comedores y merenderos de todo el país. Desde entonces, llevamos distribuidos alimento y artículos de higiene y limpieza.',
       image: 'https://www.unicef.org/argentina/sites/unicef.org.argentina/files/styles/press_release_feature/public/DeclaracioHenrietta.jpg?itok=j4DT4DR_',
       categoryId: 1,
       type: 'news',
       createdAt: new Date(),
       updatedAt: new Date()
      },
      {
        name: 'Inclusion social',
        content: 'Hoy, no logran cubrir sus necesidades alimentarias y otros bienes básicos. ​Sumate a nosotros para contribuir a que no se enfermen, reciban una alimentación adecuada, educación y tengan garantizados sus derechos.',
        image: 'https://www.unicef.org/argentina/sites/unicef.org.argentina/files/styles/hero_desktop/public/NNA_05_0.jpg?itok=qNlHzu2B',
        categoryId: 1,
        type: 'news',
        createdAt: new Date(),
        updatedAt: new Date()
       },
       {
        name: 'Los chicos te necesitan',
        content: 'Niños y niñas que asisten a comedores comunitarios no solo entregándoles una mochila nueva y completísima para el inicio de clases, sino también a través del desarrollo de un hermoso y permanente proyecto literario y educativo.',
        image: 'https://s3.amazonaws.com/arc-wordpress-client-uploads/infobae-wp/wp-content/uploads/2016/07/02174140/Mes-de-la-Sopa-Solidaria-1920-3.jpg',
        categoryId: 1,
        type: 'news',
        createdAt: new Date(),
        updatedAt: new Date()
       },
       {
        name: 'Frenemos el Covid',
        content: 'La información de la que podemos fiarnos es la que se basa en las pruebas científicas. Seguiremos compartiendo las últimas noticias, para estar informado sobre las mejores formas de protegerte a vos y a tu familia.',
        image: 'https://www.unicef.org/argentina/sites/unicef.org.argentina/files/styles/media_banner/public/2020-03/UNI310746-header.jpg?itok=njjDs_VQ',
        categoryId: 1,
        type: 'news',
        createdAt: new Date(),
        updatedAt: new Date()
       },
       {
        name: 'Muestra Artistica solidaria',
        content: 'Gracias al esfuerzo de todos los donantes, pudimos garantizar, hasta el momento, 2293 entregas de donaciones en 493 comedores y merenderos de todo el país. Desde entonces, llevamos distribuidos casi 710 toneladas de alimento y más de 153 mil artículos de higiene y limpieza.',
        image: 'https://s3.amazonaws.com/arc-wordpress-client-uploads/infobae-wp/wp-content/uploads/2016/07/02174140/Mes-de-la-Sopa-Solidaria-1920-3.jpg',
        categoryId: 2,
        type: 'events',
        createdAt: new Date(),
        updatedAt: new Date()
       },], {});
    
  },

  down: async (queryInterface, Sequelize) => {
     await queryInterface.bulkDelete('Entries', null, {});
  }
};
