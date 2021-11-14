import { request } from './axios';

export const update = async (e, collection) => {
  const name = e.target.name.value;
  const mode = e.target.mode.value;
  const imageHero = e.target.imageHero.files[0];
  const imageCover = e.target.imageCover.files[0];
  const image = e.target.image.files[0];
  const imageDetail = e.target.imageDetail.files[0];

  if (
    !imageCover &&
    !imageHero &&
    !imageDetail &&
    !image &&
    collection.name === name &&
    collection.mode === mode
  ) {
    const errDiv = document.getElementById('update__collection--err');
    errDiv.insertAdjacentHTML(
      'afterbegin',
      `<h4 class='err--div__h4' >nothing to update</li> </h4>`
    );
    return;
  }

  const formData = new FormData();
  if (collection.name !== name) {
    formData.append('name', name);
  }

  if (collection.mode !== mode) {
    formData.append('mode', mode);
  }

  if (imageHero) {
    formData.append('imageHero', imageHero);
  }

  if (imageCover) {
    formData.append('imageCover', imageCover);
  }

  if (image) {
    formData.append('image', image);
  }

  if (imageDetail) {
    formData.append('imageDetail', imageDetail);
  }

  const res = await request(
    'PATCH',
    `api/v1/collections/${collection.id}`,
    formData
  );
  if (res) {
    // console.log(res);
    if (res.data.status === 'success') {
      const successDiv = document.getElementById('update__collection--success');
      successDiv.insertAdjacentHTML(
        'afterbegin',
        `<h4 class='success--div__h4' >updated collection successfully</li> </h4>`
      );
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } else {
      const errDiv = document.getElementById('update__collection--err');
      errDiv.insertAdjacentHTML(
        'afterbegin',
        `<h4 class='err--div__h4' >the following error occur :<li> ${res.data.message}</li> </h4>`
      );
    }
  }
};

export const remove = async (id) => {
  const res = await request('DELETE', `api/v1/collections/${id}`);
  if (res) {
    if (res.status === 204) {
      const errDiv = document.getElementById('update__collection--err');
      errDiv.insertAdjacentHTML(
        'afterbegin',
        `<h4 class='err--div__h4' >removed the collection</li> </h4>`
      );
      setTimeout(() => {
        window.location.replace(
          `${window.location.origin}/account/collections`
        );
      }, 1500);
    } else {
      const errDiv = document.getElementById('update__collection--err');
      errDiv.insertAdjacentHTML(
        'afterbegin',
        `<h4 class='err--div__h4' >the following error occur :<li> ${res.data.message}</li> </h4>`
      );
    }
  }
};

export const create = async (e) => {
  const name = e.target.name.value;
  const mode = e.target.mode.value;
  const imageHero = e.target.imageHero.files[0];
  const imageCover = e.target.imageCover.files[0];
  const image = e.target.image.files[0];
  const imageDetail = e.target.imageDetail.files[0];

  const formData = new FormData();
  if (name) {
    formData.append('name', name);
  }
  if (mode) {
    formData.append('mode', mode);
  }
  if (imageHero) {
    formData.append('imageHero', imageHero);
  }
  if (imageCover) {
    formData.append('imageCover', imageCover);
  }
  if (image) {
    formData.append('image', image);
  }
  if (imageDetail) {
    formData.append('imageDetail', imageDetail);
  }

  const res = await request('POST', 'api/v1/collections', formData);
  if (res) {
    if (res.data.status === 'success') {
      const successDiv = document.getElementById('add__collection--success');
      successDiv.insertAdjacentHTML(
        'afterbegin',
        `<h4 class='success--div__h4' >added collection successfully</li> </h4>`
      );
      setTimeout(() => {
        window.location.replace(
          `${window.location.origin}/account/collections/account/collections/${res.data.data.collection.slug}`
        );
      }, 1500);
    } else {
      const errDiv = document.getElementById('add__collection--err');
      errDiv.insertAdjacentHTML(
        'afterbegin',
        `<h4 class='err--div__h4' >the following error occur :<li> ${res.data.message}</li> </h4>`
      );
    }
  }
};

export const updateDefault = async (e, id) => {
  const imageHero = e.target.imageHero.files[0];
  const imageCover = e.target.imageCover.files[0];
  const image = e.target.image.files[0];
  const imageDetail = e.target.imageDetail.files[0];
  const imageOverview = e.target.imageOverview.files[0];

  if (!image && !imageCover && !imageHero && !imageDetail && !imageOverview) {
    const errDiv = document.getElementById('update__default__collection--err');
    errDiv.insertAdjacentHTML(
      'afterbegin',
      `<h4 class='err--div__h4' >nothing to update</li> </h4>`
    );
    return;
  }

  const formData = new FormData();
  if (imageHero) {
    formData.append('imageHero', imageHero);
  }
  if (imageCover) {
    formData.append('imageCover', imageCover);
  }
  if (image) {
    formData.append('image', image);
  }
  if (imageDetail) {
    formData.append('imageDetail', imageDetail);
  }
  if (imageOverview) {
    formData.append('imageOverview', imageOverview);
  }

  const res = await request('PATCH', `api/v1/images/image/${id}`, formData);
  if (res) {
    if (res.data.status === 'success') {
      const successDiv = document.getElementById(
        'update__default__collection--success'
      );
      successDiv.insertAdjacentHTML(
        'afterbegin',
        `<h4 class='success--div__h4' >updated collection successfully</li> </h4>`
      );
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } else {
      const errDiv = document.getElementById(
        'update__default__collection--err'
      );
      errDiv.insertAdjacentHTML(
        'afterbegin',
        `<h4 class='err--div__h4' >the following error occur :<li> ${res.data.message}</li> </h4>`
      );
    }
  }
};
