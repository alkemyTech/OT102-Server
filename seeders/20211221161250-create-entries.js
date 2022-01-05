'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

     await queryInterface.bulkInsert('Entries', [
       {
       name: 'Derechos infantiles',
       content: 'Gracias al esfuerzo de todos los donantes, pudimos garantizar, hasta el momento, 2293 entregas de donaciones en 493 comedores y merenderos de todo el país. Desde entonces, llevamos distribuidos alimento y artículos de higiene y limpieza.',
       image: 'https://cohorte-octubre-e8bd4748.s3.amazonaws.com/media/bed3a8b0-d07f-419a-bc00-c5adb934e3e8.jpg',
       categoryId: 1,
       type: 'news',
       createdAt: new Date(),
       updatedAt: new Date()
      },
      {
        name: 'Inclusion social',
        content: 'Hoy, no logran cubrir sus necesidades alimentarias y otros bienes básicos. ​Sumate a nosotros para contribuir a que no se enfermen, reciban una alimentación adecuada, educación y tengan garantizados sus derechos.',
        image: 'https://cohorte-octubre-e8bd4748.s3.amazonaws.com/media/c90c9513-7721-4a9a-b945-56a8430aa8ab.jpg',
        categoryId: 1,
        type: 'news',
        createdAt: new Date(),
        updatedAt: new Date()
       },
       {
        name: 'Los chicos te necesitan',
        content: 'Niños y niñas que asisten a comedores comunitarios no solo entregándoles una mochila nueva y completísima para el inicio de clases, sino también a través del desarrollo de un hermoso y permanente proyecto literario y educativo.',
        image: 'https://cohorte-octubre-e8bd4748.s3.amazonaws.com/media/fd2624ce-32be-4075-85aa-a5e869aa0c7a.jpg',
        categoryId: 1,
        type: 'news',
        createdAt: new Date(),
        updatedAt: new Date()
       },
       {
        name: 'Frenemos el Covid',
        content: 'La información de la que podemos fiarnos es la que se basa en las pruebas científicas. Seguiremos compartiendo las últimas noticias, para estar informado sobre las mejores formas de protegerte a vos y a tu familia.',
        image: 'https://cohorte-octubre-e8bd4748.s3.amazonaws.com/media/eb853b62-d71b-4712-9917-383ec2e3c9e2.jpg',
        categoryId: 1,
        type: 'news',
        createdAt: new Date(),
        updatedAt: new Date()
       },
       {
        name: 'Muestra Artistica solidaria',
        content: 'Gracias al esfuerzo de todos los donantes, pudimos garantizar, hasta el momento, 2293 entregas de donaciones en 493 comedores y merenderos de todo el país. Desde entonces, llevamos distribuidos casi 710 toneladas de alimento y más de 153 mil artículos de higiene y limpieza.',
        image: 'https://cohorte-octubre-e8bd4748.s3.amazonaws.com/media/c48adbad-e605-4703-8ef7-b6d76822d083.jpg',
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
