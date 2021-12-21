'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

     await queryInterface.bulkInsert('Testimonials', [
      {
      name: 'John Doe',
      content: 'Es un genio en lo suyo y por alguna razón se enteró de nuestras campañas, participó (porque por sobre todas las cosas, también tiene corazón) y necesitó saber más, ver en qué podía su cabeza analítica contribuir a la lógica de este sistema.',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNKM7AiEC1nqPR-sdwaLJZmbh8QAr4hiBLiQ&usqp=CAU',
      createdAt: new Date(),
      updatedAt: new Date()
      },
      {
        name: 'Joanne Ava',
        content: 'Tiene 41 años, es mamá de Clementina y profesora de Literatura, Castellano y Latín. También es inquieta, desordenadamente ordenada y emprendedora compulsiva. Memoriosa. Sufre de creatividad crónica y le gusta mucho escribir y comunicar.',
        image: 'https://tec.mx/sites/default/files/inline-images/laura-romero-premio-mujer-tec-2021.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
        }], {});
    
  },

  down: async (queryInterface, Sequelize) => {
     await queryInterface.bulkDelete('Testimonials', null, {});
     
  }
};
