Blog Application
這是一個簡單的博客應用程式，允許使用者查看、創建和查看單個帖子。 每個帖子都有一個創建時間戳，所有內容都通過Deno和Oak框架進行處理。

* 特性
* 查看所有帖子清單
創建新帖子
查看單個帖子及其內容
顯示每個帖子的創建時間
安裝
環境要求
Deno 版本 1.0 及以上
克隆專案
bash
複製程式碼
git clone https://github.com/yourusername/blog-app.git
cd blog-app
啟動伺服器
首先確保你已經安裝了 Deno：

bash
複製程式碼
deno run --allow-net app.js
這將啟動一個在 http://127.0.0.1:8000 運行的本地伺服器。

檔結構
plaintext
複製程式碼
blog-app/
│
├── app.js # 應用程式邏輯
├── render.js # HTML 渲染函數
└── README.md # 項目文件
app.js
app.js 是應用程式的主檔，定義了四個路由：

GET /：顯示所有帖子
GET /post/new：顯示創建新帖子的表單
GET /post/：id：顯示單個帖子
POST /post：處理創建新帖子的請求
render.js
render.js 檔案包含所有 HTML 渲染函數：

layout（title， content）：渲染整個頁面的佈局
list（posts）：顯示所有帖子
newPost（）：顯示新建帖子表單
show（post）：顯示單個帖子的內容
用法
訪問 http://127.0.0.1:8000 來查看所有帖子。
點擊 「Create a Post」 來創建一個新帖子。
每個帖子將顯示其創建時間。
可以點擊 「Read post」 來查看單個帖子的詳細內容。
示例
建立的帖子會顯示如下內容：

html
複製程式碼
<h2>Title of the Post</h2>
<p>Created at: 12/27/2024, 5:00 PM</p>
<p><a href="/post/0">Read post</a></p>

