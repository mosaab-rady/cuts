import { request } from './axios';

export const create = async (e) => {
  const formData = new FormData();
  formData.append('name', e.target.name.value);
  formData.append('type', e.target.type.value);
  formData.append('cut', e.target.cut.value);
  formData.append('collar', e.target.collar.value);
  formData.append('fabric', e.target.fabric.value);
  formData.append(
    'fabricFeatures',
    JSON.stringify({
      stretch: e.target.stretch.checked,
      antiPilling: e.target.antiPilling.checked,
      butterySoft: e.target.butterySoft.checked,
      preShrunk: e.target.preShrunk.checked,
      wrinkleFree: e.target.wrinkleFree.checked,
      colorAndFitRetention: e.target.colorAndFitRetention.checked,
      breathable: e.target.breathable.checked,
      durable: e.target.durable.checked,
      lightweight: e.target.lightweight.checked,
      naturalSoftness: e.target.naturalSoftness.checked,
    })
  );
  if (e.target.sizeAndFit.value) {
    e.target.sizeAndFit.value.split('\n').forEach((element) => {
      formData.append('sizeAndFit', element);
    });
  }
  if (e.target.materialAndCare.value) {
    e.target.materialAndCare.value.split('\n').forEach((element) => {
      formData.append('materialAndCare', element);
    });
  }
  if (e.target.reason.value) {
    formData.append('reason', e.target.reason.value);
  }

  if (e.target.collection.value) {
    formData.append('collectionId', e.target.collection.value);
  }

  formData.append('summary', e.target.summary.value);
  formData.append('price', e.target.price.value);
  formData.append('sale', e.target.sale.value);
  formData.append('color', e.target.color.value);
  formData.append('colorHex', e.target.colorHex.value);
  formData.append(
    'size',
    JSON.stringify({
      small: e.target.small.value,
      medium: e.target.medium.value,
      large: e.target.large.value,
      xLarge: e.target.xLarge.value,
      xxLarge: e.target.xxLarge.value,
    })
  );
  formData.append('imageCover', e.target.imageCover.files[0]);
  formData.append('imageDetail', e.target.imageDetail.files[0]);
  if (e.target.img_1.files[0]) {
    formData.append('images', e.target.img_1.files[0]);
  }
  if (e.target.img_2.files[0]) {
    formData.append('images', e.target.img_2.files[0]);
  }
  if (e.target.img_3.files[0]) {
    formData.append('images', e.target.img_3.files[0]);
  }

  const res = await request('POST', 'api/v1/products', formData);
  if (res) {
    if (res.data.status === 'success') {
      const successDiv = document.getElementById('add__product--success');
      successDiv.insertAdjacentHTML(
        'afterbegin',
        `<h4 class='success--div__h4' >added product successfully</li> </h4>`
      );
      setTimeout(() => {
        window.location.replace(`${window.location.origin}/account/products`);
      }, 1500);
    } else {
      const errDiv = document.getElementById('add__product--err');
      errDiv.insertAdjacentHTML(
        'afterbegin',
        `<h4 class='err--div__h4' >the following error occur :<li> ${res.data.message}</li> </h4>`
      );
    }
  }
};

export const addNewColor = async (e, product) => {
  const formData = new FormData();
  formData.append('name', product.name);
  formData.append('type', product.type);
  formData.append('cut', product.cut);
  formData.append('collar', product.collar);
  formData.append('fabric', product.fabric);
  formData.append('fabricFeatures', JSON.stringify(product.fabricFeatures));
  if (product.sizeAndFit) {
    product.sizeAndFit.forEach((element) => {
      formData.append('sizeAndFit', element);
    });
  }
  if (product.materialAndCare) {
    product.materialAndCare.forEach((element) => {
      formData.append('materialAndCare', element);
    });
  }
  if (product.reason) {
    formData.append('reason', product.reason);
  }

  if (product.collectionId) {
    formData.append('collectionId', product.collectionId._id);
  }

  formData.append('summary', product.summary);
  formData.append('price', product.price);
  formData.append('sale', product.sale);
  formData.append('color', e.target.color.value);
  formData.append('colorHex', e.target.colorHex.value);
  formData.append(
    'size',
    JSON.stringify({
      small: e.target.small.value,
      medium: e.target.medium.value,
      large: e.target.large.value,
      xLarge: e.target.xLarge.value,
      xxLarge: e.target.xxLarge.value,
    })
  );
  formData.append('imageCover', e.target.imageCover.files[0]);
  formData.append('imageDetail', e.target.imageDetail.files[0]);
  if (e.target.img_1.files[0]) {
    formData.append('images', e.target.img_1.files[0]);
  }
  if (e.target.img_2.files[0]) {
    formData.append('images', e.target.img_2.files[0]);
  }
  if (e.target.img_3.files[0]) {
    formData.append('images', e.target.img_3.files[0]);
  }

  const res = await request('POST', 'api/v1/products', formData);
  if (res) {
    if (res.data.status === 'success') {
      const successDiv = document.getElementById('add__newcolor--success');
      successDiv.insertAdjacentHTML(
        'afterbegin',
        `<h4 class='success--div__h4' >added product successfully</li> </h4>`
      );
      setTimeout(() => {
        window.location.replace(`${window.location.origin}/account/products`);
      }, 1500);
    } else {
      const errDiv = document.getElementById('add__newcolor--err');
      errDiv.insertAdjacentHTML(
        'afterbegin',
        `<h4 class='err--div__h4' >the following error occur :<li> ${res.data.message}</li> </h4>`
      );
    }
  }
};

export const updateProduct = async (e, productId) => {
  const formData = new FormData();
  formData.append('name', e.target.name.value);
  formData.append('type', e.target.type.value);
  formData.append('cut', e.target.cut.value);
  formData.append('collar', e.target.collar.value);
  formData.append('fabric', e.target.fabric.value);
  formData.append(
    'fabricFeatures',
    JSON.stringify({
      stretch: e.target.stretch.checked,
      antiPilling: e.target.antiPilling.checked,
      butterySoft: e.target.butterySoft.checked,
      preShrunk: e.target.preShrunk.checked,
      wrinkleFree: e.target.wrinkleFree.checked,
      colorAndFitRetention: e.target.colorAndFitRetention.checked,
      breathable: e.target.breathable.checked,
      durable: e.target.durable.checked,
      lightweight: e.target.lightweight.checked,
      naturalSoftness: e.target.naturalSoftness.checked,
    })
  );
  if (e.target.sizeAndFit.value) {
    e.target.sizeAndFit.value.split('\n').forEach((element) => {
      formData.append('sizeAndFit', element);
    });
  }
  if (e.target.materialAndCare.value) {
    e.target.materialAndCare.value.split('\n').forEach((element) => {
      formData.append('materialAndCare', element);
    });
  }
  if (e.target.reason.value) {
    formData.append('reason', e.target.reason.value);
  }

  if (e.target.collection.value) {
    formData.append('collectionId', e.target.collection.value);
  }

  formData.append('summary', e.target.summary.value);
  formData.append('price', e.target.price.value);
  formData.append('sale', e.target.sale.value);
  formData.append('color', e.target.color.value);
  formData.append('colorHex', e.target.colorHex.value);
  formData.append(
    'size',
    JSON.stringify({
      small: e.target.small.value,
      medium: e.target.medium.value,
      large: e.target.large.value,
      xLarge: e.target.xLarge.value,
      xxLarge: e.target.xxLarge.value,
    })
  );
  if (e.target.imageCover.files[0]) {
    formData.append('imageCover', e.target.imageCover.files[0]);
  }
  if (e.target.imageDetail.files[0]) {
    formData.append('imageDetail', e.target.imageDetail.files[0]);
  }
  if (e.target.img_1.files[0]) {
    formData.append('images', e.target.img_1.files[0]);
  }
  if (e.target.img_2.files[0]) {
    formData.append('images', e.target.img_2.files[0]);
  }
  if (e.target.img_3.files[0]) {
    formData.append('images', e.target.img_3.files[0]);
  }

  const res = await request('PATCH', `api/v1/products/${productId}`, formData);
  if (res) {
    console.log(res);
    if (res.data.status === 'success') {
      const successDiv = document.getElementById('update__product--success');
      successDiv.insertAdjacentHTML(
        'afterbegin',
        `<h4 class='success--div__h4' >updated product successfully</li> </h4>`
      );
      setTimeout(() => {
        window.location.replace(`${window.location.origin}/account/products`);
      }, 1500);
    } else {
      const errDiv = document.getElementById('update__product--err');
      errDiv.insertAdjacentHTML(
        'afterbegin',
        `<h4 class='err--div__h4' >the following error occur :<li> ${res.data.message}</li> </h4>`
      );
    }
  }
};

export const removeProduct = async (productId) => {
  const res = await request('DELETE', `api/v1/products/${productId}`);
  if (res) {
    if (res.status === 204) {
      const errDiv = document.getElementById('update__product--err');
      errDiv.insertAdjacentHTML(
        'afterbegin',
        `<h4 class='err--div__h4' >removed the product</li> </h4>`
      );
      setTimeout(() => {
        window.location.replace(`${window.location.origin}/account/products`);
      }, 1500);
    } else {
      const errDiv = document.getElementById('update__product--err');
      errDiv.insertAdjacentHTML(
        'afterbegin',
        `<h4 class='err--div__h4' >the following error occur :<li> ${res.data.message}</li> </h4>`
      );
    }
  }
};
