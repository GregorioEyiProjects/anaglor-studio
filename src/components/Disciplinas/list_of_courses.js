// src/components/Disciplinas/list_of_courses.js

const LIST_OF_COURSES = [
  {
    id: 1,
    name: "Pilates Máquina",
    icon: "🌀",
    description:
      "Fuerza, alineación postural y movilidad articular con Reformer. Trabajo personalizado para todos los grupos musculares.",
    numberOfClasses: [
      {
        label: "4 clases/mes",
        price: 95,
      },
      {
        label: "8 clases/mes",
        price: 160,
      },
      {
        label: "10 clases/mes",
        price: 195,
      },
      {
        label: "1 clase",
        price: 25,
      },
    ],
  },
  {
    id: 2,
    name: "Pilates Aéreo",
    icon: "🪢",
    description:
      "Fuerza, movilidad y alineación postural con hamaca aérea. Flexibilidad, core y coordinación con un toque acrobático.",
    numberOfClasses: [
      {
        label: "4 clases/mes",
        price: 95,
      },
      {
        label: "8 clases/mes",
        price: 160,
      },
      {
        label: "10 clases/mes",
        price: 195,
      },
      {
        label: "1 clase",
        price: 25,
      },
    ],
  },
  {
    id: 3,
    name: "Barre",
    icon: "🩰",
    description:
      "Inspirado en rutinas de bailarines. Combina fuerza, flexibilidad y equilibrio para alargar y tonificar elegantemente.",
    numberOfClasses: [
      {
        label: "4 clases/mes",
        price: 75,
      },
      {
        label: "8 clases/mes",
        price: 120,
      },
      {
        label: "1 clase",
        price: 25,
      },
    ],
  },
  {
    id: 4,
    name: "Entrenamiento Funcional",
    icon: "✦",
    description:
      "Movimientos completos y dinámicos que fortalecen el cuerpo de manera integral. Agilidad, coordinación y control.",
    numberOfClasses: [
      {
        label: "4 clases/mes",
        price: 75,
      },
      {
        label: "8 clases/mes",
        price: 120,
      },
      {
        label: "1 clase",
        price: 25,
      },
    ],
  },
  /* {
    id: 5,
    name: "Aro Aéreo",
    icon: "⭕",
    description:
      "Disciplina acrobática de fuerza, técnica y expresión corporal suspendido en un aro. Estabilidad y confianza.",
    numberOfClasses: [
      {
        label: "4 clases/mes",
        price: 80,
      },
    ],
  }, */
  {
    id: 6,
    name: "Clases Privadas",
    icon: "✦",
    description:
      "Personalizadas según tus objetivos. Disponibles para embarazadas. Diferentes enfoques de movimiento.",
    numberOfClasses: [
      {
        label: "1 clase",
        price: 60,
      },
      {
        label: "4 clases/mes",
        price: 220,
      },
      {
        label: "8 clases/mes",
        price: 400,
      },
    ],
  },
];

export default LIST_OF_COURSES;
