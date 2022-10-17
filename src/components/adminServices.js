import {
  FaUserPlus,
  FaUserMinus,
  FaUserFriends,
  FaUsers,
  FaPrint,
  FaCompressAlt,
} from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";

export const adminServices = [
  {
    icon: FaUserPlus,
    title: "Student Registration Form",
    path: "student-reg-form",
    id: uuidv4(),
    tag: 0,
  },
  {
    icon: FaUserMinus,
    title: "Delete Student",
    path: "delete-student",
    id: uuidv4(),
    tag: 1,
  },
  {
    icon: FaUserFriends,
    title: "All Students",
    path: "all-students",
    id: uuidv4(),
    tag: 2,
  },
  {
    icon: FaUsers,
    title: "Voter List Selection",
    path: "voter-list",
    id: uuidv4(),
    tag: 3,
  },
  {
    icon: FaPrint,
    title: "Print Voter List",
    path: "print-voter-list",
    id: uuidv4(),
    tag: 4,
  },
  {
    icon: FaCompressAlt,
    title: "Delete Application",
    path: "delete-application",
    id: uuidv4(),
    tag: 5,
  },
];
