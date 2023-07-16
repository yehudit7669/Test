export const routes: any = {
  ROOT: '/',
  ANY: '*',
  AUTH: 'auth',
  SIGN_IN: 'sign-in',
  BIRTH_DATE: 'birth-date',
  FORGOT_PASSWORD: 'forgot-password',
  SIGN_UP: 'sign-up',
  SELECT_ROLE: 'select-role',
  GET_STARTED: 'get-started',
  ADMIN: 'admin',
  STUDENT: 'student',
  PARENT: 'parent',
  TEACHER: 'teacher',
  STUDENT_DETAILS: 'student-details',
  PARENT_DETAILS: 'parent-details',
  TEACHER_DETAILS: 'teacher-details',
  FIRST_LOGIN_STUDENT: 'get-started/student',
  FIRST_LOGIN_PARENT: 'get-started/parent',
  FIRST_LOGIN_TEACHER: 'get-started/teacher',
  DASHBOARD: 'dashboard',
  ADMIN_DASHBOARD: 'admin/dashboard',
  STUDENT_DASHBOARD: 'student/dashboard',
  PARENT_DASHBOARD: 'parent/dashboard',
  TEACHER_DASHBOARD: 'teacher/dashboard',
  NEW_CUSTOMER: 'new-customer',
  EDIT: 'edit',
  STUDENT_DOB: 'date-of-birth',
  WORKSHEET: 'worksheet/:id',
  CUSTOMER_EDIT: '/admin/dashboard/:id/edit',
  INSTITUTE_OWNER: '/institute_owner',
  INSTITUTE_OWNER_LOGIN: '/institute_owner/login',
  QUOTE_URL: `api/v2/quote`,
  CREATE_QUOTE_URL: `api/v2/quote/create-quote-request`,
  CUSTOMER_URL: `api/v2/customer`,
  DELETE_CUSTOMER_URL: `api/v2/customer/delete-customer/`,
  INVITATION_TEACHER: `api/v2/invitation-teacher/send-emails`,
}
