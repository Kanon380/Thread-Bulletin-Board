import React from 'react';
import Authenticated from '@/Layouts/Authenticated';
import { Head, Link } from '@inertiajs/inertia-react';
import { useForm } from "react-hook-form"
import { Inertia } from '@inertiajs/inertia'

export default function Show(props) {
    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">{props.threads.title}</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            {props.errors.id && <Error error={props.errors} />}
                            {props.errors.thread_id && <Error error={props.errors} />}
                            {props.errors.content && <Error error={props.errors} />}
                            {props.threads.responses.length ? <Child thread={props.threads} user={props.auth.user} /> : <NoData thread={props.threads} />}
                        </div>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}

const Child = (props) => {
    return (
        <>
            <Grandchild thread={props.thread} user={props.user} />
            <ResponseCreate thread={props.thread} />
        </>
    )
}

const Grandchild = (props) => {
    return (
        <section className="text-gray-600 body-font overflow-hidden">
            <div className="container px-5 py-24 mx-auto">
                <div className="divide-y-2 divide-gray-100">
                    <div className="grid grid-cols-4 py-4 px-2">
                        <div className="col-span-2">
                            <p className="font-semibold text-gray-700">レス</p>
                        </div>
                        <div className="md:col-span-1 md:block hidden">
                            <p className="font-semibold text-gray-700">作成日</p>
                        </div>
                        <div className="md:col-span-1 col-span-2">
                            <p className="font-semibold text-gray-700">オプション</p>
                        </div>
                    </div>
                    {
                        props.thread.responses.map((val, key) => {
                            return (
                                <div className="grid grid-cols-4 py-4 px-2" key={key}>
                                    <div className="col-span-2">
                                        <p className="font-semibold text-gray-700">{val.content}</p>
                                    </div>
                                    <div className="md:col-span-1 md:block hidden">
                                        <p className="text-sm text-gray-700">{val.created_at}</p>
                                    </div>
                                    <div className="md:col-span-1 col-span-2">
                                        {
                                            props.user.id === val.user_id &&
                                            <>
                                                <Link href={'/response/edit'} as='button' method='get' data={{ id: val.id }} className='focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg md:text-sm md:px-5 px-4 py-2.5 text-xs  mr-2 mb-2 dark:focus:ring-yellow-900'>
                                                    編集
                                                </Link>
                                                <Link href={'/response/delete'} as='button' method='get' data={{ id: val.id }} className='focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg md:text-sm text-xs md:px-5 px-4 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900'>
                                                    削除
                                                </Link>
                                            </>
                                        }
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </section>
    )
}

const NoData = (props) => {
    return (
        <div>
            <div>
                <ResponseCreate thread={props.thread} />
            </div>
        </div>
    )
}

const ResponseCreate = (props) => {
    const { register, formState: { errors }, handleSubmit } = useForm({
        defaultValues: {
            thread_id: props.thread.id,
            content: '',
        }
    })
    const onSubmit = (data) => {
        Inertia.post('/response/store', data)
    }
    return (
        <section className="text-gray-600 body-font relative">
            <div className="container px-5 py-24 mx-auto">
                <div className="flex flex-col text-center w-full">
                    <p className="font-medium mb-4 text-gray-900">レスはこちらから</p>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="lg:w-1/2 md:w-2/3 mx-auto">
                    <div className="flex flex-wrap -m-2">
                        <div className="p-2 w-full">
                            <div className="relative">
                                <textarea {...register("content", { required: true, maxLength: 10 })} name="content" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></textarea>
                                {errors.content?.type === 'required' && <p className='text-center text-red-500 mt-3'>必須項目です</p>}
                                {errors.content?.type === 'maxLength' && <p className='text-center text-red-500 mt-3'>10文字以上は入力できません</p>}
                            </div>
                        </div>
                        <div className="p-2 w-full">
                            <button type='submit' className="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">投稿</button>
                        </div>
                        <div className="p-2 w-full pt-8 mt-8 border-t border-gray-200 text-center">
                            <Link href={'/dashboard'} className='text-indigo-500'>ホームへ戻る</Link>
                        </div>
                    </div>
                </form>
            </div>
        </section>
    )
}

const Error = (props) => {
    return (
        <div role="alert">
            <div className="bg-red-500 text-white font-bold rounded-t px-4 py-2">
                Error
            </div>
            <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
                <p>{props.error.id && props.error.id}</p>
                <p>{props.error.thread_id && props.error.thread_id}</p>
                <p>{props.error.content && props.error.content}</p>
            </div>
        </div>
    )
}