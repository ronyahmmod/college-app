import React from "react";
import Layout from "./Layout";
import {
  Alert,
  Box,
  Container,
  Typography,
  Avatar,
  Divider,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@mui/material";
import CollegeLogoURL from "../assets/logos/college-logo.png";
import { grey } from "@mui/material/colors";
import { format } from "date-fns";
import {
  renderExamination,
  renderGroup,
  renderResultType,
  up,
  generateQRCodeText,
} from "../helper/render.helper";
import QRCode from "react-qr-code";
// import TestimonialPatternURL from "../assets/logos/testimonial-pat.jpg";

const DocHeader = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Avatar src={CollegeLogoURL} alt={CollegeLogoURL} />
      </Box>

      <Box sx={{ display: "flex", flexWrap: "nowrap" }}>
        <Box sx={{ justifySelf: "center" }}>
          <Typography
            textAlign="center"
            variant="h6"
            sx={{
              fontFamily: "inherit",
              fontWeight: 700,
            }}
          >
            জীবননগর ডিগ্রি কলেজ
          </Typography>
          <Typography
            textAlign="center"
            variant="body1"
            sx={{
              fontFamily: "inherit",
            }}
          >
            জীবননগর, চুয়াডাঙ্গা।
          </Typography>
          <Typography
            textAlign="center"
            variant="body2"
            sx={{ fontFamily: "inherit" }}
          >
            স্থাপিতঃ ১৯৮৪ খ্রি.
          </Typography>
          <Typography
            textAlign="center"
            variant="body1"
            sx={{ fontFamily: "inherit", mt: 1, px: 2, fontSize: 12 }}
          >
            EIIN: <strong>115461</strong>, জাতীয় বিশ্ববিদ্যালয় কোড: 0807, যশোর
            বোর্ড কোড: 115623, বিএম কোডঃ ২৯০২৯, TELEHONE: +880762475047, EMAIL:{" "}
            <strong>jdcjibannagar@gmail.com</strong>।
          </Typography>
        </Box>
      </Box>
      <Divider sx={{ flex: 1, borderColor: grey[700], borderWidth: 2 }} />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <Typography
          sx={{ justifySelf: "flex-start", textAlign: "left", flex: 5 }}
        >
          স্মারক সংখ্যাঃ-
        </Typography>
        <Typography
          sx={{ justifySelf: "flex-start", textAlign: "left", flex: 2 }}
        >
          তারিখঃ- {format(new Date(), "PP")} খ্রি.
        </Typography>
      </Box>

      {/* Title */}
      <Box sx={{ mt: 2 }}>
        <Typography
          variant="h4"
          sx={{ textAlign: "center", textDecoration: "underline" }}
        >
          প্রত্যয়ন পত্র
        </Typography>
      </Box>
    </Box>
  );
};

const DocBody = ({ application }) => {
  return (
    <Box sx={{ my: 3 }}>
      <Typography
        sx={{ textAlign: "justify", lineHeight: 1.8, textIndent: 40 }}
      >
        এই মর্মে প্রত্যয়ন করা যাচ্ছে যে, নামঃ{" "}
        <strong>{up(application.name)}</strong>, পিতার নামঃ{" "}
        <strong>{up(application.fatherName)}</strong>, মাতার নামঃ{" "}
        <strong>{up(application.motherName)}</strong>, ঠিকানাঃ{" "}
        <strong>{up(application.address)}</strong>। সে{" "}
        <strong>{up(renderExamination(application.lastExamName), "bn")}</strong>{" "}
        পরীক্ষায় <strong>{up(renderGroup(application.group, "bn"))}</strong> হতে
        অংশ গ্রহণ করে{" "}
        <strong>
          {up(renderResultType(application.resultType))} :{" "}
          {up(application.result)}
        </strong>{" "}
        পেয়ে উত্তীর্ণ হয়েছে। তার রোল নম্বরঃ <strong>{application.roll}</strong>,
        রেজিস্ট্রেশন নম্বরঃ <strong>{application.registration}</strong> এবং
        পরীক্ষার সালঃ <strong>{application.passingYear}</strong>। তার শ্রেণি রোল
        নম্বরঃ <strong>{application.classRoll}</strong>। আমার জানামতে অত্র কলেজে
        অধ্যয়নকালে সে কলেজ পরিপন্থি কোন কার্যকলাপে জড়িত ছিল না।
      </Typography>

      <Typography
        sx={{ mt: 2, textAlign: "justify", lineHeight: 1.8, textIndent: 40 }}
      >
        আমি তার সার্বিক মঙ্গল কামনা করি।
      </Typography>
    </Box>
  );
};

const DocBodyPresent = ({ application }) => {
  console.log(application);
  return (
    <Box sx={{ my: 3 }}>
      <Typography
        sx={{ textAlign: "justify", lineHeight: 1.8, textIndent: 40 }}
      >
        এই মর্মে প্রত্যয়ন করা যাচ্ছে যে, নামঃ{" "}
        <strong>{up(application.name)}</strong>, পিতার নামঃ{" "}
        <strong>{up(application.fatherName)}</strong>, মাতার নামঃ{" "}
        <strong>{up(application.motherName)}</strong>, ঠিকানাঃ{" "}
        <strong>{up(application.address)}</strong>। সে অত্র কলেজের{" "}
        <strong>{renderExamination(application.readingClass, "bn")}</strong>{" "}
        শ্রেণির <strong>{application.session}</strong> শিক্ষাবর্ষের{" "}
        <strong>{renderGroup(application.group, "bn")}</strong> -এর একজন
        শিক্ষার্থী। তার শ্রেণি রোল নম্বরঃ{" "}
        <strong>{application.classRoll}</strong> এবং একাডেমিক বর্ষঃ{" "}
        <strong>{up(application.readingYear)}</strong>। আমার জানামতে সে কলেজ
        পরিপন্থি কোন কার্যকলাপে জড়িত নয়।
      </Typography>

      <Typography
        sx={{ mt: 2, textAlign: "justify", lineHeight: 1.8, textIndent: 40 }}
      >
        আমি তার সার্বিক মঙ্গল কামনা করি।
      </Typography>
    </Box>
  );
};
const DocBodyIncorrect = ({ application }) => {
  console.log(application);
  return (
    <Box sx={{ my: 3 }}>
      <Typography
        sx={{
          textAlign: "justify",
          lineHeight: 1.8,
          textIndent: 40,
          fontSize: 13,
        }}
      >
        এই মর্মে প্রত্যয়ন করা যাচ্ছে যে, নামঃ{" "}
        <strong>{up(application.name)}</strong>, পিতার নামঃ{" "}
        <strong>{up(application.fatherName)}</strong>, মাতার নামঃ{" "}
        <strong>{up(application.motherName)}</strong>, ঠিকানাঃ{" "}
        <strong>{up(application.address)}</strong>। সে অত্র কলেজের{" "}
        <strong>{renderExamination(application.readingClass, "bn")}</strong>{" "}
        শ্রেণির <strong>{application.session}</strong> শিক্ষাবর্ষের{" "}
        <strong>{renderGroup(application.group, "bn")}</strong> -এর একজন
        শিক্ষার্থী। তার শ্রেণি রোল নম্বরঃ{" "}
        <strong>{application.classRoll}</strong>।
        {application.passed && (
          <Typography
            sx={{
              my: 3,
              fontSize: 12,
              fontWeight: "600",
              textTransform: "uppercase",
            }}
          >
            অত্র কলেজ হতে উত্তীর্ণ হওয়া সর্বশেষ পরীক্ষার তথ্যঃ Exam name:{" "}
            {up(renderExamination(application.examName))}, roll:{" "}
            {application.examRoll}, registration: {application.examRegistration}
            , session: {application.examSession}, group/subject/trade:{" "}
            {up(renderGroup(application.examGroup))}, result:{" "}
            {application.examResult}{" "}
            {up(renderResultType(application.examResultType))}, year:{" "}
            {application.examYear}, board/university:{" "}
            {up(application.examBoard)}
          </Typography>
        )}
        <Typography sx={{ my: 2 }}>
          তার ড্যকুমেন্ট সংশোধন সংক্রান্ত তথ্যাদি নিচে দেয়া হলোঃ
        </Typography>
      </Typography>
      <Table
        sx={{
          my: 1,
          border: "2px solid black",

          "& td": { border: "2px solid black", fontSize: 13 },
          "& th": { border: "2px solid black", fontSize: 13 },
        }}
      >
        <TableHead>
          <TableRow>
            <TableCell>
              <strong>অত্র কলেজে সংরক্ষিত ড্যকুমেন্ট অনুযায়ী তথ্যাদি</strong>
            </TableCell>
            <TableCell>
              <strong>সংশোধনের পর তথ্যাদি যেমন হবে</strong>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {application && application.nameChanged && (
            <TableRow>
              <TableCell>
                NAME:{" "}
                <strong>
                  <u>{up(application.name)}</u>
                </strong>
              </TableCell>
              <TableCell>
                NAME:{" "}
                <strong>
                  <u>{up(application.changedName)}</u>
                </strong>
              </TableCell>
            </TableRow>
          )}
          {application && application.fatherNameChanged && (
            <TableRow>
              <TableCell>
                FATHER NAME:{" "}
                <strong>
                  <u>{up(application.fatherName)}</u>
                </strong>
              </TableCell>
              <TableCell>
                FATHER NAME:{" "}
                <strong>
                  <u>{up(application.changedFatherName)}</u>
                </strong>
              </TableCell>
            </TableRow>
          )}
          {application && application.motherNameChanged && (
            <TableRow>
              <TableCell>
                MOTHER NAME:{" "}
                <strong>
                  <u>{up(application.motherName)}</u>
                </strong>
              </TableCell>
              <TableCell>
                MOTHER NAME:{" "}
                <strong>
                  <u>{up(application.changedMotherName)}</u>
                </strong>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <Typography
        sx={{ textAlign: "justify", lineHeight: 1.8, textIndent: 40 }}
      >
        {" "}
        আমার জানামতে সে কলেজ পরিপন্থি কোন কার্যকলাপে জড়িত নয়। আমি তার সার্বিক
        মঙ্গল কামনা করি।
      </Typography>
    </Box>
  );
};

const DocFooter = ({ application, type }) => {
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mt: 2,
          pr: 3,
        }}
      >
        <Box>
          {/* QR CODE */}
          {/* <QRCode
            value={generateQRCodeText(application)}
            size={120}
            title={type.toUpperCase()}
          /> */}
        </Box>
        <Box>
          <Typography
            variant="body"
            sx={{
              fontFamily: "inherit",
              mt: 2,
              textAlign: "center",
            }}
          >
            <Typography> অধ্যক্ষ </Typography>
            <Typography> জীবননগর ডিগ্রি কলেজ </Typography>
          </Typography>
        </Box>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "flex-start", my: 2 }}>
        <QRCode
          value={generateQRCodeText(application)}
          size={120}
          title={type.toUpperCase()}
        />
      </Box>
      <Typography textAlign="center" sx={{ textDecoration: "underline" }}>
        ড্যকুমেন্টটি ডিজিটালি প্রস্তুত করা হয়েছে।
      </Typography>
    </Box>
  );
};

const DocBodyManager = (application) => {
  switch (application.applicationType) {
    case "psps":
      return <DocBody application={application} />;
    case "pscs":
      return <DocBodyPresent application={application} />;
    case "psis":
      return <DocBodyIncorrect application={application} />;
    default:
      return <DocBody application={application} />;
  }
};

const ProttoionRenderer = ({ application, id, type }) => {
  // console.log(application);
  return (
    <Layout print>
      {application && application.status === "Done" ? (
        <Container maxWidth="lg" sx={{ mt: 1, mb: 1, mx: "auto" }}>
          <Box
            sx={{
              width: 700,
              height: 1100,
              p: 2,
              background: `URL(${CollegeLogoURL}) rgba(0, 0, 0, .9)`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              backgroundColor: "background.paper",
              backgroundSize: "60%",
              position: "relative",
            }}
          >
            <Box
              sx={{
                position: "absolute",
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                backgroundColor: "background.paper",
                opacity: 0.87,
                px: 4,
                py: 1,
                fontFamily: "monospace",
                // border: "10px solid transparent",
                // borderImage: `URL(${TestimonialPatternURL})`,
                // borderImageRepeat: "round",
                // borderImageSlice: 30,
                // borderImageWidth: 2,
                // borderRadius: 3,
              }}
            >
              <DocHeader />
              {DocBodyManager(application)}
              <DocFooter application={application} type={type} />
            </Box>
          </Box>
        </Container>
      ) : (
        <Alert severity="error">
          Application {id} is wrong. Please try again
        </Alert>
      )}
    </Layout>
  );
};

export default ProttoionRenderer;
