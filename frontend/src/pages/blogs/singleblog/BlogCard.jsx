import React from 'react';
import EditorJSHTML from "editorjs-html";
import { useSelector } from 'react-redux';
import { Helmet, HelmetProvider } from 'react-helmet-async';

const editorJSHTML = EditorJSHTML();

const BlogCard = ({ blog }) => {
    const {user} = useSelector((state) => state.auth);
    const { title, description, coverImg, category, author, createdAt, content,view } = blog || {};

    const htmlContent = editorJSHTML.parse(content).join('');
    const formatDate = (isoDate) => {
        const date = new Date(isoDate);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <HelmetProvider>
            <div>
                <Helmet>
                    <title>{title} | 1 BTC News</title>
                    <meta name="description" content= {content}/>
                    <meta name="keywords" content={description} />
                </Helmet>
                <div className='bg-slate-100 p-9 m-5 shadow-lg'>
                    <h1 className='lg:text-5xl text-3xl font-bold mb-2 text-slate-800'>{title}</h1>
                    <hr className='my-5 py-1 bg-[#1a1e3a]' />
                    <div className='lg:flex flex-row mb-4'>
                        <p className='text-[#5d22ff] text-lg mr-12'>Written By <span className='text-[#31a9ff] text-xl hover:text-[#ff4848]'>{user?.username}</span> - On: {formatDate(createdAt)}</p>
                        <p className='text-[#5d22ff] text-lg mr-12'>views : {view}</p>
                        <p className='text-[#5d22ff] text-lg mr-12'>Category: {category}</p>
                    </div>
                    <img src={coverImg} alt='cover' className='h-90 rounded mr-4 mb-8' />
                    <hr className='my-5 py-1 bg-[#0a0b15]' />
                    <div className='mt-9 space-y-4'>
                        <div dangerouslySetInnerHTML={{ __html: htmlContent }} className='space-y-3 editorjsdiv' />
                    </div>
                </div>
            </div>
        </HelmetProvider>
    );
};

export default BlogCard;