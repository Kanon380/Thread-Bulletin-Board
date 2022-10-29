import React from 'react';
import Authenticated from '@/Layouts/Authenticated';
import { Head, Link } from '@inertiajs/inertia-react';
import { useForm } from "react-hook-form"
import { Inertia } from '@inertiajs/inertia'

export default function Create(props) {
    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">スレッド作成</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <Child />
                        </div>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}

const Child = () => {
    const { register, formState: { errors }, handleSubmit } = useForm({
        defaultValues: {
            title: '',
        }
    })
    const onSubmit = (data) => {
        Inertia.get('/thread/store', data)
    }
    return (
        <section className="text-gray-600 body-font relative">
            <div className="container px-5 py-24 mx-auto">
                <div className="flex flex-col text-center w-full">
                    <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">スレッド作成</h1>
                </div>
                <form className="lg:w-1/2 md:w-2/3 mx-auto" onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-wrap -m-2">
                        <div className="p-2 w-full mb-4">
                            <div className="relative">
                                <label for="title" className="leading-7 text-sm text-gray-600">タイトル</label>
                                <input {...register("title", { required: true, minLength: 1, maxLength: 10 })} type="text" id='title' className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                {errors.title?.type === 'required' && <p className='text-center text-red-500 mt-3'>タイトルは必須項目です</p>}
                                {errors.title?.type === 'minLength' && <p className='text-center text-red-500 mt-3'>タイトルは1文字以上にして下さい</p>}
                                {errors.title?.type === 'maxLength' && <p className='text-center text-red-500 mt-3'>タイトルは10文字以内にして下さい</p>}
                            </div>
                        </div>
                        <div className="p-2 w-full">
                            <button type='submit' className="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">作成</button>
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