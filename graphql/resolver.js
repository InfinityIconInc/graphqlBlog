const Post = require("../models/Post");
const User = require("../models/User");
//resolver function
const posts = [];

const resolver = {
        createPost: ({title, body, image, userId}) => {
            const post = new Post ({
                title,
                body,
                image,
                slug: makeSlug(title),
                userId,
            });
            return post.save();
        },

    getPostById: ({id}) => Post.findById(id),
    getPost: ({slug}) => Post.findOne(slug),
    getPosts: () => Post.find(),

        updatePost: ({id, title, body, slug, userId}) => {
            const post = Post.findById(id);
            if(!post) return null;
            if(title) post.title = title;
            if(title) post.slug = makeSlug(title);
            if(body) post.body = body;
            if(slug) post.slug = slug;
            return Post.findByIdAndUpdate(id, post, { new: true } );
        },

        deletePost: ({id}) => {
            const index = Post.findById(id);
            if(!index)
                return "Post not found";
            else {
                Post.findByIdAndDelete(id);
                return "Post deleted";
            }
        },

        createUser: ({name, email, password, avatar}) => {
            const user = new User({
                name,
                email,
                password,
                avatar
            });
            return user.save();
        },
}

function makeSlug(title) {
    return title
        .toLowerCase()                    // Convert to lowercase
        .replace(/[^a-z0-9\s-]/g, '')      // Remove special characters
        .trim()                            // Trim spaces at the ends
        .replace(/\s+/g, '-')              // Replace spaces with hyphens
        .slice(0, 50);                     // Limit slug length (optional)
}

module.exports = resolver;