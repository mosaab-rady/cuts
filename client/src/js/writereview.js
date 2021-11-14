import { request } from './axios';

export const writereview = async ({ id, form }) => {
  const errDiv = document.getElementById('write__review__err');

  const res = await request('POST', `/api/v1/reviews/addreview/${id}`, form);
  if (res) {
    if (res.data.status === 'success') {
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } else {
      errDiv.insertAdjacentHTML(
        'afterbegin',
        `<h4 class='err--div__h4' >the following error occur :<li> ${res.data.message}</li> </h4>`
      );
    }
  }
};
