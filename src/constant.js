export const BASE_URL = 'http://localhost:3001/v1/'
// export const BASE_URL = 'https://wiflyhomework.com/exam-api/v1/'

export const ROLE_ID = {
  SUPER_ADMIN: '8f00f3b0-9728-4173-861b-d3e689779439',
  MANAGER: '80d81a05-649a-4a53-a896-ad978c2f501e',
  CLIENT: '476c11d2-31cf-4a20-8392-514225ae54b2'
}

export const ROLE_INFO = {
  [ROLE_ID.SUPER_ADMIN]: {
    name: 'super-admin'
  },
  [ROLE_ID.MANAGER]: {
    name: 'manager'
  },
  [ROLE_ID.CLIENT]: {
    name: 'client'
  }
}

export const optionToastDefaults = {
  position: 'bottom-right',
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: false,
  pauseOnHover: false,
  draggable: false,
  progress: undefined
}
