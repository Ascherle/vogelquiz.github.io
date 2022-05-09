import http from "../http-common";

class QuizDataService {
  getAll() {
    return http.get("/quizes");
  }

  // user password
  getUser(userName) {
    return http.get(`/quizes/user/${userName}`);
  }

  get(id) {
    return http.get(`/quizes/${id}`);
  }

  create(data) {
    return http.post("/quizes", data);
  }

  update(id, data) {
    return http.put(`/quizes/${id}`, data);
  }

  delete(id) {
    return http.delete(`/quizes/${id}`);
  }

  deleteAll() {
    return http.delete(`/quizes`);
  }

  findByTitle(title) {
    return http.get(`/quizes?title=${title}`);
  }
}

export default new QuizDataService();