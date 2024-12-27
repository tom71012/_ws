export function layout(title, content) {
    return `
    <html>
    <head>
      <title>${title}</title>
      <style>
        body {
          padding: 80px;
          font: 16px Helvetica, Arial;
          max-width: 800px;
          margin: 0 auto;
          line-height: 1.6;
        }
        h1 {
          font-size: 2em;
        }
        h2 {
          font-size: 1.2em;
        }
        ul {
          padding: 0;
          list-style: none;
        }
        li {
          margin: 40px 0;
          padding-bottom: 20px;
          border-bottom: 1px solid #eee;
        }
        textarea, input[type="text"] {
          width: 100%;
          padding: 10px;
          margin: 5px 0 20px;
          border: 1px solid #ddd;
          border-radius: 5px;
        }
        input[type="submit"] {
          background-color: #007BFF;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 5px;
          cursor: pointer;
        }
        input[type="submit"]:hover {
          background-color: #0056b3;
        }
      </style>
    </head>
    <body>
      <section id="content">
        ${content}
      </section>
    </body>
    </html>
    `;
  }
  
  export function list(posts) {
    const listItems = posts.map(post => {
      const formattedDate = new Date(post.created_at).toLocaleString(); // 格式化时间
      return `
        <li>
          <h2>${escapeHtml(post.title)}</h2>
          <p>Created at: ${formattedDate}</p> <!-- 显示时间 -->
          <p><a href="/post/${post.id}">Read post</a></p>
        </li>
      `;
    }).join('\n');
    return layout('Posts', `
      <h1>Posts</h1>
      <p>You have <strong>${posts.length}</strong> posts!</p>
      <p><a href="/post/new">Create a Post</a></p>
      <ul id="posts">
        ${listItems}
      </ul>
    `);
  }
  
  export function newPost() {
    return layout('New Post', `
      <h1>New Post</h1>
      <p>Create a new post.</p>
      <form action="/post" method="post">
        <p><input type="text" placeholder="Title" name="title"></p>
        <p><textarea placeholder="Contents" name="body"></textarea></p>
        <p><input type="submit" value="Create"></p>
      </form>
    `);
  }
  
  export function show(post) {
    const formattedDate = new Date(post.created_at).toLocaleString(); // 格式化时间
    return layout(post.title, `
      <h1>${escapeHtml(post.title)}</h1>
      <pre>${escapeHtml(post.body)}</pre>
      <p>Created at: ${formattedDate}</p> <!-- 显示时间 -->
    `);
  }
  
  function escapeHtml(text) {
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
  