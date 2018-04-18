const url = "http://localhost:3001";

// Generate a unique token for storing your bookshelf data on the backend server.
let token = localStorage.token;
if (!token) {
  token = localStorage.token = Math.random().toString(36).substr(-8);
}

const headers = {
  'Accept': 'application/json',
  'Authorization': token,
};

export const getCategories = () => {
  return fetch(`${url}/categories`, { headers, method: 'GET' })
    .then((result) => {
      return result.json();
    });
};

export const getPosts = () => {
  return fetch(`${url}/posts`, { headers, method: 'GET' })
    .then((result) => {
      return result.json();
    });
};

export const getPostsForCategory = (category) => {
  return fetch(`${url}/${category}/posts`, { headers, method: 'GET' })
    .then((result) => {
      return result.json();
    });
};

export const getComments = (postId) => {
  return fetch(`${url}/posts/${postId}/comments`, { headers, method: 'GET' })
    .then((result) => {
      return result.json();
    });
};

export const addComment = (id, timestamp, body, author, parentId) => {
  const payload = {
    id: id,
    timestamp: timestamp,
    body: body,
    author: author,
    parentId: parentId
  };

  return fetch(`${url}/comments`,
    {
      method: 'POST',
      headers: {
        ...headers,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
    .then((result) => {
      return result.json();
    });
};

export const editComment = (id, timestamp, body) => {
  const payload = {
    timestamp: timestamp,
    body: body
  };

  return fetch(`${url}/comments/${id}`,
    {
      method: 'PUT',
      headers: {
        ...headers,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
    .then((result) => {
      return result.json();
    });
};

export const deleteComment = (commentId) => {
  return fetch(`${url}/comments/${commentId}`, { headers, method: 'DELETE' })
    .then((result) => {
      return result.json();
    });
};

export const editPost = (postId, title, body) => {
  const payload = {
    title: title,
    body: body
  };

  return fetch(`${url}/posts/${postId}`,
    {
      method: 'PUT',
      headers: {
        ...headers,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
    .then((result) => {
      return result.json();
    });
};

export const deletePost = (postId) => {
  return fetch(`${url}/posts/${postId}`, { headers, method: 'DELETE' })
    .then((result) => {
      return result.json();
    });
};

export const addPost = (id, timestamp, title, body, author, category) => {
  const payload = {
    id: id,
    timestamp: timestamp,
    title: title,
    body: body,
    author: author,
    category: category
  };

  return fetch(`${url}/posts`,
    {
      method: 'POST',
      headers: {
        ...headers,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
    .then((result) => {
      return result.json();
    });
};

export const votePost = (postId, option) => {
  const payload = {
    option: option
  };

  return fetch(`${url}/posts/${postId}`,
    {
      method: 'POST',
      headers: {
        ...headers,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
    .then((result) => {
      return result.json();
    });
};

export const voteComment = (commentId, option) => {
  const payload = {
    option: option
  };

  return fetch(`${url}/comments/${commentId}`,
    {
      method: 'POST',
      headers: {
        ...headers,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
    .then((result) => {
      return result.json();
    });
};
