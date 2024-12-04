const { graphql } = require('graphql');
const schema = require('../graphql/schema');
const resolver = require('../graphql/resolver');

module.exports = async (req, res) => {
    const title = "GraphQL Blog";
    const query = `
        {
        getPosts {
            _id
            title
            body
            image
            slug
            userId
        }
    }
    `;
    try {
        const result = await graphql(schema, query, resolver);
        const blogposts = result.data.getPosts;
        res.render('index', { title, blogposts });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}