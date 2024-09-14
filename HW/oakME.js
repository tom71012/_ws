import { Application } from "https://deno.land/x/oak/mod.ts";

const app = new Application();

app.use((ctx) => {
  console.log('url=', ctx.request.url);
  let pathname = ctx.request.url.pathname;

  if (pathname == '/') {
    ctx.response.body = `
      <html>
      <body>
        <h1>我的自我介紹</h1>
        <ol>
          <li><a href="/name">姓名</a></li>
          <li><a href="/age">年齡</a></li>
          <li><a href="/gender">性別</a></li>
          <li><a href="/intro">自我介紹</a></li>
        </ol>
      </body>
      </html>
    `;
  } else if (pathname == '/name') {
    ctx.response.body = '吳承泰';
  } else if (pathname == '/age') {
    ctx.response.body = '21';
  } else if (pathname == '/gender') {
    ctx.response.body = '男';
  } else if (pathname == '/intro') {
    ctx.response.body = '大家好，我叫吳承泰，今年21歲，目前是大學四年級的學生，主修的是資訊工程學系。';
  } else {
    ctx.response.status = 404;
    ctx.response.body = 'Not Found!';
  }
});

console.log('Server is running at: http://127.0.0.1:8000');
await app.listen({ port: 8000 });
