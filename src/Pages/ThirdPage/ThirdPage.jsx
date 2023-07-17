import React, { useState, useEffect } from "react";
import { render } from "react-dom";
import InfiniteScroll from "react-infinite-scroll-component";

const style = {
  height: 30,
  border: "1px solid green",
  margin: 6,
  padding: 8
};
export const ThirdPage = () => {
  const App = () => {
    const [items, setItems] = useState(Array.from({ length: 20 }));

    const fetchMoreData = () => {
      // имитация асинхронного запроса API
      setTimeout(() => {
        setItems((prevItems) => prevItems.concat(Array.from({ length: 20 })));
      }, 1500);
    };

    useEffect(() => {
      // Загрузка данных при первоначальном монтировании компонента
      fetchMoreData();
    }, []);

    return (
      <div>
        <h1>demo: react-infinite-scroll-component</h1>
        <hr />
        <div id="scrollableDiv" style={{ height: 300, overflow: "auto" }}>
          <InfiniteScroll
            dataLength={items.length}
            next={fetchMoreData}
            hasMore={true}
            loader={<h4>Loading...</h4>}
            scrollableTarget="scrollableDiv"
          >
            {items.map((i, index) => (
              <div style={style} key={index}>
                div - #{index}
              </div>
            ))}
          </InfiniteScroll>
        </div>
      </div>
    );
  };

  render(<App />, document.getElementById("root"));
};
