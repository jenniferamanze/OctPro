document.addEventListener('DOMContentLoaded', function () {
  var postForm = document.getElementById('postForm');
  var postText = document.getElementById('postText');
  var postsContainer = document.getElementById('postsContainer');
  var emptyPosts = document.getElementById('emptyPosts');
  var logoutBtn = document.getElementById('logoutBtn');

  var STORAGE_KEY = 'octpro_posts_v1';
  var posts = loadPosts();

  function loadPosts() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) { return []; }
  }

  function savePosts() { localStorage.setItem(STORAGE_KEY, JSON.stringify(posts)); }

  function renderPosts() {
    // remove existing post-card nodes
    var existing = postsContainer.querySelectorAll('.post-card');
    existing.forEach(function (n) { n.remove(); });

    if (!posts.length) {
      emptyPosts.style.display = 'block';
      return;
    }

    emptyPosts.style.display = 'none';

    posts.forEach(function (p) {
      var node = document.createElement('div'); node.className = 'post-card';

      var avatar = document.createElement('div'); avatar.className = 'post-avatar'; avatar.textContent = (p.author || 'J').charAt(0).toUpperCase();

      var meta = document.createElement('div'); meta.className = 'post-meta';
      var header = document.createElement('div'); header.className = 'post-header';

      var left = document.createElement('div');
      var author = document.createElement('div'); author.className = 'post-author'; author.textContent = p.author || 'Jennifer';
      var time = document.createElement('div'); time.className = 'post-time'; time.textContent = timeAgo(new Date(p.createdAt));
      left.appendChild(author); left.appendChild(time);

      var actions = document.createElement('div'); actions.className = 'post-actions';
      var del = document.createElement('button'); del.className = 'btn-icon'; del.textContent = '🗑️'; del.title = 'Delete';
      del.addEventListener('click', function () {
        if (confirm('Delete this post?')) { posts = posts.filter(function (x) { return x.id !== p.id; }); savePosts(); renderPosts(); }
      });
      actions.appendChild(del);

      header.appendChild(left); header.appendChild(actions);

      var body = document.createElement('div'); body.className = 'post-body'; body.textContent = p.text;

      meta.appendChild(header); meta.appendChild(body);

      node.appendChild(avatar); node.appendChild(meta);
      postsContainer.appendChild(node);
    });
  }

  function timeAgo(date) {
    var diff = Math.floor((Date.now() - date.getTime()) / 1000);
    if (diff < 60) return diff + 's';
    if (diff < 3600) return Math.floor(diff/60) + 'm';
    if (diff < 86400) return Math.floor(diff/3600) + 'h';
    return Math.floor(diff/86400) + 'd';
  }

  if (postForm) {
    postForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var text = (postText.value || '').trim();
      if (!text) return alert('Please write something to post');
      var newPost = { id: Date.now(), author: 'Jennifer', text: text, createdAt: new Date().toISOString() };
      posts.unshift(newPost);
      savePosts();
      renderPosts();
      postForm.reset();
    });
  }

  if (logoutBtn) {
    logoutBtn.addEventListener('click', function () {
      if (confirm('Logout and return to login?')) window.location.href = '../../index.html';
    });
  }

  // initial render
  renderPosts();
});
