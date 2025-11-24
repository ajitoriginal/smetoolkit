const defaultServerResponse = {
  status: 400,
  message: '',
  body: {},
};

const smeUser = {
  SIGNUP_SUCCESS: 'Signup Success',
  SIGNIN_SUCCESS: 'Signin Success',
  USER_NOT_FOUND: 'User not found',
  PASSWORD_NOT_EXIST: 'Password does not exist',
  INVALID_CREDENTIALS: 'Invalid Credentials',
  NOT_ASSOCIATED_WITH_WINSPECT: 'User not associated with Winspect. Please contact Super admin',
  INVALID_PASSWORD: 'Invalid Password',
};

const order = {
  ORDERS_NOT_FOUND: 'Orders Not Found',
  ORDER_NOT_FOUND: 'Order Not Found',
  ORDERS_RETRIEVED_SUCCESSFULLY: 'Orders Retrieved Successfully',
  ORDER_RETRIEVED_SUCCESSFULLY: 'Order Retrieved Successfully',
  ORDER_DETAILS_UPDATED_SUCCESSFULLY: 'Order Details Updated Successfully',
};

const service = {
  SERVICES_RETRIEVED_SUCCESSFULLY: 'Services Retrieved Successfully',
  SERVICE_NOT_FOUND: 'Service Not Found',
};

const agent = {
  AGENTS_NOT_FOUND: 'Agents Not Found',
  AGENT_NOT_FOUND: 'Agent Not Found',
  AGENTS_RETRIEVED_SUCCESSFULLY: 'Agents Retrieved Successfully',
  AGENT_RETRIEVED_SUCCESSFULLY: 'Agent Retrieved Successfully',
  AGENT_DETAILS_UPDATED_SUCCESSFULLY: 'Agent Details Updated Successfully',
};

const client = {
  CLIENTS_NOT_FOUND: 'Clients Not Found',
  CLIENT_NOT_FOUND: 'Client Not Found',
  CLIENTS_RETRIEVED_SUCCESSFULLY: 'Clients Retrieved Successfully',
  CLIENT_RETRIEVED_SUCCESSFULLY: 'Client Retrieved Successfully',
  CLIENT_DETAILS_UPDATED_SUCCESSFULLY: 'Client Details Updated Successfully',
};

const general = {
  SOMETHING_WENT_WRONG: 'Something went wrong',
  INVALID_INPUT: 'Invalid Input',
};

const office = {
  OFFICES_RETRIEVED_SUCCESSFULLY: 'Offices Retrieved Successfully',
  OFFICE_ADDED_SUCCESSFULLY: 'Office Added Successfully',
  OFFICE_DETAILS_UPDATED_SUCCESSFULLY: 'Office Details Updated Successfully',
  OFFICE_NOT_FOUND: 'Office not found',
};

const template = {
  TEMPLATE_NOT_FOUND: 'Template not found',
};

const templateCategory = {
  TEMPLATE_CATEGORY_NOT_FOUND: 'Template Category not found',
};

const templateSubCategory = {
  TEMPLATE_SUB_CATEGORY_NOT_FOUND: 'Template Subcategory not found',
};

const templateAbout = {
  TEMPLATE_ABOUT_NOT_FOUND: 'Template About not found',
};

const templateAboutValue = {
  TEMPLATE_ABOUT_VALUE_NOT_FOUND: 'Template About Value not found',
};

const templateAboutValueNote = {
  TEMPLATE_ABOUT_VALUE_NOTE_NOT_FOUND: 'Template About Value Note not found',
};

const templateRemark = {
  TEMPLATE_REMARK_NOT_FOUND: 'Template Remark not found',
};

const templateDisclosure = {
  TEMPLATE_DISCOLSURE_NOT_FOUND: 'Template Disclosure not found',
};

const templateDefinition = {
  TEMPLATE_DEFINITION_NOT_FOUND: 'Template Definition not found',
};

const templateLocation = {
  TEMPLATE_LOCATION_NOT_FOUND: 'Template Location not found',
};

const templateSubCategoryReminder = {
  TEMPLATE_SUBCATEGORY_REMINDER_NOT_FOUND: 'Template Reminder not found',
};

const masterTemplate = {
  MASTER_TEMPLATE_NOT_FOUND: 'Master Template Not Found',
};

module.exports = {
  defaultServerResponse,
  smeUser,
  general,
  service,
  office,
  template,
  templateCategory,
  templateSubCategory,
  templateAbout,
  templateAboutValue,
  templateAboutValueNote,
  templateRemark,
  templateDisclosure,
  templateDefinition,
  templateLocation,
  templateSubCategoryReminder,
  masterTemplate,
};
