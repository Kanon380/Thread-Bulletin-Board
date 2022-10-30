import React, { useState } from 'react';
import Authenticated from '@/Layouts/AdminAuthenticated';
import { Head, Link } from '@inertiajs/inertia-react';
import PrimaryButton from '@/Components/PrimaryButton';

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
            <div className="container px-5 py-24 mx-auto">
                <div className="divide-y-2 divide-gray-100">
                    <div className="grid grid-cols-4 py-4 px-2">
                        <div className="col-span-3">
                            <p className="font-semibold text-gray-700">スレッド</p>
                        </div>
                        <div className="col-span-1">
                            <p className="font-semibold text-gray-700">オプション</p>
                        </div>
                    </div>
                    {
                        props.thread.map((val, key) => {
                            return (
                                <div className="grid grid-cols-4 py-4 px-2" key={key}>
                                    <div className="col-span-3">
                                        <p className="font-semibold text-gray-700">{val.title}</p>
                                    </div>
                                    <div className="col-span-1">
                                        <Link href={'/admin/delete'} method='get' data={{ id: val.id }}>
                                            <PrimaryButton children='削除' className='focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900' />
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