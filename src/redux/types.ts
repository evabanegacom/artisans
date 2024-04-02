const { createAction } = require('@reduxjs/toolkit');

const startLoading = createAction('START_LOADING');

const successLoading = createAction('SUCCESS_LOADING');

const failureLoading = createAction('FAILURE_LOADING');
