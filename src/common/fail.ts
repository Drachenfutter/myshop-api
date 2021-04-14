import { logger } from "./log";

export const ERRORS ={
  NEW_USER:{
    NAME_NOT_INFORMED:{
      statusCode: 400,
      errorCode: 100,
      message: 'Name not informed.'
    },
    EMAIL_NOT_INFORMED:{
      statusCode: 400,
      errorCode: 101,
      message: 'Email not informed.'
    },
    EMAIL_INVALID:{
      statusCode: 400,
      errorCode: 102,
      message: 'Invalid email.'
    },
    EMAIL_USED_ALREADY:{
      statusCode: 400,
      errorCode: 103,
      message: 'Invalid email.'
    },
    PASSWORD_NOT_INFORMED:{
      statusCode: 400,
      errorCode: 104,
      message: 'Enter a password for access'
    },
  },
  LOGIN: {
    LOGIN_NOT_INFORMED:{
      statusCode: 400,
      errorCode: 201,
      message: 'Login not informed. Check the parameters and try again' 
    },
    PASSWORD_NOT_INFORMED:{
      statusCode: 400,
      errorCode: 202,
      message: 'Password not informed. Check the parameters and try again' 
    },
    USER_NOT_FOUND:{
      statusCode: 400,
      errorCode: 203,
      message: 'Invalid credentials. Check the parameters and try again' 
    },
    PASSWORD_INVALID:{
      statusCode: 400,
      errorCode: 204,
      message: 'Invalid credentials. Check the parameters and try again' 
    }
  },
  NEW_STORE:{
    NAME_NOT_INFORMED:{
      statusCode: 400,
      errorCode: 301,
      message: 'Store name not entered'
    },
    URL_NOT_INFORMED:{
      statusCode: 400,
      errorCode: 302,
      message: 'Store identifier not informed'
    },
    USER_NOT_INFORMED:{
      statusCode: 400,
      errorCode: 303,
      message: 'Failed to retrieve user responsible for the store'
    },
  },
  PRODUCT:{
    NO_NAME:{
      statusCode: 400,
      errorCode: 401,
      message: 'Product name not informed.' 
    },
    NO_PRICE:{
      statusCode: 400,
      errorCode: 402,
      message: 'Product value not informed' 
    },
    NO_STORE_ID:{
      statusCode: 400,
      errorCode: 403,
      message: 'Store not informed.' 
    },
    STORE_ID_NOT_ALLOWED:{
      statusCode: 400,
      errorCode: 404,
      message: 'Action not allowed for this user.' 
    },
  },
  AUTH:{
    INVALID_ACCESS_TOKEN:{
      statusCode: 400,
      errorCode: 10,
      message: 'The request cannot be processed. Authentication expired or invalid.' 
    },
    NO_ACCESS_TOKEN:{
      statusCode: 400,
      errorCode: 11,
      message: 'The request cannot be processed. Check the parameters and try again.' 
    },
    VERIFYING_JWT:{
      statusCode: 500,
      errorCode: 10,
      message: 'There was an internal error in the application. Try later.' 
    },
    EMAIL_VALIDED:{
      statusCode: 400,
      errorCode: 12,
      message: 'Email already validated.' 
    },
    CONFIRMATION_CODE_FAIL:{
      statusCode: 500,
      errorCode: 11,
      message: 'Internal error' 
    },
    CONFIRM_EMAI_NO_TOKEN:{
      statusCode: 400,
      errorCode: 13,
      message: 'Request not found' 
    }
  },
  INTERNAL:{
    BCRIPTY:{
      statusCode: 500,
      errorCode: 100,
      message: 'Internal error when validating credentials' 
    }
  }
}

export interface ErrorMessage {
  statusCode: number,
  errorCode: number,
  message: string,
  detail?: string
}

export class Fail extends Error{
  statusCode: number;
  errorCode: number;
  detail?: string;

  constructor(e: ErrorMessage, detail?: string){
    super(e.message);
    this.statusCode = e.statusCode;
    this.errorCode = e.errorCode;
    this.message = e.message;
    detail ? this.detail = detail : '';
  }
  
  getResponse(){
    let error:any = {
      code: this.errorCode,
      message: this.message
    };
    this.detail ? error.detail = this.detail : '';
    return { error }
  }
}

export function FormatError(err: ErrorMessage): ErrorMessage{
  let restError: ErrorMessage = {
    message: err.message,
    statusCode: 500,
    errorCode: 999,
    detail: JSON.stringify(err)
  };
  
  err.errorCode ? restError.errorCode = err.errorCode : '';
  err.statusCode ? restError.statusCode = err.statusCode : '';
  logger.error(`[FAIL] ${restError.statusCode} - ${restError.errorCode} - ${restError.message} - ${restError.detail}`);
  return restError;
}