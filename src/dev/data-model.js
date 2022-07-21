// Modeling User Table
// ----------------------

export const User = {
  id: "string",
  email: "string",
  password: "string",
  createdAt: "Timestamp",
  updateAt: "Timestamp",
  photoUrl: "string",
  role: "Enum [Super, Admin, User]",
  active: false,
  name: "striing",
  nid: "string",
  mobile: "string",
  lastLoggedIn: "Timestamp",
  lastLoggedOut: "Timestamp",
  locked: false,
};

const application = {
  roll: "",
  registration: "",
  board: "",
  passingYear: "",
  date: "Timestamp",
  releaseDate: "Timestamp",
  studentId: "",
  status: "",
  remarks: "",
  approvedBy: "admin",
  category: "testimonial",
  files: [],
};
