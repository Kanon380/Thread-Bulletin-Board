<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class IdRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'id' => ['required', 'numeric'],
        ];
    }

    public function messages()
    {
        return [
            'id.required' => '必須項目がありません、管理者にお問い合わせ下さい。',
            'id.numeric' => 'データの型が正しくありません、管理者にお問い合わせ下さい。',
        ];
    }

}
