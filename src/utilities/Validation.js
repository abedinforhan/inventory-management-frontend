/* eslint-disable no-useless-escape */
const validationOptions = {
  name: {
    required: 'Name is required',
    pattern: {
      value: /^[a-zA-Z ]*$/,
      message: 'Alphabetical characters only'
    },
    minLength: {
      value: 3,
      message: 'Name shoud be at least 3 characters'
    },
    maxLength: {
      value: 30,
      message: 'Name can not exceed 30 characters'
    }
  },
  email: {
    required: 'Email is required',
    pattern: {
      value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      message: 'Email is invalid'
    }
  },
  gender: {
    required: 'Gender is required'
  },
  dateOfBirth: {
    required: false
  },
  contactNo: {
    required: 'Contact Number is required',
    pattern: {
      value: /^\d+$/,
      message: 'Numbers only '
    },
    minLength: {
      value: 11,
      message: 'Contact Number must have at least 11 characters'
    },

  },
  emergencyContactNo: {
    required: 'Emergency Contact Number is required',
    pattern: {
      value: /^\d+$/,
      message: 'Numbers only '
    },
    minLength: {
      value: 11,
      message: 'Contact must have at least 11 characters'
    }
  },
  presentAddress: {
    required: false,
    maxLength: {
      value: 100,
      message: 'Address Can not exceed 100 characters '
    }
  },
  permanentAddress: {
    required: false,
    maxLength: {
      value: 100,
      message: 'Address Can not exceed 100 characters '
    }
  },
  brandName: {
    required: 'Brand is required',
  },
  branchName: {
    required: 'Branch is required',
  },
  nationalIdNo: {
    required: 'Nationalb Id No is required',
  },
  tradeLicenceNo: {
    required: 'Trade Licence No is required',
  },
  imageURL: {
    required: false,
  },
  nationalIdImageURL: {
    required: false
  },
  status: {
    required: 'Status is required'
  }
};

export default validationOptions;
