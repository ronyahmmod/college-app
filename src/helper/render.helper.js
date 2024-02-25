export const up = (text) => text.toUpperCase();
export const low = (text) => text.toLowerCase();

export const renderResultType = (type) => {
  switch (type) {
    case "cgpaOfFour":
      return "CGPA (out of 4)";
    case "gpaOfFive":
      return "GPA (out of 5)";
    case "class":
      return "CLASS";
    case "division":
      return "DIVISION";
    default:
      return "N/A";
  }
};

export const renderGroup = (group, lang) => {
  switch (true) {
    case group === "sc" && lang === "bn":
      return "বিজ্ঞান বিভাগ";
    case group === "hu" && lang === "bn":
      return "মানবিক বিভাগ";
    case group === "bs" && lang === "bn":
      return "ব্যবসায় শিক্ষা বিভাগ";
    case group === "ba" && lang === "bn":
      return "বিএ কোর্স";
    case group === "bss" && lang === "bn":
      return "বিএসএস কোর্স";
    case group === "bbs" && lang === "bn":
      return "বিবিএস";
    case group === "pol" && lang === "bn":
      return "রাষ্ট্রবিজ্ঞান বিভাগ";
    case group === "ban" && lang === "bn":
      return "বাংলা বিভাগ";
    case group === "hrm" && lang === "bn":
      return "মানব সম্পদ উন্নয়ন ট্রেড";
    case group === "co" && lang === "bn":
      return "কম্পিউটার অপারেশন ট্রেড";
    case group === "sec" && lang === "bn":
      return "সেক্রেটারিয়েল সায়েন্স";
    case group === "sc":
      return "SCIENCE";
    case group === "hu":
      return "HUMANITIES";
    case group === "bs":
      return "BUSINESS STUDIES";
    case group === "ba":
      return "BACHELOR OF ARTS";
    case group === "bss":
      return "BACHELOR OF SOCIAL SCIENCE";
    case group === "bbs":
      return "BACHELOR OF BUSINESS STUDIES";
    case group === "pol":
      return "BACHELOR OF SOCIAL SCIENCE (HONS) IN POLITICAL SCIENCE";
    case group === "ban":
      return "BACHELOR OF ARTS (HONS) IN BANGLA";
    case group === "hrm":
      return "HUMAN RESOURCE MANAGEMENT";
    case group === "co":
      return "COMPUTER OPERATION";
    case group === "sec":
      return "SECRETERIAL SCIENCE";
    case group === "dtb":
      return "DIGITAL TECHNOLOGY IN BUSINESS";
    case group === "hrd":
      return "HUMAN RESOURCE DEVELOPMENT";
    default:
      return "N/A";
  }
};

export const renderExamination = (exam, lang) => {
  switch (true) {
    case exam === "hsc" && lang === "bn":
      return "উচ্চ মাধ্যমিক";
    case exam === "degree" && lang === "bn":
      return "স্নাতক (পাস)";
    case exam === "honours" && lang === "bn":
      return "স্নাতক (সম্মান)";
    case exam === "bm" && lang === "bn":
      return "উচ্চ মাধ্যমিক (বিএম)";
    case exam === "bou" && lang === "bn":
      return "বাংলাদেশ উন্মুক্ত বিশ্ববিদ্যালয় অধীন";
    case exam === "ssc":
      return "SECONDARY SCHOOL CERTIFICATION";
    case exam === "hsc":
      return "HIGHER SECONDARY CERTIFICATE";
    case exam === "degree":
      return "DEGREE PASS & CERTIFICATE COURSE";
    case exam === "honours":
      return "BACHELOR OF HONOURS";
    case exam === "bm":
      return "BUSINESS MANAGEMENT";
    case exam === "bou":
      return "BANGLADESH OPEN UNIVERSITY";
    default:
      return exam.toUpperCase();
  }
};
export const renderGenderText = (gender, str) => {
  if (gender === "male" && Boolean(!str)) {
    return "He";
  } else if (gender === "female" && !str) {
    return "She";
  } else if (gender === "other" && !str) {
    return "He";
  } else if (gender === "male" && Boolean(str === true)) {
    return "him";
  } else if (gender === "female" && str) {
    return "her";
  } else {
    return "He/Her";
  }
  // switch (gender, str) {
  //   case "male":
  //     return "He";
  //   case "female":
  //     return "She";
  //   case "other":
  //     return "He";
  //   case 'male':
  //   case str: return 'him'
  //   case 'female':
  //   case str: return 'her'
  //   default:
  //     return "He";
  // }
};

export const renderGroupText = (group) => {
  switch (group) {
    case "sc":
    case "hu":
    case "bs":
      return "group";
    case "ba":
    case "bss":
    case "bbs":
      return "course";
    case "pol":
    case "ban":
      return "subject";
    case "hrm":
    case "co":
    case "dtb":
    case "hrd":
      return "trade";
    default:
      return "group";
  }
};

export const generateQRCodeText = (app) => {
  if (app)
    return `It is to certify that ${app.name.toUpperCase()}, father name: ${app.fatherName.toUpperCase()}, mother name: ${app.motherName.toUpperCase()}.${renderGenderText(
      app.gender
    )} has been passed ${
      app.lastExamName && app.lastExamName.toUpperCase()
    } on ${(app.passingYear && app.passingYear) || "N/A"}. ${renderGenderText(
      app.gender
    )} bearing roll: ${
      (app.roll && app.roll) || app.classRoll
    }, registration: ${
      (app.registration && app.registration) || "N/A"
    }. ${renderGenderText(app.gender)} has gained ${
      app.result && app.result
    } ${renderResultType(
      (app.resultType && app.resultType) || "N/A"
    )} on ${renderGroup(app.group)} ${renderGroupText(
      app.group
    )}. I wish your life best. This document is generated by Jibannagar Degree College. You may verify.`;
};

export const renderApplicationType = (appType) => {
  switch (appType) {
    case "certificate":
      return "Certificate";
    case "testimonial":
      return "Testimonial";
    case "certificate-testimonial":
      return "Both Certificate & Testimonial";
    case "psis":
      return "Prottoion For Correction";
    case "pscs":
      return "Prottoion For Present Student";
    case "psps":
      return "Prottoion For Passed Student";
    default:
      return "Not assigned";
  }
};
