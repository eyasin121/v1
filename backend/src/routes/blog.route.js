import express from 'express';
import Blog from '../model/blog.model.js';
import Comment from '../model/comment.model.js';
import verifyToken from '../middleware/verifyToken.js';
import isAdmin from '../middleware/isAdmin.js';

const router = express.Router();

// Create blog
router.post("/create-post", verifyToken, isAdmin, async (req, res) => {
    try {
        const newPost = new Blog({ ...req.body });
        await newPost.save();
        res.status(201).send({
            message: "Blog created successfully",
            post: newPost
        });
    } catch (error) {
        console.error("Error in creating blog:", error);
        res.status(500).json({ message: "Error in creating blog" });
    }
});

// Get all blogs
router.get('/', async (req, res) => {
    try {
        const { search, category, location } = req.query;
        let query = {};

        if (search) {
            query = {
                ...query,
                $or: [
                    { title: { $regex: search, $options: 'i' } },
                    { content: { $regex: search, $options: 'i' } }
                ]
            };
        }

        if (category) {
            query = {
                ...query,
                category
            };
        }

        if (location) {
            query = {
                ...query,
                location
            };
        }

        const posts = await Blog.find(query).populate("author", "email").sort({ createdAt: -1 });
        res.status(200).send(posts);
    } catch (error) {
        console.error("Error in fetching blogs:", error);
        res.status(500).send({ message: "Error in fetching blogs" });
    }
});

// Get single blog by SEO-friendly title
router.get('/:title', async (req, res) => {
    try {
        const postTitle = req.params.title;
        const post = await Blog.findOne({ title: postTitle });

        if (!post) {
            return res.status(404).send({ message: "Blog not found here i am", postTitle });
        }
        const comments = await Comment.find({ post: post.title }).populate('user', "username email");
        res.status(200).send({
            message: "Blog found",
            post,
            comments
        });
    } catch (error) {
        console.error("Error in getting blog:", error);
        res.status(500).send({ message: "Error in getting blog" });
    }
});


// blog by id 
router.get('/id/:id',async (req, res) => {
    try {
        const postId = req.params.id;
        // console.log(postId)
        
        const post = await Blog.findById(postId).populate('author', 'email username');
        // console.log(post)

        if (!post) {
            return res.status(404).send({ message: 'Post not found' });
        }

        const comments = await Comment.find({ postId: postId }).populate('user', 'username email');

        res.status(200).send({ post, comments });
    } catch (error) {
        console.error('Error fetching post:', error);
        res.status(500).send({ message: 'Failed to fetch post' });
    }
});
// Update blog by id
router.put('/:id', verifyToken, isAdmin, async (req, res) => {
    try {
        const postId = req.params.id;
        // const { title, content, category } = req.body;
        const updatedPost = await Blog.findByIdAndUpdate(postId, { ...req.body }, { new: true });

        if (!updatedPost) {
            return res.status(404).send({ message: 'Post not found' });
        }

        res.status(200).send({ message: 'Post updated successfully', post: updatedPost });
    } catch (error) {
        console.error('Error fetching post:', error);
        res.status(500).send({ message: 'Failed to fetch post' });
    }
})

// Delete blog by id
router.delete('/:id', async (req, res) => {
    try {
        const postId = req.params.id;

        const post = await Blog.findByIdAndDelete(postId);

        if (!post) {
            return res.status(404).send({ message: 'Post not found' });
        }

        await Comment.deleteMany({ postId: postId });

        res.status(200).send({ message: 'Post and associated comments deleted successfully' });
    } catch (error) {
        console.error('Error deleting post:', error);
        res.status(500).send({ message: 'Failed to delete post' });
    }
});

// Get related blogs
router.get('/related/:category', async (req, res) => {
    try {
        const {  category } = req.query;
        let query = {};
        if (category) {
            query = {
                ...query,
                category
            };
        }
        const relatedBlogs = await Blog.find(query).populate("author", "email").sort({ createdAt: -1 });
        res.status(200).send(relatedBlogs);
    } catch (error) {
        console.error("Error in getting related blogs:", error);
        res.status(500).send({ message: "Error in getting related blogs" });
    }
});

export default router;
