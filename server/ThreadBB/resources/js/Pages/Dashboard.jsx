import React from 'react';
import Authenticated from '@/Layouts/Authenticated';
import { Head, Link } from '@inertiajs/inertia-react';

export default function Dashboard(props) {
    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            {props.errors.id && <Error error={props.errors} />}
                            {props.threads.length ? <Child thread={props.threads} /> : <NoData />}
                        </div>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}

const Child = (props) => {
    return (
        <section className="text-gray-600 body-font overflow-hidden">
            <div className="container mx-auto">
                <div className="divide-y-2 divide-gray-100">
                    <div className="md:grid md:grid-cols-4 py-4 px-2">
                        <div className="md:col-span-2">
                            <p className="font-semibold text-gray-700">スレッド</p>
                        </div>
                        <div className="md:col-span-1 md:block hidden">
                            <p className="font-semibold text-gray-700">レス数</p>
                        </div>
                        <div className="md:col-span-1 md:block hidden">
                            <p className="font-semibold text-gray-700">作成日</p>
                        </div>
                    </div>
                    {
                        props.thread.map((val, key) => {
                            return (
                                <Link href={'/thread/show'} as='button' method='get' data={{ id: val.id }} className='hover:bg-slate-100 w-full px-2 py-4' key={key}>
                                    <div className="md:grid md:grid-cols-4" key={key}>
                                        <div className="md:col-span-2 flex justify-start items-center">
                                            <p className="text-lg font-medium text-gray-900">{val.title}</p>
                                        </div>
                                        <div className="md:col-span-1 md:flex justify-start items-center hidden">
                                            <p className="text-gray-500 text-sm">{val.responses.length}</p>
                                        </div>
                                        <div className="md:col-span-1 md:flex justify-start items-center hidden">
                                            <p className="mt-1 text-gray-500 text-sm">{val.created_at}</p>
                                        </div>
                                    </div>
                                </Link>
                            )
                        })
                    }
                </div>
            </div>
        </section>
    )
}

const NoData = () => {
    return (
        <div>
            スレッドが存在しません
        </div>
    )
}

const Error = (props) => {
    return (
        <div role="alert">
            <div className="bg-red-500 text-white font-bold rounded-t px-4 py-2">
                Error
            </div>
            <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
                <p>{props.error.id}</p>
            </div>
        </div>
    )
}