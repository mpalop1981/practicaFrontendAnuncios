export default{
    async getAds(){
        const url = "http://localhost:8000/api/ads";
        let response;
        let ads;
    
        try {
          response = await fetch(url);
        } catch (error) {
          throw new Error("No se ha podido cargar el anuncio.");
        }
    
        if (!response.ok) {
          throw new Error("Anuncios no encontrados");
        }
    
        try {
          ads = await response.json();
        } catch (error) {
          throw new Error("No he podido transformar la respuesta a json");
        }
    
        return ads;
    },
    async getAd(adId) {
        const url = `http://localhost:8000/api/ads/${adId}`;
    
        let response;
        let ad;
    
        try {
          response = await fetch(url);          
        } catch (error) {
          throw new Error("No se ha podido cargar el anuncio.");
        }
    
        if (!response.ok) {
          throw new Error("Anuncio no encontrados");
        }
    
        try {
          ad = await response.json();          
        } catch (error) {
          throw new Error("No he podido transformar la respuesta a json");
        }
    
        return ad;
    },
    async deleteAd(adId) {
      const url = `http://localhost:8000/api/ads/${adId}`;
  
      let response;
  
      try {
        response = await fetch(url, {
          method: "DELETE",
          headers: {
            Authorization: "Bearer " + signupService.getLoggedUser(),
          },
        });
      } catch (error) {
        throw new Error("No he podido borrar el anuncio");
      }
  
      if (!response.ok) {
        throw new Error("Anuncio no encontrado");
      }
    }
}