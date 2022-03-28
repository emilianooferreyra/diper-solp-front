(function() {
    return angular.module('cursos-constant', [])
        .constant('CURSOS', {
            'odontopediatria': {
              id: 5,
              slug: 'odontopediatria',
              name: 'Odontopediatría',
              cursos: [],
              image: 'images/especialidad-curso/odontopediatria.jpg',
              order: 1,
              class: 'odontopediatria'
            },
            'endodoncia': {
              id: 3,
              slug: 'endodoncia',
              name: 'Endodoncia',
              cursos: [],
              image: 'images/especialidad-curso/endodoncia.jpg',
              order: 2,
              class: 'endodoncia'
            },
            'cirugia': {
              id: 2,
              slug: 'cirugia',
              name: 'Cirugía',
              cursos: [],
              image: 'images/especialidad-curso/cirugia.jpg',
              order: 3,
              class: 'cirugia'
            },
            'implantologia': {
              id: 12,
              slug: 'implantologia',
              name: 'Implantología',
              cursos: [],
              image: 'images/especialidad-curso/implantologia.jpg',
              order: 4,
              class: 'implantologia'
            },
            'protesis': {
              id: 13,
              slug: 'protesis',
              name: 'Prótesis',
              cursos: [],
              image: 'images/especialidad-curso/protesis.jpg',
              order: 5,
              class: 'protesis'
            },
            'periodoncia': {
              id: 7,
              slug: 'periodoncia',
              name: 'Periodoncia',
              cursos: [],
              image: 'images/especialidad-curso/periodoncia.jpg',
              order: 6,
              class: 'periodoncia'
            },
            'estomatologia': {
              id: 11,
              slug: 'estomatologia',
              name: 'Estomatología',
              cursos: [],
              image: 'images/especialidad-curso/estomatologia.jpg',
              order: 7,
              class: 'estomatologia'
            },
            'ortodoncia': {
              id: 9,
              slug: 'ortodoncia',
              name: 'Ortodoncia',
              cursos: [],
              image: 'images/especialidad-curso/ortodoncia.jpg',
              order: 8,
              class: 'ortodoncia'
            },
            'operatoria-dental': {
              id: 17,
              slug: 'operatoria-dental',
              name: 'Operatoria Dental',
              cursos: [],
              image: 'images/especialidad-curso/operatoria-dental.jpg',
              order: 9,
              class: 'operatoria'
            },
            'salud-publica': {
              id: 14,
              slug: 'salud-publica',
              name: 'Salud Pública',
              cursos: [],
              image: 'images/especialidad-curso/salud-publica.jpg',
              order: 10,
              class: 'salud'
            },
            'otros': {
              id: 99,
              slug: 'otros',
              name: 'Otros',
              cursos: [],
              image: 'images/especialidad-curso/otros.jpg',
              order: 11,
              class: 'otros'
            },
        });
})();
