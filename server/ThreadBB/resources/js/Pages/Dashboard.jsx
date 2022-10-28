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
            <div className="container px-5 py-24 mx-auto">
                <div className="divide-y-2 divide-gray-100">
                    {
                        props.thread.map((val, key) => {
                            return (
                                <div className="py-8 flex flex-wrap md:flex-nowrap hover:bg-gray-300" key={key}>
                                    <div className="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
                                        <span className="font-semibold title-font text-gray-700">作成日</span>
                                        <span className="mt-1 text-gray-500 text-sm">{val.created_at}</span>
                                    </div>
                                    <div className="md:flex-grow">
                                        <h2 className="text-2xl font-medium text-gray-900 title-font mb-2">{val.title} id:{val.id}</h2>
                                        <Link href={'/thread/show'} as='button' method='get' data={{ id: val.id }} className='bg-red-50'>
                                            詳細
                                        </Link>
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

const NoData = () => {
    return (
        <div>
            スレッドが存在しません
        </div>
    )
}