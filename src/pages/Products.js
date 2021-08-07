// import { useFormik } from "formik";
// import { useState } from "react";
// material
import { Container, Typography, Card } from "@material-ui/core";
// components
import Page from "../components/Page";
// import PRODUCTS from "../_mocks_/products";
import TemplateExam from '../components/templateExam';

// ----------------------------------------------------------------------

export default function EcommerceShop() {
  return (
    <Page title="Online Exam-UI">
      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Online Exam-UI
        </Typography>
        <Card>
          <TemplateExam />

          {/* <ProductList products={PRODUCTS} /> */}
          {/* <ProductCartWidget /> */}
        </Card>
      </Container>
    </Page>
  );
}
