import React from 'react';
import Authenticated from '@/Layouts/Authenticated';
import { Head, Link } from '@inertiajs/inertia-react';
import { useForm } from "react-hook-form"
import { Inertia } from '@inertiajs/inertia'

export default function Edit(props) {
    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head content="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <Child response={ props.response } />
                        </div>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}

const Child = (props) => {
    const { register, formState: { errors }, handleSubmit } = useForm({
        defaultValues: {
            response_id: props.response.id,
            content: props.response.content,
        }
    })
    const onSubmit = (data) => {
        Inertia.get('/response/update', data)
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