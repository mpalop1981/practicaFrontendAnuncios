export function buildAdView(ad) {
    const adDetailView = buildAdDetailView(ad);
    let adTemplate = `
      <a href="/adDetail.html?id=${ad.id}">
        ${adDetailView}
      </a>
    `;
  
    return adTemplate;
  }
  
  //Cada anuncio debe mostrar su imagen(si tiene), nombre, descripción, precio y si es compra o venta.
  export function buildAdDetailView(ad) {

    let compra = 'Compra';
    if(ad.sell == 'false')
        compra = 'Venta'

    let adTemplate = `
      <h1>Anuncio del usuario ${ad.userId}</h1>
      <p>Titulo: ${ad.name}</p>
      <p>Decripcion: ${ad.description}</p>
      <p>Precio: ${ad.price}</p>
      <img src="${ad.img}"></img>
      <p>Compra o Venta: ${compra}</p>
    `;
  
    return adTemplate;
  }
  
  export function buildAdListSpinnerView() {
    return `<div class="loader">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>`;
  }
  
  export function buildNotFoundAdsView() {
    return `
      <h1>Oops!!! ha debido haber un error, no hay ningún anuncio!!! =(</h1>
    `;
  }
  