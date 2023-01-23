import "./styles.css";

const onClickAdd = () => {
  //テキストボックsの値を取得し、初期化する
  const inputText = document.getElementById("add-text").value;
  document.getElementById("add-text").value = "";

  //未完了リストを追加作成
  createIncompleteList(inputText);
};

//未完了リストから指定の要素を削除
const deleteFromIncompleteList = (target) => {
  document.getElementById("list-wrapper").removeChild(target);
  numberCheck();
};

//未完了リストに追加する関数
const createIncompleteList = (text) => {
  //ulタグを生成
  if (numberCheck()) {
    const ul = document.createElement("ul");
    ul.className = "list-row";

    //liタグ生成
    const li = document.createElement("li");
    li.innerText = text;

    //button(完了)タグ生成
    const completeButton = document.createElement("button");

    completeButton.innerText = "完了";
    //クリックしたら、そのリストを消す
    completeButton.addEventListener("click", () => {
      //上の関数で消す
      deleteFromIncompleteList(deleteButton.parentNode);
      //完了リストに追加するためにそのリストの要素をすべて取得
      const addTarget = completeButton.parentNode; //そのリストの一番上の要素のテキスト内容を取得
      const text = addTarget.firstElementChild.innerText;

      //最後にdiv以下を初期化
      addTarget.textContent = null;

      //今度は新しくliタグ生成
      const li = document.createElement("li");
      li.innerText = text;

      //そのリストを完了リストに追加するため、新しく戻るのbuttonタグ生成
      const backButton = document.createElement("button");
      backButton.innerText = "戻す";
      //戻るボタンの機能追加
      backButton.addEventListener("click", () => {
        const deleteTarget = backButton.parentNode;
        document
          //戻るボタンを押したら、そのリストを取得
          .getElementById("complete-list-wrapper")
          .removeChild(deleteTarget);

        //そのリストのテキストを取得
        const text = backButton.parentNode.firstElementChild.innerText;

        //再び未完了リストに追加する関数
        createIncompleteList(text);
      });

      //divタグの子要素に各要素を設定
      addTarget.appendChild(li);
      addTarget.appendChild(backButton);

      //完了リストに追加
      document.getElementById("complete-list-wrapper").appendChild(addTarget);
    });

    //button削除タグ生成
    const deleteButton = document.createElement("button");
    deleteButton.innerText = "削除";
    deleteButton.addEventListener("click", () => {
      //削除ボタンの機能追加/押された削除ボタンの親タグ(ul)を未完了リストから削除

      deleteFromIncompleteList(deleteButton.parentNode);
    });

    //divタグの子要素に各要素を設定
    ul.appendChild(li);
    ul.appendChild(completeButton);
    ul.appendChild(deleteButton);

    //未完了リストに戻す
    document.getElementById("list-wrapper").appendChild(ul);
  }
};

const numberCheck = () => {
  const listnumber = document.getElementById("list-wrapper");
  const childNum = listnumber.childElementCount;
  const alert = document.querySelector(".alert");
  alert.classList.remove("active");
  if (childNum <= 4) {
    return true;
  } else {
    alert.classList.add("active");
  }
};

document
  .querySelector("#add-button")
  .addEventListener("click", () => onClickAdd());
