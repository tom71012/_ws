import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import * as render from './render.js';
import { DB } from "https://deno.land/x/sqlite/mod.ts";

// 模擬的帖子數據，未來會替換為從數據庫中讀取
const db = new DB("members.db");
db.query(`
  CREATE TABLE IF NOT EXISTS posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    userId TEXT,
    body TEXT,
    created_at DATETIME,
    category TEXT
  )
`);
db.query("CREATE TABLE IF NOT EXISTS members (id INTEGER PRIMARY KEY AUTOINCREMENT, userId TEXT, password TEXT)");

let LoginId = -1;
let LOID = "";

const router = new Router();
router.get('/', list);                  // 顯示所有帖子
router.get('/post/new', add);            // 新建帖子
router.post('/create', create);         // 創建帖子
router.get('/SignUp', sign);            // 註冊頁面
router.get('/login', login);            // 登錄頁面
router.post('/build', build);           // 註冊提交
router.post('/check', check);           // 登錄驗證
router.get('/category/:category', categoryList); // 顯示特定版塊的帖子

const app = new Application();
app.use(router.routes());
app.use(router.allowedMethods());

// 查詢數據庫，返回結果
function query(sql, params = []) {
  let list = [];
  for (const [id, title, userId, body, created_at, category] of db.query(sql, params)) {
    list.push({ id, title, userId, body, created_at, category });
  }
  return list;
}

// 顯示註冊頁面
async function sign(ctx) {
  ctx.response.body = await render.tosign();
}

// 顯示登錄頁面
async function login(ctx) {
  ctx.response.body = await render.tologin();
}

// 顯示所有帖子
async function list(ctx) {
  const posts = query("SELECT * FROM posts");
  ctx.response.body = await render.list(posts);
}

// 顯示新建帖子頁面
async function add(ctx) {
  ctx.response.body = await render.newPost();
}

// 創建新帖子
async function create(ctx) {
  const body = ctx.request.body();
  if (body.type === "form") {
    const pairs = await body.value;
    const post = {};
    for (const [key, value] of pairs) {
      post[key] = value;
    }
    post.created_at = new Date();
    post.id = 0;  // 賦予新的ID
    post.userId = LOID;
    
    // 存儲到數據庫中
    db.query("INSERT INTO posts (title, userId, body, created_at, category) VALUES (?, ?, ?, ?, ?)", [
      post.title, post.userId, post.body, post.created_at, post.category
    ]);

    ctx.response.redirect('/');
  }
}

// 註冊新用戶
async function build(ctx) {
  const body = ctx.request.body();
  if (body.type === "form") {
    const pairs = await body.value;
    const member = {};
    let su = 0;
    for (const [key, value] of pairs) {
      if (value != "") {
        member[key] = value;
        su++;
      } else {
        console.log('Empty value');
        ctx.response.redirect('/SignUp');
        break;
      }
    }
    if (su == 2) {
      db.query("INSERT INTO members (userId, password) VALUES (?, ?)", [member.userId, member.password]);
      console.log('create successul:', member);
      ctx.response.redirect('/login');
    }
  }
}

// 登錄檢查
async function check(ctx) {
  const body = ctx.request.body();
  if (body.type === "form") {
    const pairs = await body.value;
    const member = {};
    let cct = false;
    for (const [key, value] of pairs) {
      member[key] = value;
    }
    for (const [id, userId, password] of db.query("SELECT id, userId, password FROM members")) {
      let ct = 0;
      if (member.userId === userId) ct++;
      if (member.password === password) ct++;
      if (ct == 2) {
        cct = true;
        LoginId = id;
        LOID = member.userId;
        console.log('loginId : ', LoginId);
        console.log('LOID : ', LOID);
        ctx.response.redirect('/');
      }
    }
    if (!cct) {
      console.log('fail');
      ctx.response.redirect('/login');
    }
  }
}

// 顯示特定版塊的帖子
async function categoryList(ctx) {
  const category = ctx.params.category;
  const posts = query("SELECT * FROM posts WHERE category = ?", [category]);
  ctx.response.body = await render.list(posts, category);
}

console.log('Server running at http://127.0.0.1:8000');
await app.listen({ port: 8000 });
