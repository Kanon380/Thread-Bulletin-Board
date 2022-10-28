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
        <div>
            <div>
                <h2>{props.thread.title}</h2>
            </div>
            <div>
                <Grandchild thread={props.thread} user={props.user} />
            </div>
            <div>
                <ResponseCreate thread={props.thread} />
            </div>
        </div>
    )
}

const Grandchild = (props) => {
    return (
        <section className="text-gray-600 body-font overflow-hidden">
            <div className="container px-5 py-24 mx-auto">
                <div className="divide-y-2 divide-gray-100">
                    {
                        props.thread.responses.map((val, key) => {
                            return (
                                <div className="py-8 flex flex-wrap md:flex-nowrap hover:bg-gray-300" key={key}>
                                    <div className="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
                                        <span className="font-semibold title-font text-gray-700">作成日</span>
                                        <span className="mt-1 text-gray-500 text-sm">{val.created_at}</span>
                                    </div>
                                    <div className="md:flex-grow">
                                        <h2 className="text-2xl font-medium text-gray-900 title-font mb-2">{val.content} id:{val.id}</h2>
                                        {
                                            props.user.id === val.user_id &&
                                            <>
                                                <Link href={'/response/edit'} as='button' method='get' data={{ thread_id: props.thread.id, response_id: val.id }} className='focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:focus:ring-yellow-900'>
                                                    編集
                                                </Link>
                                                <Link href={'/response/delete'} as='button' method='get' data={{ thread_id: props.thread.id, response_id: val.id }} className='focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900'>
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
        <form onSubmit={handleSubmit(onSubmit)}>
            <input {...register("content", { required: true, minLength: 1, maxLength: 10 })} type="text" />
            {errors.content?.type === 'required' && <p>content is required.</p>}
            {errors.content?.type === 'minLength' && <p className='mt-3'>content must be at least 1 letter.</p>}
            {errors.content?.type === 'maxLength' && <p className='mt-3'>content must be 10 characters or less.</p>}
            <button type='submit'>Submit</button>
        </form>
    )
}