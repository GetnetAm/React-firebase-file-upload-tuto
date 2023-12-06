import {
  collection,
 
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../firebaseConfig";

function Articles() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const articleRef = collection(db, "Articles");
    const q = query(articleRef, orderBy("createdAt", "desc"));
    onSnapshot(q, (snapshot) => {
      const articles = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setArticles(articles);
      console.log(articles);
    });
  }, []);
  return (
    <div>
      {articles.length === 0 ? (
        <p>No Articles found</p>
      ) : (
        articles.map(({ id, title, discription, imgeurl, createdAt }) => (
          <div className="border mt-3 p-3 bg-light" key={id}>
            <div className="row">
              <div className="col-3">
                <img src={imgeurl} alt="" style={{height:"180px", width:"100px"}} />
              </div>
              <div>
                <h2>{title}</h2>
                <p>{createdAt.toDate().toDateString()}</p>
                <h4>{discription}</h4>
                </div>



            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Articles;
