import {
  AiFillSafetyCertificate,
  AiFillSchedule,
  AiFillSnippets,
  AiFillRead,
  AiFillFund,
} from "react-icons/ai";
import { v4 as uuidv4 } from "uuid";

export const userServices = [
  {
    icon: AiFillSafetyCertificate,
    title: "সার্টিফিকেটের আবেদন",
    path: "newapplication",
    id: uuidv4(),
    tag: 0,
  },
  {
    icon: AiFillSchedule,
    title: "প্রশংসাপত্রের আবেদন",
    path: "newapplication",
    id: uuidv4(),
    tag: 1,
  },
  {
    icon: AiFillSnippets,
    title: "প্রত্যয়নপত্রের আবেদন (বর্তমান অধ্যয়নরতদের)",
    path: "prottoionforcurrent",
    id: uuidv4(),
    tag: 2,
  },
  {
    icon: AiFillRead,
    title: "প্রত্যয়নপত্রের আবেদন (পাসকৃতদের)",
    path: "prottoionforpassed",
    id: uuidv4(),
    tag: 3,
  },
  {
    icon: AiFillFund,
    title: "প্রত্যয়নপত্রের আবেদন (ড্যকুমেন্ট কারেকশনের জন্য)",
    path: "prottoionforcorrection",
    id: uuidv4(),
    tag: 4,
  },
];
