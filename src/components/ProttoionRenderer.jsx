import React from "react";
import Layout from "./Layout";
import {
  Alert,
  Box,
  Container,
  Typography,
  Avatar,
  Divider,
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
            variant="h5"
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
            sx={{ fontFamily: "inherit", mt: 1, px: 2 }}
          >
            EIIN: <strong>115461</strong>, জাতীয় বিশ্ববিদ্যালয় কোড: 0807, যশোর
            বোর্ড কোড: 115623, TELEHONE: +880762475047, EMAIL:{" "}
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
      <Box sx={{ mt: 6 }}>
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
        <strong>{up(application.address)}</strong>। সে অত্র কলেজ হতে{" "}
        <strong>{up(renderGroup(application.group, "bn"))}</strong> বিভাগে{" "}
        <strong>{up(renderExamination(application.lastExamName))}</strong>{" "}
        পরীক্ষায় অংশ গ্রহণ করে{" "}
        <strong>
          {up(renderResultType(application.resultType))} :{" "}
          {up(application.result)}
        </strong>{" "}
        পেয়ে উত্তীর্ণ হয়েছে। তার বোর্ড/বিশ্ববিদ্যালয় রোলঃ{" "}
        <strong>{application.roll}</strong>, রেজিস্ট্রেশন নম্বরঃ{" "}
        <strong>{application.registration}</strong> এবং পরীক্ষার সনঃ{" "}
        <strong>{application.passingYear}</strong>।
      </Typography>

      <Typography
        sx={{ mt: 2, textAlign: "justify", lineHeight: 1.8, textIndent: 40 }}
      >
        আমি তার সার্বিক মঙ্গল কামনা করি।
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
          mt: 8,
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
      <Box sx={{ display: "flex", justifyContent: "flex-start", my: 8 }}>
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

const ProttoionRenderer = ({ application, id, type }) => {
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
              <DocBody application={application} />
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
