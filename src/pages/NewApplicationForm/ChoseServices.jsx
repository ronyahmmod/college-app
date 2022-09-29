import React from "react";
import { Box, Button, Alert, Grid } from "@mui/material";
import { Field } from "formik";

const ChoseServices = ({ handleNext, handleBack, values, handleChange }) => {
  return (
    <Box>
      <Alert severity="warning">Select minimum one serivece.</Alert>
      <Grid container spacing={2} sx={{ my: 2, p: 2 }}>
        <Grid item sm={3}>
          <h3 className="mb-4 font-semibold text-gray-900 dark:text-white">
            HSC SERVICES
          </h3>
          <ul class="w-48 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
            <li class="w-full rounded-t-lg border-b border-gray-200 dark:border-gray-600">
              <div class="flex items-center pl-3">
                <Field
                  id="vue-checkbox"
                  type="checkbox"
                  name="services"
                  value="certificate"
                  class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                />
                <label
                  for="vue-checkbox"
                  class="py-3 ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Certificate
                </label>
              </div>
            </li>
            <li class="w-full rounded-t-lg border-b border-gray-200 dark:border-gray-600">
              <div class="flex items-center pl-3">
                <Field
                  id="react-checkbox"
                  type="checkbox"
                  value="Testimonial"
                  name="services"
                  class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                />
                <label
                  for="react-checkbox"
                  class="py-3 ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Testimonial
                </label>
              </div>
            </li>
            <li class="w-full rounded-t-lg border-b border-gray-200 dark:border-gray-600">
              <div class="flex items-center pl-3">
                <Field
                  id="angular-checkbox"
                  type="checkbox"
                  name="services"
                  value="Prottoion"
                  class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                />
                <label
                  for="angular-checkbox"
                  class="py-3 ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Prottoion
                </label>
              </div>
            </li>
          </ul>
        </Grid>
        <Grid item sm={3}>
          <h3 className="mb-4 font-semibold text-gray-900 dark:text-white">
            HSC BM SERVICES
          </h3>
          <ul class="w-48 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
            <li class="w-full rounded-t-lg border-b border-gray-200 dark:border-gray-600">
              <div class="flex items-center pl-3">
                <Field
                  id="vue-checkbox"
                  type="checkbox"
                  name="services"
                  value="certificate"
                  class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                />
                <label
                  for="vue-checkbox"
                  class="py-3 ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Certificate
                </label>
              </div>
            </li>
            <li class="w-full rounded-t-lg border-b border-gray-200 dark:border-gray-600">
              <div class="flex items-center pl-3">
                <Field
                  id="react-checkbox"
                  type="checkbox"
                  value="Testimonial"
                  name="services"
                  class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                />
                <label
                  for="react-checkbox"
                  class="py-3 ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Testimonial
                </label>
              </div>
            </li>
            <li class="w-full rounded-t-lg border-b border-gray-200 dark:border-gray-600">
              <div class="flex items-center pl-3">
                <Field
                  id="angular-checkbox"
                  type="checkbox"
                  name="services"
                  value="Prottoion"
                  class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                />
                <label
                  for="angular-checkbox"
                  class="py-3 ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Prottoion
                </label>
              </div>
            </li>
          </ul>
        </Grid>
        <Grid item sm={3}>
          <h3 className="mb-4 font-semibold text-gray-900 dark:text-white">
            DEGREE (PASS) SERVICES
          </h3>
          <ul class="w-48 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
            <li class="w-full rounded-t-lg border-b border-gray-200 dark:border-gray-600">
              <div class="flex items-center pl-3">
                <Field
                  id="vue-checkbox"
                  type="checkbox"
                  name="services"
                  value="certificate"
                  class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                />
                <label
                  for="vue-checkbox"
                  class="py-3 ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Certificate
                </label>
              </div>
            </li>
            <li class="w-full rounded-t-lg border-b border-gray-200 dark:border-gray-600">
              <div class="flex items-center pl-3">
                <Field
                  id="react-checkbox"
                  type="checkbox"
                  value="Testimonial"
                  name="services"
                  class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                />
                <label
                  for="react-checkbox"
                  class="py-3 ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Testimonial
                </label>
              </div>
            </li>
            <li class="w-full rounded-t-lg border-b border-gray-200 dark:border-gray-600">
              <div class="flex items-center pl-3">
                <Field
                  id="angular-checkbox"
                  type="checkbox"
                  name="services"
                  value="Prottoion"
                  class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                />
                <label
                  for="angular-checkbox"
                  class="py-3 ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Prottoion
                </label>
              </div>
            </li>
          </ul>
        </Grid>
        <Grid item sm={3}>
          <h3 className="mb-4 font-semibold text-gray-900 dark:text-white">
            HONOURS SERVICES
          </h3>
          <ul class="w-48 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
            <li class="w-full rounded-t-lg border-b border-gray-200 dark:border-gray-600">
              <div class="flex items-center pl-3">
                <Field
                  id="vue-checkbox"
                  type="checkbox"
                  name="services"
                  value="certificate"
                  class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                />
                <label
                  for="vue-checkbox"
                  class="py-3 ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Certificate
                </label>
              </div>
            </li>
            <li class="w-full rounded-t-lg border-b border-gray-200 dark:border-gray-600">
              <div class="flex items-center pl-3">
                <Field
                  id="react-checkbox"
                  type="checkbox"
                  value="Testimonial"
                  name="services"
                  class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                />
                <label
                  for="react-checkbox"
                  class="py-3 ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Testimonial
                </label>
              </div>
            </li>
            <li class="w-full rounded-t-lg border-b border-gray-200 dark:border-gray-600">
              <div class="flex items-center pl-3">
                <Field
                  id="angular-checkbox"
                  type="checkbox"
                  name="services"
                  value="Prottoion"
                  class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                />
                <label
                  for="angular-checkbox"
                  class="py-3 ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Prottoion
                </label>
              </div>
            </li>
          </ul>
        </Grid>
      </Grid>
      <Box>
        <Button onClick={handleNext}>Next</Button>{" "}
        <Button onClick={handleBack}>Back</Button>
        <Button type="submit">Submit</Button>
      </Box>
    </Box>
  );
};

export default ChoseServices;
