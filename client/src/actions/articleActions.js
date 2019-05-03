import axios from "axios";

const url =
  process.env.NODE_ENV === "production"
    ? "/api/"
    : "http://localhost:5000/api/";

export function loadArticles() {
  return dispatch => {
    axios
      .get(`${url}articles`)
      .then(res => {
        const articles = res.data;
        dispatch({ type: "LOAD_ARTICLES", articles });
      })
      .catch(err => {
        console.log(err);
      });
  };
}

export function getArticle(article_id) {
  return dispatch => {
    axios
      .get(`${url}article/${article_id}`)
      .then(res => {
        let article = res.data;
        dispatch({ type: "VIEW_ARTICLE", article });
      })
      .catch(err => console.log(err));
  };
}

// article_id, author_id, comment
export function comment() {
  return dispatch => {};
}

//req.body.article_id
export function clap(article_id) {
  return dispatch => {
    axios
      .post(`${url}article/clap`, { article_id })
      .then(res => {
        dispatch({ type: "CLAP_ARTICLE" });
      })
      .catch(err => console.log(err));
  };
}
