import { postAwait } from '@libs/asyncReq';
import mock from './mock';

export function handleAwaitResObj(resObj) {
  console.log('handleAwaitResObj resObj: ', resObj);

  if (resObj) {
    if (resObj.status === 0) {
      return resObj;
    }
    if (resObj.error) {
      alert(resObj.error + '服务器异常');
      return null;
    }
    if (resObj.code && resObj.code !== '200') {
      alert(resObj.msg);
      return null;
    }
    if (resObj.status && resObj.status !== 200) {
      alert(resObj.message);
      return null;
    }

    return resObj.respData;
  }

  return null;
}

const login = async (profile) => {
  console.log('login profile: ', profile);
  const loginResObj = await postAwait('/api/v1/hub/h5/login', {
    mobile: profile.phoneValue,
    code: profile.codeValue,
  });
  console.log('loginResObj: ', loginResObj);
  const loginedObj = handleAwaitResObj(loginResObj) || {};

  return loginedObj;
};

const logout = async (profile) => {
  console.log('logout profile: ', profile);
  const logoutResObj = await postAwait('/api/v1/hub/h5/logout', {
    meowToken: profile.token,
  });
  console.log('logoutResObj: ', logoutResObj);
  const logoutedObj = handleAwaitResObj(logoutResObj) || {};

  return logoutedObj;
};

const getUsers = async (profile) => {
  const usersResObj = await postAwait('/api/users', {

  });
  const users = handleAwaitResObj(usersResObj) || [];

  return users;
};

export default {
  login,
  logout,
  getUsers,
};
