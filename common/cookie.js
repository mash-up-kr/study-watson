import { canUseDOM } from './canUesDOM';

export const getCookie = value => {
  if (canUseDOM()) {
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieList = decodedCookie.split(';');
    const name = `${value}=`;
    const cookie = cookieList
      .map(e => e.trim())
      .find(e => e.indexOf(name) === 0);

    return cookie ? cookie.substring(name.length) : '';
  }
  return null;
};

export const getCookieServer = ({ value, context }) => {
  const decodedCookie = decodeURIComponent(context.ctx.req.headers.cookie);
  const cookieList = decodedCookie.split(';');
  const name = `${value}=`;
  const cookie = cookieList.map(e => e.trim()).find(e => e.indexOf(name) === 0);

  return cookie ? cookie.substring(name.length) : '';
};

export const deleteCookie = cookieName => {
  if (canUseDOM()) {
    const expireDate = new Date();

    // 어제 날짜를 쿠키 소멸 날짜로 설정한다.
    expireDate.setDate(expireDate.getDate() - 1);
    document.cookie = `${cookieName}=; expires=${expireDate.toGMTString()}; path=/`;
  }
};

export default getCookie;
