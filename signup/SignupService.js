class SignupService {
    constructor() {}
  
    async createUser(username, password) {
      const body = {
        username,
        password,
      };
  
      const response = await fetch("http://localhost:8000/auth/register", {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message);
      }
    }
  
    async loginUser(username, password) {
      const body = {
        username,
        password,
      };
  
      const response = await fetch("http://localhost:8000/auth/login", {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message);
      }
  
      const token = data.accessToken;
  
      localStorage.setItem("jwt", token);
    }
  
    getLoggedUser() {
      return localStorage.getItem("jwt") || null;
    }
  }
  
  export const signupService = new SignupService();
  