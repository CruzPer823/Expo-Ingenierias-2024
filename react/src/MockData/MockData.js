// mockData.js
export const mockData = {
    user: {
      labels: ['Alumnos', 'Profesores', 'Jueces'],
      data: [30, 20, 50]
    },
    project: {
      labels: ['cat1', 'cat2', 'cat3', 'cat4', 'cat5', 'cat6'],
      data: [7, 2, 12, 9, 5, 6]
    },
    projectStatus: {
      labels: ['Revisado', 'Pendiente'],
      data: [35, 65]
    }
};

export const checklistItems = [
    { id: 1, text: 'Software for data collection and analysis (e.g., Excel, data analysis software)' },
    { id: 2, text: 'Plants or seeds for biology experiments' },
    { id: 3, text: 'Sensors (e.g., temperature sensors, light sensors)' },
    { id: 4, text: 'Model kits for biology, chemistry, physics, etc.' },
    { id: 5, text: 'Camera or smartphone for documentation' },
];

export const userTabledata = [
  { id: "A01", name: "Santos", roles: ["Profesor", "Juez"] },
  { id: "A02", name: "Gerry", roles: ["Alumno"] },
  { id: "A03", name: "Beto", roles: ["Juez", "Administrador"] },
  { id: "A04", name: "Cruz", roles: ["Profesor", "Administrador"] },
  { id: "A05", name: "Carlos", roles: ["Alumno"] },
  { id: "A06", name: "Sarai", roles: ["Profesor", "Juez"] },
  { id: "A07", name: "Hector", roles: ["Alumno"] },
  { id: "A08", name: "Marlon", roles: ["Profesor", "Juez", "Administrador"] },
  { id: "A09", name: "Juan", roles: ["Profesor"] },
  // Add more data as needed
];

export const judges = [
  {
    id:1,
    name: "Diego",
    profileImg: "user.png",
    interests: ["Nexus", "Cyber", "Bio"]
  },
  {
    id:2,
    name: "Gerry",
    profileImg: "user.png",
    interests: ["Cyber"]
  },
  {
    id:3,
    name: "Santiago",
    profileImg: "user.png",
    interests: ["Bio"]
  },
  {
    id:4,
    name: "Beto",
    profileImg: "user.png",
    interests: ["Nexus"],
  },
  {
    id:5,
    name: "Daniel",
    profileImg: "user.png",
    interests: ["Cyber", "Bio"],
  },
  {
    id:6,
    name: "Andrea",
    profileImg: "user.png",
    interests: ["Bio"]
  }
];

export const students = [
  {
    id: 1,
    name: "Sophia",
    profileImg: "user.png"
  },
  {
    id: 2,
    name: "Liam",
    profileImg: "user.png"
  },
  {
    id: 3,
    name: "Emma",
    profileImg: "user.png"
  },
  {
    id: 4,
    name: "Noah",
    profileImg: "user.png"
  },
  {
    id: 5,
    name: "Olivia",
    profileImg: "user.png"
  },
  {
    id: 6,
    name: "Jackson",
    profileImg: "user.png"
  },
  {
    id: 7,
    name: "Ava",
    profileImg: "user.png"
  },
  {
    id: 8,
    name: "Lucas",
    profileImg: "user.png"
  },
  {
    id: 9,
    name: "Isabella",
    profileImg: "user.png"
  },
  {
    id: 10,
    name: "William",
    profileImg: "user.png"
  }
];

export const professors = [
  {
    id: 1,
    name: "Professor Smith",
    profileImg: "user.png"
  },
  {
    id: 2,
    name: "Professor Johnson",
    profileImg: "user.png"
  },
  {
    id: 3,
    name: "Professor Williams",
    profileImg: "user.png"
  },
  {
    id: 4,
    name: "Professor Brown",
    profileImg: "user.png"
  },
  {
    id: 5,
    name: "Professor Jones",
    profileImg: "user.png"
  },
  {
    id: 6,
    name: "Professor Garcia",
    profileImg: "user.png"
  },
  {
    id: 7,
    name: "Professor Martinez",
    profileImg: "user.png"
  },
  {
    id: 8,
    name: "Professor Anderson",
    profileImg: "user.png"
  },
  {
    id: 9,
    name: "Professor Taylor",
    profileImg: "user.png"
  },
  {
    id: 10,
    name: "Professor Thomas",
    profileImg: "user.png"
  }
];



export const mockProjects = [
  {
    id: 1,
    title: "Healthcare System",
    review: true,
    img: "mockProject.jpeg",
    poster: "poster.jpg",
    video: "https://youtu.be/fFHlfbKVi30?si=L24uiVr-kFUA0eEP",
    description: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.",
    categories: ["Nexus", "Idea"],
    leader: 10 ,
    members: [1,7,5],
    teachers: [5,3],
    edition: "2023 - Fall",
    score: 4.3,
    isDisqualified: true
  },
  {
    id: 2,
    title: "Secure IoT Platform",
    review: false,
    img: "mockProject.jpeg",
    poster: "poster.jpg",
    video: "https://youtu.be/fFHlfbKVi30?si=L24uiVr-kFUA0eEP",
    description: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.",
    categories: ["Cyber", "Prototipo"],
    leader: 8 ,
    members: [10,4,9],
    teachers: [1,4],
    edition: "2023 - Spring",
    score: 3.7,
    isDisqualified: false
  },
  {
    id: 3,
    title: "Genetic Disease Prediction",
    review: true,
    img: "mockProject.jpeg",
    poster: "poster.jpg",
    video: "https://youtu.be/fFHlfbKVi30?si=L24uiVr-kFUA0eEP",
    description: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.",
    categories: ["Bio", "Idea"],
    leader: 2 ,
    members: [1,4,5],
    teachers: [7,9],
    edition: "2022 - Fall",
    score: 2.1,
    isDisqualified: false
  },
  {
    id: 4,
    title: "Blockchain Voting System",
    review: true,
    img: "mockProject.jpeg",
    poster: "poster.jpg",
    video: "https://youtu.be/fFHlfbKVi30?si=L24uiVr-kFUA0eEP",
    description: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.",
    categories: ["Nexus", "Prototipo"],
    leader: 9 ,
    members: [5,4,6],
    teachers: [1,6],
    edition: "2022 - Spring",
    score: 7.4,
    isDisqualified: true
  },
  {
    id: 5,
    title: "Autonomous Drone Control",
    review: false,
    img: "mockProject.jpeg",
    poster: "poster.jpg",
    video: "https://youtu.be/fFHlfbKVi30?si=L24uiVr-kFUA0eEP",
    description: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.",
    categories: ["Cyber", "Idea"],
    leader: 7 ,
    members: [1,2,3],
    teachers: [2,5],
    edition: "2021 - Fall",
    score: 5.8,
    isDisqualified: false
  },
  {
    id: 6,
    title: "Cancer Detection AI",
    review: true,
    img: "mockProject.jpeg",
    poster: "poster.jpg",
    video: "https://youtu.be/fFHlfbKVi30?si=L24uiVr-kFUA0eEP",
    description: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.",
    categories: ["Bio", "Idea"],
    leader: 5 ,
    members: [3,7,5],
    teachers: [4,8],
    edition: "2021 - Spring",
    score: 6.0,
    isDisqualified: false
  },
  {
    id: 7,
    title: "Smart Home Automation",
    review: false,
    img: "mockProject.jpeg",
    poster: "poster.jpg",
    video: "https://youtu.be/fFHlfbKVi30?si=L24uiVr-kFUA0eEP",
    description: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.",
    categories: ["Nexus", "Prototipo"],
    leader: 6 ,
    members: [9,10,2],
    teachers: [3,7],
    edition: "2021 - Fall",
    score: 6.1,
    isDisqualified: true
  },
  {
    id: 8,
    title: "E-commerce Platform",
    review: false,
    img: "mockProject.jpeg",
    poster: "poster.jpg",
    video: "https://youtu.be/fFHlfbKVi30?si=L24uiVr-kFUA0eEP",
    description: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.",
    categories: ["Cyber", "Idea"],
    leader: 3 ,
    members: [4,9,5],
    teachers: [1,2],
    edition: "2021 - Spring",
    score: 4.4,
    isDisqualified: false
  },
  {
    id: 9,
    title: "Drug Discovery AI",
    review: true,
    img: "mockProject.jpeg",
    poster: "poster.jpg",
    video: "https://youtu.be/fFHlfbKVi30?si=L24uiVr-kFUA0eEP",
    description: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.",
    categories: ["Bio", "Idea"],
    leader: 1 ,
    members: [10,5,7],
    teachers: [9,3],
    edition: "2022 - Spring",
    score: 5.2,
    isDisqualified: false
  },
  {
    id: 10,
    title: "Renewable Energy",
    review: false,
    img: "mockProject.jpeg",
    poster: "poster.jpg",
    video: "https://youtu.be/fFHlfbKVi30?si=L24uiVr-kFUA0eEP",
    description: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.",
    categories: ["Nexus", "Idea", "Prototipo"],
    leader: 4 ,
    members: [8,6,3],
    teachers: [10,4],
    edition: "2022 - Fall",
    score: 7.8,
    isDisqualified: false
  }
];

export const dropdownOptions = ["2023 - Fall", "2023 - Spring", "2022 - Fall", "2022 - Spring", "2021 - Fall", "2021 - Spring"];
