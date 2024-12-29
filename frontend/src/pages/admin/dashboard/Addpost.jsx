import React, { useRef, useState, useEffect } from 'react';
import EditorJS from '@editorjs/editorjs';
import SimpleImage from "@editorjs/simple-image";
import Header from '@editorjs/header';
import EditorjsList from '@editorjs/list';
import { useSelector } from 'react-redux';
import { usePostBlogMutation } from '../../../redux/features/blogs/blogsApi';
import { useNavigate } from 'react-router-dom';

const Addpost = () => {
    const editorRef = useRef(null);
    const { user } = useSelector((state) => state.auth);
    const [title, setTitle] = useState('');
    const [coverImg, setCoverImg] = useState('');
    const [metaDescription, setMetaDescription] = useState('');
    const [category, setCategory] = useState('');
    const [view, setView] = useState('');
    const [postBlog, { isLoading }] = usePostBlogMutation();
    const navigate = useNavigate();

    useEffect(() => {
        const editor = new EditorJS({
            holder: 'editorjs',
            onReady: () => {
                editorRef.current = editor;
            },
            autofocus: true,
            tools: {
                header: {
                    class: Header,
                    inlineToolbar: true,
                },
                list: {
                    class: EditorjsList,
                    inlineToolbar: true,
                },
                image: SimpleImage,
            }
        });

        return () => {
            editor.destroy();
            editorRef.current = null;
        };
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const content = await editorRef.current.save();
            const newPost = {
                title,
                content,
                coverImg,
                description: metaDescription,
                category,
                view,
                author: user?._id
            };
            const response = await postBlog(newPost).unwrap();
            console.log('Post created successfully:', response);
            alert('Post created successfully');
            navigate('/dashboard');
            // Reset form fields after submission
            setTitle('');
            setCoverImg('');
            setMetaDescription('');
            setCategory('');
            editorRef.current.clear();
        } catch (error) {
            console.error('Error saving the post:', error);
            alert('Error saving the post. Please try again.');
        }
    };

    return (
        <div className='bg-slate-100 p-2'>
            <h2 className='text-3xl font-semibold'>Create a new Blog</h2>
            <form className='space-y-5 pt-8' onSubmit={handleSubmit}>
                <div className='space-y-4'>
                    <label className='text-xl font-semibold'>Blog Title</label>
                    <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        type="text"
                        placeholder='Blog Title Here'
                        required
                        className='w-full inline-block bg-slate-200 px-5 py-3 rounded-lg outline-none border-none'
                    />
                </div>
                <div className='flex flex-row justify-between items-start gap-5'>
                    <div className='w-full'>
                        <label className='text-2xl font-semibold mb-5'>Blog Content</label>
                        <div id='editorjs'></div>
                    </div>
                    <div className='w-full border p-5 space-y-5 rounded'>
                        <p className='font-semibold text-xl'>Choose Blog Format</p>
                        <hr />
                        <div className='space-y-4'>
                            <label className='text-xl font-semibold'>Blog Cover Image Link</label>
                            <input
                                value={coverImg}
                                onChange={(e) => setCoverImg(e.target.value)}
                                type="text"
                                placeholder='Blog Image Link Here'
                                required
                                className='w-full inline-block bg-slate-200 px-5 py-3 rounded-lg outline-none border-none'
                            />
                        </div>
                        <div className='space-y-4'>
                            <label className='text-xl font-semibold'>Blog Keywords </label>
                            <textarea
                                cols={4}
                                rows={4}
                                value={metaDescription}
                                onChange={(e) => setMetaDescription(e.target.value)}
                                placeholder='Meta Keywords Here'
                                required
                                className='w-full inline-block bg-slate-200 px-5 py-3 rounded-lg outline-none border-none'
                            />
                        </div>
                        <div className='space-y-4'>
                            <label className='text-xl font-semibold'>Blog Category</label>
                            <input
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                type="text"
                                placeholder='Blog Category Here'
                                required
                                className='w-full inline-block bg-slate-200 px-5 py-3 rounded-lg outline-none border-none'
                            />
                        </div>
                        <div className='space-y-4'>
                            <label className='text-xl font-semibold'>Blog View</label>
                            <input
                                value={view}
                                onChange={(e) => setView(e.target.value)}
                                type="text"
                                placeholder='Blog View'
                                required
                                className='w-full inline-block bg-slate-200 px-5 py-3 rounded-lg outline-none border-none'
                            />
                        </div>
                        <div className='space-y-4'>
                            <label className='text-xl font-semibold'>Author</label>
                            <input
                                value={user.username}
                                type="text"
                                placeholder={`${user.username} (Not Changeable)`}
                                required
                                className='w-full inline-block bg-slate-200 px-5 py-3 rounded-lg outline-none border-none'
                                disabled
                            />
                        </div>
                    </div>
                </div>
                <button
                    type='submit'
                    className='bg-blue-500 text-white px-5 py-3 w-full rounded'
                    disabled={isLoading}
                >
                    {isLoading ? 'Submitting...' : 'Add This Blog'}
                </button>
            </form>
        </div>
    );
};

export default Addpost;