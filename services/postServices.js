import client from '../config/client.js'

const fetchAuthor = async (authorId) => {
    const author = await client.users.findUnique({
        where: { id: authorId },
    });
    return author;
};
const getNumberOfComments = async (postId) => {
    const comments = await fetchComments(postId);
    return comments.length;
};

const fetchCommentAuthors = async (comments) => {
    const authorPromises = comments.map(comment => fetchAuthor(comment.authorId));
    const authors = await Promise.all(authorPromises);
    const authorMap = authors.reduce((map, author) => {
        map[author.id] = author;
        return map;
    }, {});
    return comments.map(comment => ({
        ...comment,
        author: authorMap[comment.authorId] || null
    }));
};

const fetchComments = async (postId) => {
    const comments = await client.comments.findMany({
        where: { postId: postId },
    });
    return comments;
};


export const createNewPost = async (post) => {
    const newPost = await client.posts.create({
        data: {
            title: post.title,
            authorId: post.authorId,
            content: post.content,
        },

    })

    return newPost
}

export const getAllPosts = async () => {

    const posts = await client.posts.findMany();
    const authorPromises = posts.map(post => fetchAuthor(post.authorId));
    const authors = await Promise.all(authorPromises);

    const authorMap = authors.reduce((map, author) => {
        map[author.id] = author;
        return map;
    }, {});
    const commentPromises = posts.map(post => getNumberOfComments(post.id));
    const commentCounts = await Promise.all(commentPromises);

    const postsWithDetails = posts.map((post, index) => ({
        ...post,
        author: authorMap[post.authorId] || null,
        numberOfComments: commentCounts[index]
    }));

    return postsWithDetails;
}

export const findPostById = async (postId) => {
    const post = await client.posts.findUnique({ where: { id: postId } })
    if (!post) {
        throw new Error('Post not found');
    }

    const comments = await fetchComments(postId);
    const commentsWithAuthors = await fetchCommentAuthors(comments);

    return {
        ...post,
        comments: commentsWithAuthors
    };
}

export const updatePostById = async (postId, data) => {
    return client.posts.update({ where: { id: postId }, ...data })
}

export const deletePostById = async (postId) => {

    return await client.posts.delete({ where: { id: postId } })

}