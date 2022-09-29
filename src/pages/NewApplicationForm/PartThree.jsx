import React from "react";
import {
  Box,
  Typography,
  Divider,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  TextField,
} from "@mui/material";

import { Constrains } from "./Types";
import { useContext } from "react";
import ApplicationContext from "../../context/ApplicationContext";
import PartProttoion from "./PartProttoion";
import { useFormik } from "formik";

const PartThree = React.memo(() => {
  // FORM PART-2 STATE
  const formState = useFormik({
    initialValues: {
      presentClass: Constrains.presentClass.HSC,
      presentClassRoll: "",
      presentGroup: Constrains.group.HUMANITIES,
      presentSession: "",
      presentAcademicYear: Constrains.academicYear.XI,
      lastExamClass: Constrains.presentClass.HSC,
      lastExamRoll: "",
      lastExamRegistration: "",
      lastExamYear: "",
      lastExamGroup: Constrains.group.HUMANITIES,
      lastExamBoard: Constrains.board.JESSORE,
      lastExamResultType: Constrains.resultType.GPA_OUT_OF_FIVE,
      lastExamResult: "",
    },
  });
  // END OF FORM PART-2 STATE
  const {
    presentClass,
    presentClassRoll,
    presentGroup,
    presentSession,
    presentAcademicYear,
    lastExamClass,
    lastExamRoll,
    lastExamRegistration,
    lastExamYear,
    lastExamGroup,
    lastExamBoard,
    lastExamResultType,
    lastExamResult,
  } = formState.values;
  const { handleChange } = formState;
  const { state } = useContext(ApplicationContext);
  console.log("Part three re render");
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      {/* READING CLASS */}
      {state.reading && (
        <>
          <Typography sx={{ pl: 2 }}>বর্তমান শ্রেণির তথ্যাদি</Typography>
          <Divider />
          <FormControl fullWidth required>
            <InputLabel id="present-class-label">
              বর্তমান শ্রেণি নির্বাচন করুন
            </InputLabel>
            <Select
              labelId="present-class-label"
              label="বর্তমান শ্রেণি নির্বাচন করুন"
              name="presentClass"
              value={presentClass}
              onChange={handleChange}
            >
              <MenuItem value={Constrains.presentClass.HSC}>HSC</MenuItem>
              <MenuItem value={Constrains.presentClass.HSCBM}>HSC BM</MenuItem>
              <MenuItem value={Constrains.presentClass.HSCBOU}>
                HSC BOU
              </MenuItem>
              <MenuItem value={Constrains.presentClass.DEGREE}>DEGREE</MenuItem>
              <MenuItem value={Constrains.presentClass.DEGREEBOU}>
                DEGREE BOU
              </MenuItem>
              <MenuItem value={Constrains.presentClass.HONOURS}>
                HONOURS
              </MenuItem>
            </Select>
          </FormControl>

          <TextField
            name="presentClassRoll"
            id="presentClassRoll"
            label=" বর্তমান শ্রেণির ক্লাস রোল"
            placeholder="ক্লাস রোল প্রদান করুন"
            fullWidth
            required
            value={presentClassRoll}
            onChange={handleChange}
          />

          <FormControl fullWidth required>
            <InputLabel id="present-group-label">
              বর্তমান গ্রুপ/সাবজেক্ট/ট্রেড নির্বাচন করুন
            </InputLabel>
            <Select
              labelId="present-group-label"
              label="বর্তমান গ্রুপ/সাবজেক্ট/ট্রেড নির্বাচন করুন"
              name="presentGroup"
              value={presentGroup}
            >
              <MenuItem value={Constrains.group.SCIENCE}>SCIENCE</MenuItem>
              <MenuItem value={Constrains.group.BUSINESS_STUDIES}>
                BUSINESS STUDIES
              </MenuItem>
              <MenuItem value={Constrains.group.HUMANITIES}>
                HUMANITIES
              </MenuItem>
              <MenuItem value={Constrains.group.COMPUTER_OPERATION}>
                COMPUTER OPERATION
              </MenuItem>
              <MenuItem value={Constrains.group.SECRETERIAL_SCIENCE}>
                SECRETERIAL SCIENCE
              </MenuItem>
              <MenuItem value={Constrains.group.DIGITAL_TECHNOLOGY}>
                DIGITAL TECHNOLOGY
              </MenuItem>
              <MenuItem value={Constrains.group.HUMAN_RESOURCE_MANAGEMENT}>
                HUMAN RESOURCE MANAGEMENT
              </MenuItem>
              <MenuItem value={Constrains.group.BOU_HUMANITIES}>
                BOU HUMANITIES
              </MenuItem>
              <MenuItem value={Constrains.group.BA}>BA</MenuItem>
              <MenuItem value={Constrains.group.BSS}>BSS</MenuItem>
              <MenuItem value={Constrains.group.BBS}>BBS</MenuItem>
              <MenuItem value={Constrains.group.BOU_BA_BSS}>
                BOU BA/BBS
              </MenuItem>
              <MenuItem value={Constrains.group.BANGLA}>BANGLA</MenuItem>
              <MenuItem value={Constrains.group.POLITICAL_SCIENCE}>
                POLITICAL SCIENCE
              </MenuItem>
            </Select>
          </FormControl>

          <TextField
            name="presentSession"
            id="presentSession"
            placeholder="বর্তমান শ্রেণির শিক্ষাবর্ষ"
            label="বর্তমান শ্রেণির শিক্ষাবর্ষ"
            helperText="Example: 2019-2020"
            required
            fullWidth
            value={presentSession}
            onChange={handleChange}
          />

          <FormControl fullWidth required>
            <InputLabel id="present-academic-year-label">
              বর্তমান এ্যাকাডেমিক বর্ষ
            </InputLabel>
            <Select
              name="presentAcademicYear"
              labelId="present-academic-year-label"
              label="বর্তমান এ্যাকাডেমিক বর্ষ"
              value={presentAcademicYear}
              onChange={handleChange}
            >
              <MenuItem value={Constrains.academicYear.XI}>XI</MenuItem>
              <MenuItem value={Constrains.academicYear.XII}>XII</MenuItem>
              <MenuItem value={Constrains.academicYear.FIRST_YEAR}>
                1ST
              </MenuItem>
              <MenuItem value={Constrains.academicYear.SECOND_YEAR}>
                2ND
              </MenuItem>
              <MenuItem value={Constrains.academicYear.THIRD_YEAR}>
                3RD
              </MenuItem>
              <MenuItem value={Constrains.academicYear.FOURTH_YEAR}>
                4TH
              </MenuItem>
            </Select>
          </FormControl>
        </>
      )}

      {/* LAST EXAM SECTION */}
      {state.passed && (
        <>
          <Divider />
          <Typography sx={{ pl: 2 }}>সর্বশেষ পরীক্ষার তথ্যাদি</Typography>
          <Divider />
          <FormControl fullWidth required>
            <InputLabel id="last-exam-class-label">
              সর্বশেষ পরীক্ষার শ্রেণি নির্বাচন করুন
            </InputLabel>
            <Select
              labelId="last-exam-class-label"
              label="সর্বশেষ পরীক্ষার শ্রেণি নির্বাচন করুন"
              name="lastExamClass"
              value={lastExamClass}
              onChange={handleChange}
            >
              <MenuItem value={Constrains.presentClass.HSC}>HSC</MenuItem>
              <MenuItem value={Constrains.presentClass.HSCBM}>HSC BM</MenuItem>
              <MenuItem value={Constrains.presentClass.HSCBOU}>
                HSC BOU
              </MenuItem>
              <MenuItem value={Constrains.presentClass.DEGREE}>DEGREE</MenuItem>
              <MenuItem value={Constrains.presentClass.DEGREEBOU}>
                DEGREE BOU
              </MenuItem>
              <MenuItem value={Constrains.presentClass.HONOURS}>
                HONOURS
              </MenuItem>
            </Select>
          </FormControl>
          <TextField
            name="lastExamRoll"
            id="lastExamRoll"
            label="সর্বশেষ পরীক্ষার রোল"
            placeholder="সর্বশেষ পরীক্ষার রোল"
            required
            fullWidth
            value={lastExamRoll}
            onChange={handleChange}
          />
          <TextField
            name="lastRegistration"
            id="lastRegistration"
            label="সর্বশেষ পরীক্ষার রেজিস্ট্রেশন"
            placeholder="সর্বশেষ পরীক্ষার রেজিস্ট্রেশন"
            required
            fullWidth
            value={lastExamRegistration}
            onChange={handleChange}
          />
          <TextField
            name="lastExamYear"
            id="lastExamYear"
            label="পাশের বছর"
            placeholder="পাশের বছর"
            helperText="Example: 2010"
            required
            fullWidth
            value={lastExamYear}
            onChange={handleChange}
          />
          <FormControl fullWidth required>
            <InputLabel id="last-exam-group-label">
              গ্রুপ/সাবজেক্ট/ট্রেড নির্বাচন করুন
            </InputLabel>
            <Select
              labelId="last-exam-group-label"
              label="গ্রুপ/সাবজেক্ট/ট্রেড নির্বাচন করুন"
              name="lastExamGroup"
              value={lastExamGroup}
              onChange={handleChange}
            >
              <MenuItem value={Constrains.group.SCIENCE}>SCIENCE</MenuItem>
              <MenuItem value={Constrains.group.BUSINESS_STUDIES}>
                BUSINESS STUDIES
              </MenuItem>
              <MenuItem value={Constrains.group.HUMANITIES}>
                HUMANITIES
              </MenuItem>
              <MenuItem value={Constrains.group.COMPUTER_OPERATION}>
                COMPUTER OPERATION
              </MenuItem>
              <MenuItem value={Constrains.group.SECRETERIAL_SCIENCE}>
                SECRETERIAL SCIENCE
              </MenuItem>
              <MenuItem value={Constrains.group.DIGITAL_TECHNOLOGY}>
                DIGITAL TECHNOLOGY
              </MenuItem>
              <MenuItem value={Constrains.group.HUMAN_RESOURCE_MANAGEMENT}>
                HUMAN RESOURCE MANAGEMENT
              </MenuItem>
              <MenuItem value={Constrains.group.BOU_HUMANITIES}>
                BOU HUMANITIES
              </MenuItem>
              <MenuItem value={Constrains.group.BA}>BA</MenuItem>
              <MenuItem value={Constrains.group.BSS}>BSS</MenuItem>
              <MenuItem value={Constrains.group.BBS}>BBS</MenuItem>
              <MenuItem value={Constrains.group.BOU_BA_BSS}>
                BOU BA/BBS
              </MenuItem>
              <MenuItem value={Constrains.group.BANGLA}>BANGLA</MenuItem>
              <MenuItem value={Constrains.group.POLITICAL_SCIENCE}>
                POLITICAL SCIENCE
              </MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth required>
            <InputLabel id="last-exam-board-label">
              বোর্ড/বিশ্ববিদ্যালয় নির্বাচন করুন
            </InputLabel>
            <Select
              labelId="last-exam-board-label"
              label="বোর্ড/বিশ্ববিদ্যালয় নির্বাচন করুন"
              name="lastExamBoard"
              value={lastExamBoard}
              onChange={handleChange}
            >
              <MenuItem value={Constrains.board.JESSORE}>JESSORE</MenuItem>
              <MenuItem value={Constrains.board.TECHNICAL}>TECHNICAL</MenuItem>
              <MenuItem value={Constrains.board.NATIONAL_UNIVERSITY}>
                NATIONAL UNIVERSITY
              </MenuItem>
              <MenuItem value={Constrains.board.OPEN_UNIVERSITY}>
                OPEN UNIVERSITY
              </MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth required>
            <InputLabel id="last-exam-result-type-label">
              ফলাফলের ধরণ নির্বাচন করুন
            </InputLabel>
            <Select
              labelId="last-exam-result-type-label"
              label="ফলাফলের ধরণ নির্বাচন করুন"
              name="lastExamResultType"
              value={lastExamResultType}
              onChange={handleChange}
            >
              <MenuItem value={Constrains.resultType.GPA_OUT_OF_FIVE}>
                GPA OUT OF 5
              </MenuItem>
              <MenuItem value={Constrains.resultType.CGPA_OUT_OF_FOUR}>
                CGPA OUT OF 4
              </MenuItem>
              <MenuItem value={Constrains.resultType.CLASS}>CLASS</MenuItem>
              <MenuItem value={Constrains.resultType.DIVISION}>
                DIVISION
              </MenuItem>
            </Select>
          </FormControl>

          <TextField
            name="lastExamResult"
            id="lastExamResult"
            placeholder="পরীক্ষার ফলাফল"
            label="পরীক্ষার ফলাফল"
            required
            fullWidth
            value={lastExamResult}
            onChange={handleChange}
          />
        </>
      )}

      {state.applicationTypes.some(
        (applicationType) =>
          applicationType === Constrains.applicationType.PROTTOION
      ) && <PartProttoion />}
    </Box>
  );
});

export default PartThree;
