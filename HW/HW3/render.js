export function layout(title, content) {
    return `
    <html>
    <head>
      <title>${title}</title>
      <style>
        body {
          padding: 80px;
          font: 16px Helvetica, Arial;
          border: 3px #3E6B7E solid;
          border-radius: 30px;
        }
        #mp {
          position: fixed;
          bottom: 40px;
          right: 30px;
          width: 80px;
        }
        h1 {
          font-size: 2.5em;
        }
        h2 {
          font-size: 1.2em;
        }
        #posts {
          margin: 0;
          padding: 0;
        }
        textarea {
          position: relative;
          top: 30px;
          width: 500px;
          height: 300px;
        }
        #posts li {
          margin: 40px 0;
          padding: 0;
          padding-bottom: 20px;
          border-bottom: 1px solid #eee;
          list-style: none;
        }
        #posts li:last-child {
          border-bottom: none;
        }
        input[type=text], [type=password], textarea {
          border: 1px solid #eee;
          border-top-color: #ddd;
          border-left-color: #ddd;
          border-radius: 3px;
          padding: 15px;
          font-size: .8em;
          width: 400px;
        }
        .holder {
          width: 600px;
          height: 500px;
          background: #efefef;
          padding: 30px 10px;
          box-sizing: border-box;
          margin: 0 auto;
          margin-top: 20px;
          text-align: center;
          border-radius: 10px;
        }
        .SLB {
          width: 300px;
          height: 60px;
          text-align: center;
          background: linear-gradient(to bottom, #4eb5e5 0%,#389ed5 100%);
          border: none;
          border-radius: 5px;
          position: relative;
          top: 40px;
          border-bottom: 4px solid #2b8bc6;
          color: #fbfbfb;
          font-weight: 600;
          font-family: 'Open Sans', sans-serif;
          font-size: 15px;
          text-align: left;
          text-indent: 5px;
          box-shadow: 0px 3px 0px 0px rgba(0,0,0,.2);
          cursor: pointer;
          display: block;
          margin: 0 auto;
          margin-bottom: 20px;
        }
      </style>
    </head>
    <body>
      <a id="mp" href="/login"><img style="width: 75px;" src="https://pic.onlinewebfonts.com/svg/img_411076.png"/></a>
      <section id="content">
        ${content}
      </section>
    </body>
    </html>
    `;
  }
  
  export function list(posts, category = "All") {
    let categoryLinks = ['general', 'tech', 'gaming', 'news'].map(category => `<a href="/category/${category}">${category}</a>`).join(' | ');
    let list = posts.map(post => `
      <li>
        <h2>${post.title}</h2>
        <h4>${post.userId} - ${post.category}</h4>
        <p>${post.body}</p>
      </li>
    `).join('\n');
  
    let content = `
      <h1>Posts in ${category} Category</h1>
      <p><a href="/post/new">Create a post</a></p>
      <p>Categories: ${categoryLinks}</p>
      <ul id="posts">${list}</ul>
    `;
    return layout(`${category} Posts`, content);
  }
  
  export function newPost() {
    return layout('New Command', `
      <h1>New Command</h1>
      <form action="/create" method="post">
        <p><input type="text" placeholder="Title" name="title"></p>
        <p><textarea placeholder="Contents" name="body"></textarea></p>
        <p>
          <select name="category">
            <option value="general">General</option>
            <option value="tech">Tech</option>
            <option value="gaming">Gaming</option>
            <option value="news">News</option>
          </select>
        </p>
        <p><input id="sub" type="submit" value="Create"></p>
      </form>
    `);
  }
  